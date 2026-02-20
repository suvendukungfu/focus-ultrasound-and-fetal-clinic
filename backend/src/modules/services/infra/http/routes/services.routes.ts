import { Router } from 'express';
import { CreateServiceController } from '../../../useCases/CreateService/CreateServiceController';
import { ListServicesController } from '../../../useCases/ListServices/ListServicesController';
// import { ensureAuthenticated, ensureAdmin } from '../../../../shared/infra/http/middlewares/ensureAuthenticated';

const servicesRoutes = Router();

const createServiceController = new CreateServiceController();
const listServicesController = new ListServicesController();

// Only Admin should create services
// servicesRoutes.post('/', ensureAuthenticated, ensureAdmin, createServiceController.handle);
servicesRoutes.post('/', createServiceController.handle);

// Public or Protected depending on requirements
servicesRoutes.get('/', listServicesController.handle);

export { servicesRoutes };
