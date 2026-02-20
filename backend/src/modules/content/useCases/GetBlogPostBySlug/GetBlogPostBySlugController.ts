import { Request, Response } from 'express';
import { GetBlogPostBySlugUseCase } from './GetBlogPostBySlugUseCase';
import { PrismaBlogPostsRepository } from '../../repositories/implementations/PrismaBlogPostsRepository';

const prismaBlogPostsRepository = new PrismaBlogPostsRepository();
const getBlogPostBySlugUseCase = new GetBlogPostBySlugUseCase(prismaBlogPostsRepository);

export class GetBlogPostBySlugController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { slug } = request.params;

    const post = await getBlogPostBySlugUseCase.execute(slug);
    
    if (!post) {
      return response.status(404).json({ message: 'Post not found' });
    }

    return response.json(post);
  }
}
