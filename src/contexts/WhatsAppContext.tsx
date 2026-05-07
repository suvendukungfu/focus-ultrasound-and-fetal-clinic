import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface WhatsAppState {
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  weeks: string;
}

interface WhatsAppContextValue extends WhatsAppState {
  setService: (service: string) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setWeeks: (weeks: string) => void;
  buildMessage: (overrideState?: Partial<WhatsAppState>) => string;
  buildUrl: (overrideState?: Partial<WhatsAppState>) => string;
}

const PHONE = '919870475400';

const WhatsAppContext = createContext<WhatsAppContextValue | null>(null);

/**
 * Formats a date string (YYYY-MM-DD) into a friendly relative or absolute label.
 * Returns "today", "tomorrow", or "on Mon, 5 May" etc.
 */
function friendlyDate(dateStr: string): string {
  if (!dateStr) return '';
  const target = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffMs = target.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / 86400000);

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'tomorrow';

  return `on ${target.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })}`;
}

/**
 * Converts "14:30" → "2:30 PM"
 */
function friendlyTime(timeStr: string): string {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${ampm}`;
}

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WhatsAppState>({
    service: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    weeks: '',
  });

  const setService = useCallback((service: string) => {
    setState((prev) => ({ ...prev, service }));
  }, []);

  const setDate = useCallback((date: string) => {
    setState((prev) => ({ ...prev, date }));
  }, []);

  const setTime = useCallback((time: string) => {
    setState((prev) => ({ ...prev, time }));
  }, []);

  const setName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, name }));
  }, []);

  const setPhone = useCallback((phone: string) => {
    setState((prev) => ({ ...prev, phone }));
  }, []);

  const setWeeks = useCallback((weeks: string) => {
    setState((prev) => ({ ...prev, weeks }));
  }, []);

  const buildMessage = useCallback((overrideState?: Partial<WhatsAppState>) => {
    const { service, date, time, name, phone, weeks } = overrideState || state;

    // Default fallback when nothing is selected
    if (!service && !date && !time && !name) {
      return 'Hello, I want to book an appointment at Focus Ultrasound & Fetal Clinic.';
    }

    let msg = '*New Appointment Booking Request* 🏥\n\n';

    if (name) msg += `*Patient Name:* ${name}\n`;
    if (phone) msg += `*Phone:* ${phone}\n`;
    if (weeks) msg += `*Weeks of Pregnancy:* ${weeks}\n`;
    if (service) msg += `*Scan Type:* ${service}\n`;
    
    if (date) {
      msg += `*Date:* ${friendlyDate(date)}\n`;
    }

    if (time) {
      msg += `*Time:* ${friendlyTime(time)}\n`;
    }

    msg += '\nHello, I would like to confirm this appointment. Please let me know the availability.';
    
    return msg;
  }, [state]);

  const buildUrl = useCallback((overrideState?: Partial<WhatsAppState>) => {
    const text = encodeURIComponent(buildMessage(overrideState));
    return `https://wa.me/${PHONE}?text=${text}`;
  }, [buildMessage]);

  return (
    <WhatsAppContext.Provider
      value={{
        ...state,
        setService,
        setDate,
        setTime,
        setName,
        setPhone,
        setWeeks,
        buildMessage,
        buildUrl,
      }}
    >
      {children}
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp() {
  const ctx = useContext(WhatsAppContext);
  if (!ctx) throw new Error('useWhatsApp must be used within <WhatsAppProvider>');
  return ctx;
}
