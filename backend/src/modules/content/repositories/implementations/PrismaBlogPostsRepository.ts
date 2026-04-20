import { BlogPost } from '@prisma/client';
import { ICreateBlogPostDTO } from '../../dtos/ICreateBlogPostDTO';
import { IBlogPostsRepository } from '../IBlogPostsRepository';
import { prisma } from '../../../../shared/infra/database/prismaClient';

export class PrismaBlogPostsRepository implements IBlogPostsRepository {
  async create(data: ICreateBlogPostDTO): Promise<BlogPost> {
    const slug = data.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
      
    const uniqueSlug = `${slug}-${Date.now()}`; // Simple uniqueness

    const blogPost = await prisma.blogPost.create({
      data: {
        title: data.title,
        content: data.content,
        slug: uniqueSlug, // We should check for uniqueness but Date.now() is a safe hack for now
        excerpt: data.excerpt,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords ? data.keywords.join(',') : null,
        authorId: data.authorId,
        isPublished: data.isPublished,
      },
    });
    return blogPost;
  }

  async list(page = 1, limit = 10): Promise<BlogPost[]> {
    const skip = (page - 1) * limit;
    const posts = await prisma.blogPost.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    return posts;
  }

  async findBySlug(slug: string): Promise<BlogPost | null> {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });
    return post;
  }

  async findById(id: string): Promise<BlogPost | null> {
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });
    return post;
  }

  async delete(id: string): Promise<void> {
    await prisma.blogPost.delete({
      where: { id },
    });
  }
}
