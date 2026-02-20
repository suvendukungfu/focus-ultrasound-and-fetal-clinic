export interface ICreateBlogPostDTO {
  title: string;
  content: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[]; // Will be stored as JSON string in SQLite if needed, but Prisma handles array in Postgre.
                       // Since we use SQLite in dev, we might need to stringify. 
                       // Wait, schema.prisma Update in Step 916 changed keywords to String (serialized JSON).
                       // So DTO should probably accept string[] and Repo handles serialization?
                       // Or DTO accepts string (if frontend sends stringified).
                       // Let's stick to string[] in DTO and handle serialization in Repository/Controller.
  authorId?: string;
  isPublished?: boolean;
}
