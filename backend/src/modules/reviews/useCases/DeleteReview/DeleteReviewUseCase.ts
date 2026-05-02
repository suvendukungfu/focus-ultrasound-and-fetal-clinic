import { IReviewsRepository } from '../../repositories/IReviewsRepository';

export class DeleteReviewUseCase {
  constructor(private reviewsRepository: IReviewsRepository) {}

  async execute(id: string): Promise<void> {
    const review = await this.reviewsRepository.findById(id);

    if (!review) {
      throw new Error('Review not found');
    }

    await this.reviewsRepository.delete(id);
  }
}
