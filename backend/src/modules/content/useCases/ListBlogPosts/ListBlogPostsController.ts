import { Request, Response } from 'express';
import { ListBlogPostsUseCase } from './ListBlogPostsUseCase';
import { PrismaBlogPostsRepository } from '../../repositories/implementations/PrismaBlogPostsRepository';

const prismaBlogPostsRepository = new PrismaBlogPostsRepository();
const listBlogPostsUseCase = new ListBlogPostsUseCase(prismaBlogPostsRepository);

export class ListBlogPostsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const page = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 10;

    const posts = await listBlogPostsUseCase.execute(page, limit);
    return response.json(posts);
  }
}
