import { Request, Response } from 'express';
import { ApproveReviewUseCase } from './ApproveReviewUseCase';
import { PrismaReviewsRepository } from '../../repositories/implementations/PrismaReviewsRepository';

const prismaReviewsRepository = new PrismaReviewsRepository();
const approveReviewUseCase = new ApproveReviewUseCase(prismaReviewsRepository);

export class ApproveReviewController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const review = await approveReviewUseCase.execute(id);

    return response.json(review);
  }
}
