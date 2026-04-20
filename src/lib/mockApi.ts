import { nanoid } from 'nanoid';

// Types
interface Appointment {
  id: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  service: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  status: 'NEW' | 'CONTACTED' | 'BOOKED' | 'CLOSED';
  createdAt: string;
}

// Initial Data
const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: '1', name: 'Priya Sharma', phone: '+91 98765 43210', service: 'NT Scan', date: '2026-05-05T10:00:00Z', status: 'CONFIRMED', createdAt: new Date().toISOString() },
  { id: '2', name: 'Anita Verma', phone: '+91 87654 32100', service: 'Anomaly Scan', date: '2026-05-06T11:30:00Z', status: 'PENDING', createdAt: new Date().toISOString() },
];

const INITIAL_LEADS: Lead[] = [
  { id: 'L1', name: 'Rahul Khanna', phone: '+91 99999 88888', message: 'Interested in level 2 ultrasound', status: 'NEW', createdAt: new Date().toISOString() },
];

// Helper to get/set data in localStorage
const getStore = <T>(key: string, initial: T[]): T[] => {
  const data = localStorage.getItem(`focus_mock_${key}`);
  if (!data) {
    localStorage.setItem(`focus_mock_${key}`, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
};

const setStore = <T>(key: string, data: T[]) => {
  localStorage.setItem(`focus_mock_${key}`, JSON.stringify(data));
};

// Mock Interceptor
export const setupMockApi = () => {
  const originalFetch = window.fetch;
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = input.toString();
    const method = init?.method?.toUpperCase() || 'GET';

    // If it's an API call, try the real backend first
    if (url.includes('/api/v1')) {
      try {
        // Only try real fetch if it's NOT already directed to the real API_BASE 
        // (to avoid infinite recursion if we modified the URL)
        const response = await originalFetch(input, init);
        if (response.ok || response.status < 500) {
          return response;
        }
        console.warn(`[API] Server returned ${response.status}, falling back to mock.`);
      } catch (err) {
        console.warn(`[API] Server unreachable, falling back to mock:`, err);
      }

      console.log(`[Mock API] ${method} ${url}`);
      
      // Artificial Delay for realistic UX
      await new Promise(resolve => setTimeout(resolve, 400));

      // --- APPOINTMENTS ---
      if (url.endsWith('/appointments') && method === 'GET') {
        const data = getStore('appointments', INITIAL_APPOINTMENTS);
        return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      if (url.endsWith('/appointments') && method === 'POST') {
        const body = JSON.parse(init?.body as string);
        const newAppt: Appointment = {
          ...body,
          id: nanoid(),
          status: 'PENDING',
          createdAt: new Date().toISOString(),
        };
        const data = getStore('appointments', INITIAL_APPOINTMENTS);
        setStore('appointments', [newAppt, ...data]);
        return new Response(JSON.stringify(newAppt), { status: 201 });
      }

      if (url.match(/\/appointments\/[^/]+\/status$/) && method === 'PATCH') {
        const id = url.split('/').slice(-2, -1)[0];
        const { status } = JSON.parse(init?.body as string);
        const data = getStore('appointments', INITIAL_APPOINTMENTS);
        const updated = data.map(a => a.id === id ? { ...a, status } : a);
        setStore('appointments', updated);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }

      // --- LEADS ---
      if (url.endsWith('/leads') && method === 'GET') {
        const data = getStore('leads', INITIAL_LEADS);
        return new Response(JSON.stringify(data), { status: 200 });
      }

      if (url.endsWith('/leads') && method === 'POST') {
        const body = JSON.parse(init?.body as string);
        const newLead: Lead = {
          ...body,
          id: nanoid(),
          status: 'NEW',
          createdAt: new Date().toISOString(),
        };
        const data = getStore('leads', INITIAL_LEADS);
        setStore('leads', [newLead, ...data]);
        return new Response(JSON.stringify(newLead), { status: 201 });
      }

      // --- AUTH ---
      if (url.endsWith('/auth/login') && method === 'POST') {
        const { email, password } = JSON.parse(init?.body as string);
        if (email.trim().toLowerCase() === 'admin@focusultrasound.in' && password === 'Focus@Admin2026') {
          return new Response(JSON.stringify({
            token: 'mock-jwt-token',
            user: { id: 'admin-1', name: 'Dr. Admin', email, role: 'ADMIN' }
          }), { status: 200 });
        }
        return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
      }

      // --- ANALYTICS ---
      if (url.endsWith('/analytics/dashboard') && method === 'GET') {
        const appointments = getStore('appointments', INITIAL_APPOINTMENTS);
        const leads = getStore('leads', INITIAL_LEADS);
        return new Response(JSON.stringify({
          totalLeads: leads.length + 42,
          newLeads: leads.filter(l => l.status === 'NEW').length + 5,
          totalServices: 12,
          totalReviews: 128,
          pendingReviews: 3,
        }), { status: 200 });
      }

      // --- HEALTH ---
      if (url.endsWith('/health')) {
        return new Response(JSON.stringify({ status: 'ok', environment: 'mock' }), { status: 200 });
      }
    }

    return originalFetch(input, init);
  };
};
