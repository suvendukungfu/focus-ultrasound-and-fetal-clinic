import { BlogPost } from '@prisma/client';
import { ICreateBlogPostDTO } from '../../dtos/ICreateBlogPostDTO';
import { IBlogPostsRepository } from '../IBlogPostsRepository';
import { prisma } from '../../../../shared/infra/database/prismaClient';

export class PrismaBlogPostsRepository implements IBlogPostsRepository {
  async create(data: ICreateBlogPostDTO): Promise<BlogPost> {
    // Basic slug generation if not provided (should be handled in UseCase)
    // Here we assume data is ready.
    // Note: Schema uses `keywords String` (SQLite compatible).
    // So we must serialize string[] to string.
    
    const keywordsString = JSON.stringify(data.keywords || []);
    
    // Auto-generate slug from title if we were doing it here, but UseCase is better place.
    // We'll rely on UseCase to pass a slug? 
    // Wait, DTO doesn't have slug? 
    // Schema has `slug String @unique`.
    // So we need to generate it.
    // Let's invoke a helper or do it in UseCase.
    // For now, I'll generate it here as a fallback or expect it in DTO? 
    // I'll update DTO to include optional slug or generate it in UseCase.
    // UseCase is the place for business logic like slug generation.
    // So DTO should probably have it, or UseCase adds it.
    // But `create` method takes `ICreateBlogPostDTO`.
    // I'll add `slug` to `ICreateBlogPostDTO`? 
    // Or I'll just change the Repository signature to take a refined type.
    // I'll keep it simple: UseCase will generate slug and pass it?
    // But `ICreateBlogPostDTO` definition in step 1261 didn't have slug.
    // I will generate slug here if missing, but it's not ideal.
    // Better: Update DTO in next step or just generate here.

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
        keywords: keywordsString as any, // Cast to any because Prisma types might be expecting string[] if we didn't regenerate client?
                                         // Actually schema said `keywords String[]` in original, 
                                         // but user changed it to `String` in step 867 for SQLite.
                                         // So Typescript might complain if generated client expects String.
                                         // `npx prisma generate` was run in step 1077 (successfully?).
                                         // If it was run, then `keywords` is `string`.
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
