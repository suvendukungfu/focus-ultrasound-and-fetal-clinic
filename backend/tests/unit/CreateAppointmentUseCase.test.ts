/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { CreateAppointmentUseCase } from '../../src/modules/appointments/useCases/CreateAppointment/CreateAppointmentUseCase';

// Mock the appointment queue so tests don't need Redis
jest.mock('../../src/modules/appointments/infra/queue/AppointmentQueue', () => ({
  appointmentQueue: null, // Simulate Redis being offline
}));

describe('CreateAppointmentUseCase', () => {
  let useCase: CreateAppointmentUseCase;
  let mockRepo: any;

  const mockAppointment = {
    id: 'appt-uuid-1',
    name: 'Priya Sharma',
    phone: '+919876543210',
    email: 'priya@example.com',
    serviceId: 'svc-nt-scan',
    doctorId: 'doc-samar',
    date: new Date('2026-06-15T10:00:00Z'),
    notes: 'First visit',
    status: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockRepo = {
      create: jest.fn().mockResolvedValue(mockAppointment),
      listAll: jest.fn().mockResolvedValue([]),
      findById: jest.fn().mockResolvedValue(null),
      updateStatus: jest.fn().mockResolvedValue(mockAppointment),
    };
    useCase = new CreateAppointmentUseCase(mockRepo);
  });

  it('should create an appointment with valid data', async () => {
    const result = await useCase.execute({
      name: 'Priya Sharma',
      phone: '+919876543210',
      email: 'priya@example.com',
      serviceId: 'svc-nt-scan',
      doctorId: 'doc-samar',
      date: new Date('2026-06-15T10:00:00Z'),
      notes: 'First visit',
    });

    expect(result).toEqual(mockAppointment);
    expect(mockRepo.create).toHaveBeenCalledTimes(1);
    expect(mockRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Priya Sharma',
        phone: '+919876543210',
      })
    );
  });

  it('should create an appointment with minimal fields (name, phone, date)', async () => {
    const minimalAppointment = {
      ...mockAppointment,
      serviceId: undefined,
      doctorId: undefined,
      email: undefined,
      notes: undefined,
    };
    mockRepo.create.mockResolvedValue(minimalAppointment);

    const result = await useCase.execute({
      name: 'Rahul Kumar',
      phone: '+919988776655',
      date: new Date('2026-07-01T14:00:00Z'),
    });

    expect(result).toBeDefined();
    expect(mockRepo.create).toHaveBeenCalledTimes(1);
  });

  it('should handle repository errors gracefully', async () => {
    mockRepo.create.mockRejectedValue(new Error('Database connection failed'));

    await expect(
      useCase.execute({
        name: 'Test',
        phone: '+910000000000',
        date: new Date(),
      })
    ).rejects.toThrow('Database connection failed');
  });

  it('should not crash when appointmentQueue is null (Redis offline)', async () => {
    // This test verifies the null-safety guards we added earlier
    const result = await useCase.execute({
      name: 'No Redis User',
      phone: '+919999999999',
      date: new Date('2026-08-01T09:00:00Z'),
    });

    expect(result).toEqual(mockAppointment);
    // No queue errors thrown — the null check protected us
  });
});
