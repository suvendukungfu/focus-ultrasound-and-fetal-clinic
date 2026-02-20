import { ICreateReviewDTO } from '../../dtos/ICreateReviewDTO';
import { IReviewsRepository } from '../../repositories/IReviewsRepository';

export class CreateReviewUseCase {
  constructor(private reviewsRepository: IReviewsRepository) {}

  async execute(data: ICreateReviewDTO) {
    const review = await this.reviewsRepository.create(data);
    return review;
  }
}
