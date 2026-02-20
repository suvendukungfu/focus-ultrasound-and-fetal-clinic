import { BlogPost } from '@prisma/client';
import { ICreateBlogPostDTO } from '../../dtos/ICreateBlogPostDTO';

export interface IBlogPostsRepository {
  create(data: ICreateBlogPostDTO): Promise<BlogPost>;
  list(page?: number, limit?: number): Promise<BlogPost[]>;
  findBySlug(slug: string): Promise<BlogPost | null>;
  findById(id: string): Promise<BlogPost | null>;
  delete(id: string): Promise<void>;
}
