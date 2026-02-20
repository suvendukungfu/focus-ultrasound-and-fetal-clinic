'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchQueueStatus } from '../../../lib/apiClient';
import { motion } from 'framer-motion';

export default function LiveQueuesPage() {
  // Polls backend analytics endpoint for active BullMQ counts
  const { data: queues, isLoading } = useQuery({
    queryKey: ['queues'],
    queryFn: fetchQueueStatus,
    refetchInterval: 3000 // Poll every 3 seconds for live updates
  });

  return (
    <div className="p-8 bg-black min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">System Worker Queues</h1>
        <p className="text-neutral-500 mt-1">Live visualization of BullMQ background processors.</p>
      </header>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
             <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 h-40 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {queues?.map((q, idx) => (
            <motion.div 
              key={q.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Animated Progress/Activity Bar at top */}
              {q.active > 0 && (
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute top-0 left-0 w-1/2 h-1 bg-blue-500 blur-sm"
                />
              )}
              
              <h3 className="text-lg text-white font-bold mb-4">{q.name}</h3>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-black/50 p-3 rounded-lg border border-neutral-800">
                  <span className="block text-xl font-bold text-blue-400">{q.active}</span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Active</span>
                </div>
                <div className="bg-black/50 p-3 rounded-lg border border-neutral-800">
                  <span className="block text-xl font-bold text-green-400">{q.completed}</span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Done</span>
                </div>
                <div className="bg-black/50 p-3 rounded-lg border border-neutral-800">
                  <span className="block text-xl font-bold text-red-400">{q.failed}</span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Failed</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
