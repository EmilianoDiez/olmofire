import { useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { usePoolStore } from '../store/usePoolStore';
import { useReservationStore } from '../store/useReservationStore';

export const useReservationSync = () => {
  const { user } = useAuth();
  const { authorizedCompanions } = usePoolStore();
  const { reservations, updateReservationCompanions } = useReservationStore();

  const syncCompanions = useCallback(() => {
    if (!user || !reservations) return;

    const userCompanions = authorizedCompanions.filter(
      c => c.affiliateId === user.id && c.status === 'approved'
    );

    Object.entries(reservations).forEach(([date, dateReservations]) => {
      dateReservations
        .filter(r => r.affiliateId === user.id && r.status === 'active')
        .forEach(reservation => {
          const updatedCompanions = userCompanions.map(companion => ({
            id: companion.id,
            name: companion.name,
            dni: companion.dni
          }));

          updateReservationCompanions(date, reservation.id, updatedCompanions);
        });
    });
  }, [user?.id, authorizedCompanions, reservations, updateReservationCompanions]);

  useEffect(() => {
    syncCompanions();
  }, [syncCompanions]);
};