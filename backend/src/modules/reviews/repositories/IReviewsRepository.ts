import { Review } from '@prisma/client';
import { ICreateReviewDTO } from '../../dtos/ICreateReviewDTO';

export interface IReviewsRepository {
  create(data: ICreateReviewDTO): Promise<Review>;
  listAll(): Promise<Review[]>;
  findById(id: string): Promise<Review | null>;
  approve(id: string): Promise<Review>;
  delete(id: string): Promise<void>;
}
