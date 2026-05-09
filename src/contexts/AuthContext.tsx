import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole, Permission, ROLE_PERMISSIONS } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: Permission) => boolean;
  isRole: (role: UserRole | UserRole[]) => boolean;
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const IDLE_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('auth_token'));
  const navigate = useNavigate();
  const { toast } = useToast();

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('last_activity');
    navigate('/admin/login');
  }, [navigate]);

  // Idle Timeout Logic
  useEffect(() => {
    if (!isAuthenticated) return;

    const checkIdle = () => {
      const lastActivity = parseInt(localStorage.getItem('last_activity') || '0');
      if (Date.now() - lastActivity > IDLE_TIMEOUT) {
        toast({
          title: "Session Expired",
          description: "You have been logged out due to inactivity.",
          variant: "destructive"
        });
        logout();
      }
    };

    const updateActivity = () => {
      localStorage.setItem('last_activity', Date.now().toString());
    };

    const interval = setInterval(checkIdle, 60000); // Check every minute
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    updateActivity();

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
    };
  }, [token, logout, toast]);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    localStorage.setItem('last_activity', Date.now().toString());
    
    toast({
      title: "Welcome Back",
      description: `Logged in as ${newUser.name} (${newUser.role})`
    });
    
    navigate('/admin/dashboard');
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    const permissions = ROLE_PERMISSIONS[user.role as UserRole] || [];
    return permissions.includes(permission);
  };

  const isRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(user.role as UserRole);
  };

  const refreshSession = () => {
    localStorage.setItem('last_activity', Date.now().toString());
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      isAuthenticated,
      hasPermission,
      isRole,
      refreshSession
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
