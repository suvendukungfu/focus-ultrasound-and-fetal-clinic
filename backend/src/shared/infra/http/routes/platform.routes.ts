import { Router } from 'express';
import { PlatformController } from '../../../../modules/platform/useCases/GetPlatformStats/PlatformController';

const platformRoutes = Router();
const controller = new PlatformController();

platformRoutes.get('/topology', controller.getTopology.bind(controller));
platformRoutes.get('/services', controller.getTopology.bind(controller)); // aliases for now
platformRoutes.get('/health', controller.getTopology.bind(controller));

export { platformRoutes };
