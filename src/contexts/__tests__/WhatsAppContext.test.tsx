import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { WhatsAppProvider, useWhatsApp } from '@/contexts/WhatsAppContext';
import React from 'react';

function wrapper({ children }: { children: React.ReactNode }) {
  return React.createElement(WhatsAppProvider, null, children);
}

describe('WhatsAppContext', () => {
  it('should provide default empty state', () => {
    const { result } = renderHook(() => useWhatsApp(), { wrapper });

    expect(result.current.service).toBe('');
    expect(result.current.date).toBe('');
    expect(result.current.time).toBe('');
    expect(result.current.name).toBe('');
    expect(result.current.phone).toBe('');
    expect(result.current.weeks).toBe('');
  });

  it('should update service', () => {
    const { result } = renderHook(() => useWhatsApp(), { wrapper });

    act(() => {
      result.current.setService('NT Scan');
    });

    expect(result.current.service).toBe('NT Scan');
  });

  it('should update patient name', () => {
    const { result } = renderHook(() => useWhatsApp(), { wrapper });

    act(() => {
      result.current.setName('Priya Sharma');
    });

    expect(result.current.name).toBe('Priya Sharma');
  });

  it('should build a default message when no fields are set', () => {
    const { result } = renderHook(() => useWhatsApp(), { wrapper });

    const message = result.current.buildMessage();
    expect(message).toContain('Focus Ultrasound');
  });

  it('should build a detailed message when fields are populated', () => {
    const { result } = renderHook(() => useWhatsApp(), { wrapper });

    act(() => {
      result.current.setName('Anita Verma');
      result.current.setPhone('+919876543210');
      result.current.setService('Anomaly Scan');
      result.current.setWeeks('20');
    });

    const message = result.current.buildMessage();
    expect(message).toContain('Anita Verma');
    expect(message).toContain('+919876543210');
    expect(message).toContain('Anomaly Scan');
    expect(message).toContain('20');
  });

  it('should build a valid WhatsApp URL', () => {
    const { result } = renderHook(() => useWhatsApp(), { wrapper });

    const url = result.current.buildUrl();
    expect(url).toContain('https://wa.me/918287655133');
    expect(url).toContain('text=');
  });

  it('should throw when used outside provider', () => {
    expect(() => {
      renderHook(() => useWhatsApp());
    }).toThrow('useWhatsApp must be used within <WhatsAppProvider>');
  });
});
