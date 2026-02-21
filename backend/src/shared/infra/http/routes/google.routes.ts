import { Router, Request, Response } from 'express';
import { Logger } from '../../../../core/Logger';
import { prisma } from '../../database/prismaClient';

const googleRoutes = Router();

/**
 * GET /api/v1/integrations/google/reviews
 * Fetch Google Reviews for the clinic via Google Places API.
 */
googleRoutes.get('/reviews', async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      // Return cached reviews from database if API not configured
      const cachedReviews = await prisma.review.findMany({
        where: { isApproved: true },
        orderBy: { createdAt: 'desc' },
        take: 20,
      });

      return res.status(200).json({
        status: 'SUCCESS',
        source: 'DATABASE_CACHE',
        data: {
          reviews: cachedReviews.map(r => ({
            id: r.id,
            author: r.author,
            rating: r.rating,
            text: r.content,
            time: r.createdAt,
          })),
          averageRating: cachedReviews.length > 0
            ? (cachedReviews.reduce((sum, r) => sum + r.rating, 0) / cachedReviews.length).toFixed(1)
            : '0',
          totalReviews: cachedReviews.length,
        },
      });
    }

    // Fetch from Google Places API
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      Logger.warn(`[Google Reviews] API returned status: ${data.status}`);
      return res.status(502).json({ error: `Google API error: ${data.status}` });
    }

    const result = data.result;

    // Sync reviews to local database
    for (const review of result.reviews || []) {
      const reviewId = `google-${review.time}`;
      await prisma.review.upsert({
        where: { id: reviewId },
        create: {
          id: reviewId,
          author: review.author_name,
          rating: review.rating,
          content: review.text || '',
          isApproved: true,
        },
        update: {
          rating: review.rating,
          content: review.text || '',
        },
      });
    }

    Logger.info(`[Google Reviews] Synced ${result.reviews?.length || 0} reviews from Google.`);

    return res.status(200).json({
      status: 'SUCCESS',
      source: 'GOOGLE_PLACES_API',
      data: {
        reviews: result.reviews,
        averageRating: result.rating,
        totalReviews: result.user_ratings_total,
      },
    });
  } catch (err) {
    Logger.error(`[Google Reviews] Fetch failed: ${err}`);
    return res.status(500).json({ error: 'Failed to fetch reviews.' });
  }
});

/**
 * GET /api/v1/integrations/google/maps-embed
 * Returns the Google Maps embed URL for the clinic.
 */
googleRoutes.get('/maps-embed', (_req: Request, res: Response) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || '';
  const placeId = process.env.GOOGLE_PLACE_ID || '';

  if (!apiKey) {
    // Fallback to a static embed without API key
    return res.status(200).json({
      status: 'SUCCESS',
      embedUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.0!2d85.8245!3d20.2961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFocus%20Ultrasound%20Clinic!5e0!3m2!1sen!2sin!4v1`,
    });
  }

  return res.status(200).json({
    status: 'SUCCESS',
    embedUrl: `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${placeId}`,
  });
});

/**
 * GET /api/v1/integrations/google/analytics-config
 * Returns the GA measurement ID for frontend injection.
 */
googleRoutes.get('/analytics-config', (_req: Request, res: Response) => {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || process.env.GOOGLE_ANALYTICS_ID;

  return res.status(200).json({
    status: 'SUCCESS',
    data: {
      measurementId: gaId || null,
      configured: !!gaId,
      gtmUrl: gaId ? `https://www.googletagmanager.com/gtag/js?id=${gaId}` : null,
    },
  });
});

export { googleRoutes };
