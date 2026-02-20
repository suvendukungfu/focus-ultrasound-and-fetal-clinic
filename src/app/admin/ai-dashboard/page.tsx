import React from 'react';
import { AIInsightCard } from '../../../components/admin/ai/AIInsightCard';
import { LiveEventFeed } from '../../../components/admin/realtime/LiveEventFeed';
import { RoleGuard } from '../../../components/admin/core/RoleGuard';

export default function AIDashboardPage() {
  return (
    <div className="min-h-screen bg-black p-8 text-neutral-200">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">AI Command Center</h1>
          <p className="text-neutral-500 mt-1">Real-time system intelligence and anomaly detection.</p>
        </div>
        <RoleGuard allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Generate Report
          </button>
        </RoleGuard>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Metrics & AI Insights */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AIInsightCard />
            {/* Add more AIInsight cards or analytic heatmaps here */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-2xl flex items-center justify-center h-full min-h-[160px]">
               <p className="text-neutral-500 font-medium">Service Heatmap [Lazy Loaded]</p>
            </div>
          </div>
          
          {/* Main Chart Area */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-2xl h-80 flex items-center justify-center">
             <p className="text-neutral-500 font-medium">Monthly Growth Analytics Chart [Suspense Boundary]</p>
          </div>
        </div>

        {/* Right Column: Live Feed */}
        <div className="lg:col-span-1">
          <LiveEventFeed />
        </div>
      </div>
    </div>
  );
}
