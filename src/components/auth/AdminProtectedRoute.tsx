import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import AdminLogin from '../admin/AdminLogin';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useFirebaseAuth();
  const isAdmin = user?.role === 'admin';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminLogin />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;