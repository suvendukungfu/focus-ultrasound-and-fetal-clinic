/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import request from 'supertest';
import { app } from '../../src/shared/infra/http/app';

describe('API Security & Error Handling', () => {
  describe('404 Unknown Routes', () => {
    it('should handle unknown API routes', async () => {
      const response = await request(app).get('/api/v1/nonexistent-route');

      // Express default 404 or custom handler
      expect([404, 500]).toContain(response.status);
    });

    it('should handle unknown root routes', async () => {
      const response = await request(app).get('/this-does-not-exist');

      expect([404, 500]).toContain(response.status);
    });
  });

  describe('Security Headers', () => {
    it('should include Helmet security headers', async () => {
      const response = await request(app).get('/api/v1/health');

      // Helmet adds these headers by default
      expect(response.headers['x-content-type-options']).toBe('nosniff');
      expect(response.headers['x-frame-options']).toBeDefined();
    });

    it('should include strict-transport-security header', async () => {
      const response = await request(app).get('/api/v1/health');

      // Helmet's HSTS
      expect(response.headers).toHaveProperty('strict-transport-security');
    });
  });

  describe('CORS', () => {
    it('should respond to preflight requests', async () => {
      const response = await request(app)
        .options('/api/v1/health')
        .set('Origin', 'http://localhost:5173')
        .set('Access-Control-Request-Method', 'GET');

      expect(response.status).toBeLessThan(400);
      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });

  describe('Content-Type Handling', () => {
    it('should accept JSON payloads', async () => {
      const response = await request(app)
        .post('/api/v1/appointments')
        .send({ name: 'Test' })
        .set('Content-Type', 'application/json');

      // Should process the request (not 415 unsupported media type)
      expect(response.status).not.toBe(415);
    });
  });
});
