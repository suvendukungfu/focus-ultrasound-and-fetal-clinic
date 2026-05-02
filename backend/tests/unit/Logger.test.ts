/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Logger } from '../../src/core/Logger';

describe('Logger', () => {
  it('should have standard logging methods', () => {
    expect(typeof Logger.info).toBe('function');
    expect(typeof Logger.error).toBe('function');
    expect(typeof Logger.warn).toBe('function');
    expect(typeof Logger.http).toBe('function');
  });

  // Since winston logs to console and file, we mostly just want to verify it doesn't crash
  it('should not throw when logging messages', () => {
    expect(() => {
      Logger.info('Test info message');
      Logger.warn('Test warning message');
      Logger.error('Test error message');
    }).not.toThrow();
  });
});
