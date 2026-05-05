export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'STAFF' | 'RECEPTIONIST';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  lastLogin?: string;
  status: 'ACTIVE' | 'DISABLED';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export type Permission = 
  | 'VIEW_DASHBOARD'
  | 'MANAGE_APPOINTMENTS'
  | 'MANAGE_LEADS'
  | 'MANAGE_REVIEWS'
  | 'MANAGE_USERS'
  | 'MANAGE_SETTINGS'
  | 'EXPORT_DATA';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    'VIEW_DASHBOARD',
    'MANAGE_APPOINTMENTS',
    'MANAGE_LEADS',
    'MANAGE_REVIEWS',
    'MANAGE_USERS',
    'MANAGE_SETTINGS',
    'EXPORT_DATA'
  ],
  ADMIN: [
    'VIEW_DASHBOARD',
    'MANAGE_APPOINTMENTS',
    'MANAGE_LEADS',
    'MANAGE_REVIEWS',
    'MANAGE_SETTINGS'
  ],
  STAFF: [
    'VIEW_DASHBOARD',
    'MANAGE_APPOINTMENTS',
    'MANAGE_LEADS',
    'MANAGE_REVIEWS'
  ],
  RECEPTIONIST: [
    'VIEW_DASHBOARD',
    'MANAGE_APPOINTMENTS',
    'MANAGE_LEADS'
  ]
};
