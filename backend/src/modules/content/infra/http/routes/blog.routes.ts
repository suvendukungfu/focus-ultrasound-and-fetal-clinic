import { Router } from 'express';
import { CreateBlogPostController } from '../../../useCases/CreateBlogPost/CreateBlogPostController';
import { ListBlogPostsController } from '../../../useCases/ListBlogPosts/ListBlogPostsController';
import { GetBlogPostBySlugController } from '../../../useCases/GetBlogPostBySlug/GetBlogPostBySlugController';
// import { ensureAuthenticated, ensureAdmin } from '../../../../shared/infra/http/middlewares/ensureAuthenticated';

const blogRoutes = Router();

const createBlogPostController = new CreateBlogPostController();
const listBlogPostsController = new ListBlogPostsController();
const getBlogPostBySlugController = new GetBlogPostBySlugController();

blogRoutes.post('/', createBlogPostController.handle);
blogRoutes.get('/', listBlogPostsController.handle);
blogRoutes.get('/:slug', getBlogPostBySlugController.handle);

export { blogRoutes };
