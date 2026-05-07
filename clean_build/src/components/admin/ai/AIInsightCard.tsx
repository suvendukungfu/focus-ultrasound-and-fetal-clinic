import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getAnalytics } from '../../../lib/apiClient';

export function AIInsightCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['analytics', 'insights'],
    queryFn: getAnalytics,
    staleTime: 5 * 60 * 1000 // Cache for 5 mins
  });

  if (isLoading) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-2xl animate-pulse h-32" />
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
      <h3 className="text-sm text-neutral-400 font-medium">AI Insight Projection</h3>
      <p className="text-xl text-white font-bold mt-2">
        Lead conversion predicted to increase by <span className="text-purple-400">{data?.conversionIncrease}%</span> this week.
      </p>
      <div className="mt-4 flex items-center space-x-2 text-xs text-neutral-500">
        <span className="text-green-400">●</span> 
        <span>Based on {data?.sentiment.toLowerCase()} 30-day sentiment trends</span>
      </div>
    </motion.div>
  );
}
