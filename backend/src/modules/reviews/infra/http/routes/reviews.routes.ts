import { Router } from 'express';
import { CreateReviewController } from '../../../useCases/CreateReview/CreateReviewController';
import { ListReviewsController } from '../../../useCases/ListReviews/ListReviewsController';
import { ApproveReviewController } from '../../../useCases/ApproveReview/ApproveReviewController';
// import { ensureAuthenticated, ensureAdmin } from '../../../../shared/infra/http/middlewares/ensureAuthenticated';

const reviewsRoutes = Router();

const createReviewController = new CreateReviewController();
const listReviewsController = new ListReviewsController();
const approveReviewController = new ApproveReviewController();

reviewsRoutes.post('/', createReviewController.handle);
reviewsRoutes.get('/', listReviewsController.handle);
reviewsRoutes.patch('/:id/approve', approveReviewController.handle);

export { reviewsRoutes };
