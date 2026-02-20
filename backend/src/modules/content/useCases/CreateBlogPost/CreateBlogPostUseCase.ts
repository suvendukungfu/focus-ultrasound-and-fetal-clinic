import { ICreateBlogPostDTO } from '../../dtos/ICreateBlogPostDTO';
import { IBlogPostsRepository } from '../../repositories/IBlogPostsRepository';

export class CreateBlogPostUseCase {
  constructor(private blogPostsRepository: IBlogPostsRepository) {}

  async execute(data: ICreateBlogPostDTO) {
    // Slug generation logic is currently in Repository, but could be moved here.
    // For now, Repository handles it.
    const blogPost = await this.blogPostsRepository.create(data);
    return blogPost;
  }
}
