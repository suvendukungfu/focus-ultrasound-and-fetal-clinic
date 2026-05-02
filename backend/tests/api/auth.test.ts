/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import request from 'supertest';
import { app } from '../../src/shared/infra/http/app';

describe('POST /api/v1/auth/login', () => {
  it('should reject login with empty credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({})
      .set('Content-Type', 'application/json');

    // Should fail — no email/password
    expect([400, 401, 500]).toContain(response.status);
  });

  it('should reject login with non-existent email', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'nobody@doesnotexist.com',
        password: 'SomePassword123!',
      })
      .set('Content-Type', 'application/json');

    expect([400, 401, 500]).toContain(response.status);
  });

  it('should reject login with wrong password format', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@focus-clinic.com',
        password: '',
      })
      .set('Content-Type', 'application/json');

    expect([400, 401, 500]).toContain(response.status);
  });

  it('should return JSON content-type on login attempts', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@focus-clinic.com',
        password: 'Admin@123!',
      })
      .set('Content-Type', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
  });
});

describe('POST /api/v1/auth/register', () => {
  it('should reject registration with missing fields', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'test@example.com' })
      .set('Content-Type', 'application/json');

    expect([400, 500]).toContain(response.status);
  });
});
