import { IBlogPostsRepository } from '../../repositories/IBlogPostsRepository';

export class GetBlogPostBySlugUseCase {
  constructor(private blogPostsRepository: IBlogPostsRepository) {}

  async execute(slug: string) {
    const post = await this.blogPostsRepository.findBySlug(slug);
    return post;
  }
}
