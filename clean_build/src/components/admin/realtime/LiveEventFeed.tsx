import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminStore } from '../../../store/useAdminStore';
import { useEventStream } from '../../../hooks/socket/useEventStream';

export function LiveEventFeed() {
  // Activate SSE connection on component mount
  useEventStream();
  const events = useAdminStore((state) => state.events);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl flex flex-col h-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg text-white font-bold flex items-center">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
          Live Pulse Feed
        </h3>
        <span className="text-xs text-neutral-500">{events.length} Events</span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        <AnimatePresence initial={false}>
          {events.length === 0 && (
            <p className="text-neutral-500 text-sm text-center mt-10">Awaiting live system events...</p>
          )}
          {events.map((evt) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, height: 0, scale: 0.9 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-neutral-800 p-3 rounded-lg border border-neutral-700/50"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-blue-400 font-mono tracking-tight">{evt.type}</span>
                <span className="text-[10px] text-neutral-500">{new Date(evt.timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="text-sm text-neutral-300">
                {JSON.stringify(evt.payload).substring(0, 60)}{' '}
                {JSON.stringify(evt.payload).length > 60 && '...'}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
