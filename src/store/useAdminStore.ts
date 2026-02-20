import { create } from 'zustand';

// Enum matches Prisma schema for Role
export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'STAFF' | 'VIEWER';

interface UserContext {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AdminEvent {
  id: string;
  type: string;
  payload: any;
  timestamp: string;
}

interface AdminState {
  events: AdminEvent[];
  user: UserContext | null;
  
  // Actions
  setUser: (user: UserContext | null) => void;
  addEvent: (event: AdminEvent) => void;
  clearEvents: () => void;
}

// Enterprise global state instance
export const useAdminStore = create<AdminState>((set) => ({
  events: [],
  user: null, // Should be populated upon successful login/session fetch
  
  setUser: (user) => set({ user }),
  
  addEvent: (event) => set((state) => ({ 
    // Keep max 50 events in memory to prevent performance degradation
    events: [event, ...state.events].slice(0, 50) 
  })),
  
  clearEvents: () => set({ events: [] })
}));
