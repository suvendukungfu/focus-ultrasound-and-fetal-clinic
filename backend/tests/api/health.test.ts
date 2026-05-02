/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import request from 'supertest';
import { app } from '../../src/shared/infra/http/app';

describe('GET /api/v1/health', () => {
  it('should return 200 with UP status', async () => {
    const response = await request(app).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'UP');
    expect(response.body).toHaveProperty('timestamp');
  });

  it('should return a valid ISO timestamp', async () => {
    const response = await request(app).get('/api/v1/health');
    const timestamp = response.body.timestamp;

    expect(new Date(timestamp).toISOString()).toBe(timestamp);
  });

  it('should have JSON content-type', async () => {
    const response = await request(app).get('/api/v1/health');

    expect(response.headers['content-type']).toMatch(/json/);
  });

  it('should include CORS headers', async () => {
    const response = await request(app)
      .options('/api/v1/health')
      .set('Origin', 'http://localhost:5173');

    expect(response.headers['access-control-allow-origin']).toBeDefined();
  });
});
