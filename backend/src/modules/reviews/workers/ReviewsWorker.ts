/**
 * ReviewsWorker
 * -------------
 * BullMQ Worker that processes two job types:
 *
 *  1. fetch-google-reviews
 *     Calls the Google Places API (Place Details → reviews field).
 *     Each review is upserted idempotently into the DB via externalId.
 *     Auto-approved so they appear immediately on the frontend.
 *
 *  2. rotate-testimonials
 *     Reads all approved reviews from DB and writes a ranked
 *     snapshot to Redis (key: "testimonials:active") with a 1h TTL.
 *     The /api/reviews/testimonials endpoint reads from this cache.
 *
 * Google Places API integration is OPTIONAL:
 *   Set GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID in .env to enable.
 *   If either env var is missing the job logs a warning and exits gracefully.
 */
import { Worker, Job } from 'bullmq';
import { Logger } from '../../../core/Logger';
import { redisClient } from '../../../core/cache/RedisClient';
import { REVIEWS_QUEUE_NAME, ReviewJobName, redisConnection } from '../queues/ReviewsQueue';
import { PrismaReviewsRepository } from '../repositories/implementations/PrismaReviewsRepository';

const repo = new PrismaReviewsRepository();

// ─── Testimonials cache TTL ────────────────────────────────────────────────
const TESTIMONIALS_CACHE_KEY = 'testimonials:active';
const TESTIMONIALS_TTL_SECONDS = 60 * 60; // 1 hour

// ─── Google Places API types (minimal) ────────────────────────────────────
interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number; // Unix timestamp
  author_url: string;
}

interface GooglePlaceDetailsResponse {
  result?: {
    reviews?: GoogleReview[];
  };
  status: string;
  error_message?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────

/**
 * Derives a stable external ID for a Google review.
 * Google Places API doesn't expose a review ID, so we derive
 * one from author_url + timestamp.
 */
function deriveExternalId(review: GoogleReview): string {
  return `google::${review.author_url}::${review.time}`;
}

/**
 * Fetches reviews from Google Places API (Place Details endpoint).
 * Returns an empty array if the API key / Place ID are not configured.
 */
async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    Logger.warn(
      '[ReviewsWorker] GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID not set — skipping Google fetch.'
    );
    return [];
  }

  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${placeId}&fields=reviews&reviews_sort=newest&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Google Places API HTTP error: ${res.status} ${res.statusText}`);
  }

  const json: GooglePlaceDetailsResponse = await res.json();

  if (json.status !== 'OK') {
    throw new Error(
      `Google Places API error: ${json.status}${json.error_message ? ' — ' + json.error_message : ''}`
    );
  }

  return json.result?.reviews ?? [];
}

// ─── Worker ───────────────────────────────────────────────────────────────

let reviewsWorker: Worker<Record<string, unknown>, unknown, ReviewJobName> | null = null;

if (process.env.REDIS_URL && redisConnection) {
  reviewsWorker = new Worker<Record<string, unknown>, unknown, ReviewJobName>(
    REVIEWS_QUEUE_NAME,
    async (job: Job<Record<string, unknown>, unknown, ReviewJobName>) => {
      Logger.info(`[ReviewsWorker] Processing job "${job.name}" (id=${job.id})`);

      // ── Job 1: Fetch Google Reviews ────────────────────────────────────────
      if (job.name === 'fetch-google-reviews') {
        const googleReviews = await fetchGoogleReviews();

        if (googleReviews.length === 0) {
          Logger.info('[ReviewsWorker] No Google reviews to import.');
          return { imported: 0 };
        }

        let imported = 0;
        for (const gr of googleReviews) {
          // Only import 4★+ reviews
          if (gr.rating < 4) continue;

          const externalId = deriveExternalId(gr);
          await repo.upsertFromGoogle({
            name: gr.author_name,
            rating: gr.rating,
            comment: gr.text,
            externalId,
          });
          imported++;
        }

        Logger.info(`[ReviewsWorker] Imported/verified ${imported} Google reviews.`);
        return { imported };
      }

      // ── Job 2: Rotate Testimonials ─────────────────────────────────────────
      if (job.name === 'rotate-testimonials') {
        const approved = await repo.listApproved();

        if (approved.length === 0) {
          Logger.warn('[ReviewsWorker] No approved reviews found for testimonial rotation.');
          return { rotated: 0 };
        }

        // Sort by rating (desc) then by date (desc)
        const topReviews = approved
          .sort((a, b) => {
            if (b.rating !== a.rating) return b.rating - a.rating;
            return b.createdAt.getTime() - a.createdAt.getTime();
          })
          .slice(0, 10); // take top 10

        const snapshot = topReviews.map((r) => {
          return {
            id: r.id,
            name: r.name,
            rating: r.rating,
            comment: r.comment ?? '',
            source: r.source,
            createdAt: r.createdAt.toISOString(),
          };
        });

        await redisClient.set(
          TESTIMONIALS_CACHE_KEY,
          JSON.stringify(snapshot),
          'EX',
          TESTIMONIALS_TTL_SECONDS
        );

        Logger.info(
          `[ReviewsWorker] Rotated ${snapshot.length} testimonials → Redis (TTL ${TESTIMONIALS_TTL_SECONDS}s).`
        );
        return { rotated: snapshot.length };
      }

      Logger.warn(`[ReviewsWorker] Unknown job name: ${job.name}`);
    },
    {
      connection: redisConnection,
      concurrency: 1, // reviews jobs are DB-heavy; keep sequential
    }
  );

  reviewsWorker.on('failed', (job, err) => {
    Logger.error(
      `[ReviewsWorker] Job "${job?.name}" (id=${job?.id}) failed after ${job?.attemptsMade} attempts: ${err.message}`
    );
  });
} else {
  Logger.warn('[ReviewsWorker] Skipping initialization (no REDIS_URL provided).');
}

export { reviewsWorker };
