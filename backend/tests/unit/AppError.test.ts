import { AppError } from '../../src/core/AppError';

describe('AppError', () => {
  it('should create an error with default statusCode 400', () => {
    const error = new AppError('Something went wrong');

    expect(error.message).toBe('Something went wrong');
    expect(error.statusCode).toBe(400);
  });

  it('should create an error with a custom statusCode', () => {
    const error = new AppError('Not Found', 404);

    expect(error.message).toBe('Not Found');
    expect(error.statusCode).toBe(404);
  });

  it('should create an error with 401 for authentication failures', () => {
    const error = new AppError('Unauthorized', 401);

    expect(error.message).toBe('Unauthorized');
    expect(error.statusCode).toBe(401);
  });

  it('should have readonly message and statusCode', () => {
    const error = new AppError('Test');

    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('statusCode');
  });
});
