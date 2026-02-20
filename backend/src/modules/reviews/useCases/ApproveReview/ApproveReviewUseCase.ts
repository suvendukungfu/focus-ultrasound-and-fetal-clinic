import { IReviewsRepository } from '../../repositories/IReviewsRepository';

export class ApproveReviewUseCase {
  constructor(private reviewsRepository: IReviewsRepository) {}

  async execute(id: string) {
    const review = await this.reviewsRepository.approve(id);
    return review;
  }
}
