import { Request, Response } from 'express';
import { PrismaReviewsRepository } from '../../repositories/implementations/PrismaReviewsRepository';
import { DeleteReviewUseCase } from './DeleteReviewUseCase';

export class DeleteReviewController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const reviewsRepository = new PrismaReviewsRepository();
    const deleteReviewUseCase = new DeleteReviewUseCase(reviewsRepository);

    try {
      await deleteReviewUseCase.execute(id);
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ 
        message: error instanceof Error ? error.message : 'Unexpected error' 
      });
    }
  }
}
