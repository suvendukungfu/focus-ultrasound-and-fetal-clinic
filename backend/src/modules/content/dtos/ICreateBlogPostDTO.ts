export interface ICreateBlogPostDTO {
  title: string;
  slug?: string;
  content: string;
  [key: string]: any;
}
