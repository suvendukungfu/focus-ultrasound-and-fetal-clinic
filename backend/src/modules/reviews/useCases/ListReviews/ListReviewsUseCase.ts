import { IReviewsRepository } from '../../repositories/IReviewsRepository';

export class ListReviewsUseCase {
  constructor(private reviewsRepository: IReviewsRepository) {}

  async execute() {
    const reviews = await this.reviewsRepository.listAll();
    return reviews;
  }
}
