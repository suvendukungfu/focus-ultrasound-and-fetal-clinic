import { Request, Response } from 'express';
import { GetTestimonialsUseCase } from './GetTestimonialsUseCase';

export class GetTestimonialsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getTestimonialsUseCase = new GetTestimonialsUseCase();
    const testimonials = await getTestimonialsUseCase.execute();

    return response.json(testimonials);
  }
}
