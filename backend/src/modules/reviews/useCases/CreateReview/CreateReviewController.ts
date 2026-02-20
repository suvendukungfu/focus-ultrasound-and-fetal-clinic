import { Request, Response } from 'express';
import { CreateReviewUseCase } from './CreateReviewUseCase';
import { PrismaReviewsRepository } from '../../repositories/implementations/PrismaReviewsRepository';

const prismaReviewsRepository = new PrismaReviewsRepository();
const createReviewUseCase = new CreateReviewUseCase(prismaReviewsRepository);

export class CreateReviewController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { author, rating, content } = request.body;

    const review = await createReviewUseCase.execute({
      author,
      rating,
      content,
    });

    return response.status(201).json(review);
  }
}
