import React, { useEffect } from 'react';
import { useReservationStore } from '../../store/useReservationStore';
import { usePoolStore } from '../../store/usePoolStore';
import EntryStats from './EntryStats';
import EntryHistory from './EntryHistory';
import ReservationHistory from './ReservationHistory';
import QRCodeSection from './QRCodeSection';

const EntryDashboard = () => {
  const { getReservationsForDate } = useReservationStore();
  const { setReservations, setEntries } = usePoolStore();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayReservations = getReservationsForDate(today);
    
    const activeReservations = todayReservations.filter(r => r.status === 'active');
    const totalPeople = activeReservations.reduce((total, r) => 
      total + 1 + r.companions.length, 0
    );
    
    const completedReservations = todayReservations.filter(r => r.status === 'completed');
    const totalEntries = completedReservations.reduce((total, r) => 
      total + 1 + r.companions.length, 0
    );

    setReservations(totalPeople);
    setEntries(totalEntries);
  }, [getReservationsForDate, setReservations, setEntries]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Monitoreo</h1>
        <p className="text-gray-600">Control de ingresos y reservas</p>
      </div>

      <div className="space-y-8">
        <QRCodeSection />
        <EntryStats />
        <EntryHistory />
        <ReservationHistory />
      </div>
    </div>
  );
};

export default EntryDashboard;