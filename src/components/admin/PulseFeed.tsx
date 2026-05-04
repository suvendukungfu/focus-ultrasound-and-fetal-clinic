import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  MessageSquare, 
  Calendar, 
  UserPlus, 
  Star, 
  CheckCircle,
  Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface PulseEvent {
  id: string;
  type: 'APPOINTMENT' | 'LEAD' | 'WHATSAPP' | 'REVIEW' | 'LOGIN' | 'SYSTEM';
  title: string;
  description: string;
  timestamp: Date;
  status?: 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';
}

const EVENT_ICONS = {
  APPOINTMENT: Calendar,
  LEAD: UserPlus,
  WHATSAPP: MessageSquare,
  REVIEW: Star,
  LOGIN: Bell,
  SYSTEM: Zap
};

const PulseFeed = () => {
  const [events, setEvents] = useState<PulseEvent[]>([]);

  // Simulation of realtime events
  useEffect(() => {
    const initialEvents: PulseEvent[] = [
      {
        id: '1',
        type: 'SYSTEM',
        title: 'System Online',
        description: 'Realtime pulse feed initialized.',
        timestamp: new Date(),
        status: 'SUCCESS'
      }
    ];
    setEvents(initialEvents);

    const interval = setInterval(() => {
      const types: PulseEvent['type'][] = ['APPOINTMENT', 'LEAD', 'WHATSAPP', 'REVIEW', 'LOGIN'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const newEvent: PulseEvent = {
        id: Math.random().toString(36).substr(2, 9),
        type: randomType,
        title: `New ${randomType.toLowerCase()}`,
        description: `Activity detected in ${randomType.toLowerCase()} module.`,
        timestamp: new Date(),
        status: 'INFO'
      };

      setEvents(prev => [newEvent, ...prev].slice(0, 5));
    }, 15000); // New event every 15s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 w-80 pointer-events-none">
      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {events.map((event) => {
            const Icon = EVENT_ICONS[event.type];
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                className="pointer-events-auto bg-card/80 backdrop-blur-2xl border border-border/50 p-4 rounded-3xl shadow-elevated flex items-start gap-4"
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  event.type === 'APPOINTMENT' ? 'bg-medical-teal/10 text-medical-teal' :
                  event.type === 'WHATSAPP' ? 'bg-green-500/10 text-green-600' :
                  event.type === 'REVIEW' ? 'bg-amber-500/10 text-amber-600' :
                  'bg-primary/10 text-primary'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-sm truncate">{event.title}</span>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase shrink-0">
                      {event.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{event.description}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PulseFeed;
