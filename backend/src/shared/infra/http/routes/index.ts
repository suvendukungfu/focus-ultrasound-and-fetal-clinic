import { Router } from 'express';
import { authRoutes } from '../../../../modules/auth/infra/http/routes/auth.routes';
import { leadsRoutes } from '../../../../modules/patients/infra/http/routes/leads.routes';
import { servicesRoutes } from '../../../../modules/services/infra/http/routes/services.routes';
import { reviewsRoutes } from '../../../../modules/reviews/infra/http/routes/reviews.routes';
import { blogRoutes } from '../../../../modules/content/infra/http/routes/blog.routes';
import { analyticsRoutes } from '../../../../modules/analytics/infra/http/routes/analytics.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/leads', leadsRoutes);
routes.use('/services', servicesRoutes);
routes.use('/reviews', reviewsRoutes);
routes.use('/blog', blogRoutes);
routes.use('/analytics', analyticsRoutes);

export { routes };
