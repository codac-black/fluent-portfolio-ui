import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from "react-router-dom";
import { useIsAdmin } from "@/hooks/useIsAdmin";

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

  // Special logic: Only for /blog/admin route
  const isBlogAdmin = location.pathname === "/blog/admin";
  const { isAdmin, loading: adminLoading } = useIsAdmin();

  if (loading || (isBlogAdmin && adminLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (isBlogAdmin && !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900/20 dark:to-orange-900/20 flex flex-col items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-900 p-8 rounded shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Access Denied</h2>
          <p className="mb-4">You do not have permission to view the admin panel.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
