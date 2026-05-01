export interface ICreateBlogPostDTO {
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  authorId?: string;
  isPublished?: boolean;
}
