
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import LoadingScreen from './LoadingScreen';
import AccessDeniedMessage from './AccessDeniedMessage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * If path is '/blog/admin', only allow admins;
 * Otherwise just require user to be logged in.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const isBlogAdmin = location.pathname === "/blog/admin";
  const { isAdmin, loading: adminLoading } = useIsAdmin();

  if (loading || (isBlogAdmin && adminLoading)) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (isBlogAdmin && !isAdmin) {
    return <AccessDeniedMessage />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
