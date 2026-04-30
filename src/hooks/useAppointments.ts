import { useState } from 'react';

export interface AppointmentData {
  name: string;
  phone: string;
  email?: string;
  serviceId?: string;
  doctorId?: string;
  date: string; // ISO string
  notes?: string;
  // Additional fields from the UI form
  age?: string;
  weight?: string;
  medicalConditions?: string;
  weeksOfPregnancy?: string;
  doctorPreference?: string;
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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create appointment');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createAppointment, loading, error };
};
