import { IBlogPostsRepository } from '../../repositories/IBlogPostsRepository';

export class ListBlogPostsUseCase {
  constructor(private blogPostsRepository: IBlogPostsRepository) {}

  async execute(page = 1, limit = 10) {
    const posts = await this.blogPostsRepository.list(page, limit);
    return posts;
  }
}
