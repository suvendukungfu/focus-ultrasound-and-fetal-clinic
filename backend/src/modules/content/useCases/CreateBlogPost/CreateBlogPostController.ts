import { Request, Response } from 'express';
import { CreateBlogPostUseCase } from './CreateBlogPostUseCase';
import { PrismaBlogPostsRepository } from '../../repositories/implementations/PrismaBlogPostsRepository';

const prismaBlogPostsRepository = new PrismaBlogPostsRepository();
const createBlogPostUseCase = new CreateBlogPostUseCase(prismaBlogPostsRepository);

export class CreateBlogPostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, content, excerpt, metaTitle, metaDescription, keywords, authorId, isPublished } = request.body;

    const blogPost = await createBlogPostUseCase.execute({
      title,
      content,
      excerpt,
      metaTitle,
      metaDescription,
      keywords,
      authorId,
      isPublished,
    });

    return response.status(201).json(blogPost);
  }
}
