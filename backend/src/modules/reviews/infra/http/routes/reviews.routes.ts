import { Router } from 'express';
import { CreateReviewController } from '../../../useCases/CreateReview/CreateReviewController';
import { ListReviewsController } from '../../../useCases/ListReviews/ListReviewsController';
import { ApproveReviewController } from '../../../useCases/ApproveReview/ApproveReviewController';
import { DeleteReviewController } from '../../../useCases/DeleteReview/DeleteReviewController';
import { ensureAuthenticated, ensureAdmin } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import { GetTestimonialsController } from '../../../useCases/GetTestimonials/GetTestimonialsController';

const reviewsRoutes = Router();

const createReviewController = new CreateReviewController();
const listReviewsController = new ListReviewsController();
const approveReviewController = new ApproveReviewController();
const getTestimonialsController = new GetTestimonialsController();
const deleteReviewController = new DeleteReviewController();

reviewsRoutes.post('/', createReviewController.handle);
reviewsRoutes.get('/', listReviewsController.handle);
reviewsRoutes.get('/testimonials', getTestimonialsController.handle);
reviewsRoutes.patch('/:id/approve', ensureAuthenticated, ensureAdmin, approveReviewController.handle);
reviewsRoutes.delete('/:id', ensureAuthenticated, ensureAdmin, deleteReviewController.handle);

export { reviewsRoutes };
