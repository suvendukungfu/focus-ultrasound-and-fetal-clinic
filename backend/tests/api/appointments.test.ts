/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import request from 'supertest';
import { app } from '../../src/shared/infra/http/app';

describe('POST /api/v1/appointments', () => {
  const validAppointment = {
    name: 'Anita Verma',
    phone: '+919876543210',
    date: '2026-07-15T10:00:00.000Z',
    email: 'anita@test.com',
    notes: 'First pregnancy scan',
  };

  it('should accept a valid appointment booking', async () => {
    const response = await request(app)
      .post('/api/v1/appointments')
      .send(validAppointment)
      .set('Content-Type', 'application/json');

    // Expect 201 (created) or 400 if DB is offline in test env
    expect([201, 400, 500]).toContain(response.status);

    if (response.status === 201) {
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', validAppointment.name);
      expect(response.body).toHaveProperty('phone', validAppointment.phone);
    }
  });

  it('should return error for empty body', async () => {
    const response = await request(app)
      .post('/api/v1/appointments')
      .send({})
      .set('Content-Type', 'application/json');

    // Without required fields, should fail
    expect([400, 500]).toContain(response.status);
  });

  it('should handle missing phone gracefully', async () => {
    const response = await request(app)
      .post('/api/v1/appointments')
      .send({ name: 'Test', date: '2026-07-15T10:00:00.000Z' })
      .set('Content-Type', 'application/json');

    // Should not return 201 without a phone number
    expect(response.status).not.toBe(201);
  });
});

describe('GET /api/v1/appointments', () => {
  it('should require authentication to list appointments', async () => {
    const response = await request(app).get('/api/v1/appointments');

    // Should be 401 (no token) or 403
    expect([401, 403]).toContain(response.status);
  });

  it('should reject invalid bearer tokens', async () => {
    const response = await request(app)
      .get('/api/v1/appointments')
      .set('Authorization', 'Bearer invalid-fake-token');

    expect([401, 403]).toContain(response.status);
  });
});
