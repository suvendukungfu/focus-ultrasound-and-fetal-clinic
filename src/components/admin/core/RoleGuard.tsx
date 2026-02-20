import React from 'react';
import { useAdminStore, Role } from '../../../store/useAdminStore';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: Role[];
  fallback?: React.ReactNode;
}

export const RoleGuard = ({ children, allowedRoles, fallback = null }: RoleGuardProps) => {
  const user = useAdminStore((state) => state.user);

  if (!user || !user.role || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
