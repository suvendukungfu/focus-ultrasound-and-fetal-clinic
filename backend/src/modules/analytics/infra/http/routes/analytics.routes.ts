import { Router } from 'express';
import { GetDashboardStatsController } from '../../../useCases/GetDashboardStats/GetDashboardStatsController';
// import { ensureAuthenticated, ensureAdmin } from '../../../../shared/infra/http/middlewares/ensureAuthenticated';

const analyticsRoutes = Router();

const getDashboardStatsController = new GetDashboardStatsController();

analyticsRoutes.get('/dashboard', getDashboardStatsController.handle);

export { analyticsRoutes };
