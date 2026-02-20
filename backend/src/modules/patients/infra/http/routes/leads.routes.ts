import { Router } from 'express';
import { CreateLeadController } from '../../../useCases/CreateLead/CreateLeadController';
import { ListLeadsController } from '../../../useCases/ListLeads/ListLeadsController';
// import { ensureAuthenticated } from '../../../../shared/infra/http/middlewares/ensureAuthenticated';

const leadsRoutes = Router();

const createLeadController = new CreateLeadController();
const listLeadsController = new ListLeadsController();

// Public route for website form
leadsRoutes.post('/', createLeadController.handle);

// Protected route for CRM
// leadsRoutes.get('/', ensureAuthenticated, listLeadsController.handle);
leadsRoutes.get('/', listLeadsController.handle);

export { leadsRoutes };
