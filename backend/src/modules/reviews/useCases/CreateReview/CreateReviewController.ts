import { Request, Response } from 'express';
import { CreateReviewUseCase } from './CreateReviewUseCase';
import { PrismaReviewsRepository } from '../../repositories/implementations/PrismaReviewsRepository';

const prismaReviewsRepository = new PrismaReviewsRepository();
const createReviewUseCase = new CreateReviewUseCase(prismaReviewsRepository);

export class CreateReviewController {
  async handle(request: Request, response: Response): Promise<Response> {
    // Accept both old field names (author/content) and new (name/comment) for compatibility
    const { name, author, rating, comment, content } = request.body;

    const review = await createReviewUseCase.execute({
      name: name ?? author,
      rating,
      comment: comment ?? content,
    });

    return response.status(201).json(review);
  }
}
