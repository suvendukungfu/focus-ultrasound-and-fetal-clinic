import { Review } from '@prisma/client';
import { ICreateReviewDTO } from '../dtos/ICreateReviewDTO';

export interface IReviewsRepository {
  create(data: ICreateReviewDTO): Promise<Review>;
  listAll(): Promise<Review[]>;
  /** Return only approved, non-deleted reviews */
  listApproved(): Promise<Review[]>;
  findById(id: string): Promise<Review | null>;
  /** Find by external Google place review ID */
  findByExternalId(externalId: string): Promise<Review | null>;
  approve(id: string): Promise<Review>;
  delete(id: string): Promise<void>;
  /**
   * Upsert a review sourced from Google Places API.
   * Creates if not found by externalId, otherwise skips.
   */
  upsertFromGoogle(data: ICreateReviewDTO & { externalId: string }): Promise<Review>;
}
