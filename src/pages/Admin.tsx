import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePoolStore } from '../store/usePoolStore';
import AdminLogin from '../components/admin/AdminLogin';
import RegistrationApprovals from '../components/admin/RegistrationApprovals';
import QRCodeManagement from '../components/admin/QRCodeManagement';
import { useAdminAuth } from '../hooks/useAdminAuth';

const Admin = () => {
  const { isAuthenticated } = useAdminAuth();
  
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Panel de Administración FADIUNC</h1>
      <div className="space-y-8">
        <RegistrationApprovals />
        <QRCodeManagement />
      </div>
    </div>
  );
};

export default Admin;