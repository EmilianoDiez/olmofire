import React, { useState, useEffect } from 'react';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import {
  getPendingRegistrations,
  approveUser,
  rejectUser,
  approveCompanion,
  rejectCompanion,
  type PendingRegistration
} from '../../services/firebase/admin';
import RegistrationTable from './RegistrationTable';

const RegistrationApprovals = () => {
  const { user } = useFirebaseAuth();
  const [pendingUsers, setPendingUsers] = useState<PendingRegistration[]>([]);
  const [pendingCompanions, setPendingCompanions] = useState<PendingRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPendingRegistrations = async () => {
    try {
      setIsLoading(true);
      const { users, companions } = await getPendingRegistrations();
      setPendingUsers(users);
      setPendingCompanions(companions);
    } catch (err) {
      setError('Error loading pending registrations');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPendingRegistrations();
  }, []);

  const handleApproveUser = async (userId: string) => {
    try {
      await approveUser(userId, user?.name || 'Admin');
      await loadPendingRegistrations();
    } catch (err) {
      setError('Error approving user');
      console.error(err);
    }
  };

  const handleRejectUser = async (userId: string) => {
    try {
      await rejectUser(userId, user?.name || 'Admin');
      await loadPendingRegistrations();
    } catch (err) {
      setError('Error rejecting user');
      console.error(err);
    }
  };

  const handleApproveCompanion = async (companionId: string) => {
    try {
      await approveCompanion(companionId, user?.name || 'Admin');
      await loadPendingRegistrations();
    } catch (err) {
      setError('Error approving companion');
      console.error(err);
    }
  };

  const handleRejectCompanion = async (companionId: string) => {
    try {
      await rejectCompanion(companionId, user?.name || 'Admin');
      await loadPendingRegistrations();
    } catch (err) {
      setError('Error rejecting companion');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Afiliados Pendientes</h2>
        <RegistrationTable
          registrations={pendingUsers}
          type="user"
          onApprove={handleApproveUser}
          onReject={handleRejectUser}
        />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Acompañantes Pendientes</h2>
        <RegistrationTable
          registrations={pendingCompanions}
          type="companion"
          onApprove={handleApproveCompanion}
          onReject={handleRejectCompanion}
        />
      </div>
    </div>
  );
};

export default RegistrationApprovals;