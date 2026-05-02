import { Router } from 'express';
import { CreateAppointmentController } from '../../../useCases/CreateAppointment/CreateAppointmentController';
import { ListAppointmentsController } from '../../../useCases/ListAppointments/ListAppointmentsController';
import { UpdateAppointmentStatusController } from '../../../useCases/UpdateAppointmentStatus/UpdateAppointmentStatusController';
import { ensureAuthenticated, ensureAdmin } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

const createAppointmentController = new CreateAppointmentController();
const listAppointmentsController = new ListAppointmentsController();
const updateAppointmentStatusController = new UpdateAppointmentStatusController();

// Public route for patients to book
appointmentsRouter.post('/', createAppointmentController.handle);

// Admin routes
appointmentsRouter.get('/', ensureAuthenticated, ensureAdmin, listAppointmentsController.handle);
appointmentsRouter.patch('/:id/status', ensureAuthenticated, ensureAdmin, updateAppointmentStatusController.handle);

export { appointmentsRouter };
