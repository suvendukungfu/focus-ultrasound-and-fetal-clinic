export interface ICreateReviewDTO {
  name: string;
  rating: number;
  comment?: string;
  /** Source identifier — 'manual' | 'google' */
  source?: string;
  /** External Google review ID for deduplication */
  externalId?: string;
}
