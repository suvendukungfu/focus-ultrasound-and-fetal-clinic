import { Router } from 'express';
import { SystemController } from '../../../../modules/selfHealing/useCases/GetSystemHealth/SystemController';

const systemRoutes = Router();
const controller = new SystemController();

systemRoutes.get('/health', controller.getHealth);
systemRoutes.get('/metrics', controller.getMetrics);

export { systemRoutes };
