import { useState } from 'react';
import { createReservation, cancelReservation } from '../services/firebase/reservations';
import { useFirebaseAuth } from './useFirebaseAuth';

export const useReservations = () => {
  const { user } = useFirebaseAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (date: string, companionIds: string[]) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      return await createReservation(user.id, date, companionIds);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create reservation';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancel = async (reservationId: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      await cancelReservation(reservationId, user.id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to cancel reservation';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    create,
    cancel,
    loading,
    error
  };
};