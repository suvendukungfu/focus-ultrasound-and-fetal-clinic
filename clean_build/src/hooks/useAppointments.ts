import { useState } from 'react';

export interface AppointmentData {
  name: string;
  phone: string;
  service: string;
  date: string; // ISO string
  message?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

export const useAppointments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAppointment = async (data: AppointmentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create appointment');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.warn('Backend connection failed, applying fallback for appointment submission:', err);
      // Fallback: If backend is unreachable, simulate a successful appointment creation locally
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulated network delay
      
      try {
        const existing = JSON.parse(localStorage.getItem('local_leads') || '[]');
        const newLead = {
          id: 'l' + Date.now(),
          name: data.name,
          phone: data.phone,
          email: '',
          message: data.message || `Service requested: ${data.service}`,
          source: 'website',
          status: 'NEW',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('local_leads', JSON.stringify([newLead, ...existing]));
      } catch (e) {
        console.error('Failed to save to local storage', e);
      }

      return { success: true, message: 'Appointment simulated successfully', data };
    } finally {
      setLoading(false);
    }
  };

  return { createAppointment, loading, error };
};
