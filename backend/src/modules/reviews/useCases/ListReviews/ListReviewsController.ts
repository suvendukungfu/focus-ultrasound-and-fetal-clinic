import { Request, Response } from 'express';
import { ListReviewsUseCase } from './ListReviewsUseCase';
import { PrismaReviewsRepository } from '../../repositories/implementations/PrismaReviewsRepository';

const prismaReviewsRepository = new PrismaReviewsRepository();
const listReviewsUseCase = new ListReviewsUseCase(prismaReviewsRepository);

export class ListReviewsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const reviews = await listReviewsUseCase.execute();
    return response.json(reviews);
  }
}
