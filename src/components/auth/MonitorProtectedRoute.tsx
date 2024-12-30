import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import MonitorLogin from '../monitor/MonitorLogin';

interface MonitorProtectedRouteProps {
  children: React.ReactNode;
}

const MonitorProtectedRoute: React.FC<MonitorProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useFirebaseAuth();
  const isMonitor = user?.role === 'monitor';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isMonitor) {
    return <MonitorLogin />;
  }

  return <>{children}</>;
};

export default MonitorProtectedRoute;