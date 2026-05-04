import { useState, useCallback } from 'react';

export interface AuditEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  module: 'APPOINTMENTS' | 'REVIEWS' | 'USERS' | 'LEADS' | 'SYSTEM';
  details: string;
  ipAddress?: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
}

export function useAuditLog() {
  const logAction = useCallback((entry: Omit<AuditEntry, 'id' | 'timestamp'>) => {
    const newEntry: AuditEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };

    // In a real app, this would be an API call
    const logs = JSON.parse(localStorage.getItem('audit_logs') || '[]');
    localStorage.setItem('audit_logs', JSON.stringify([newEntry, ...logs].slice(0, 500))); // Keep last 500 logs
    
    console.log('[Audit Log]:', newEntry);
  }, []);

  return { logAction };
}
