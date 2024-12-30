import { ref, set, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../lib/firebase/database';
import type { FirebaseReservation } from '../../types/firebase';

export const createReservation = async (
  userId: string,
  date: string,
  companionIds: string[]
): Promise<{ id: string }> => {
  const id = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  
  const reservation: FirebaseReservation = {
    id,
    userId,
    date,
    status: 'active',
    companions: companionIds,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  await set(ref(db, `reservations/${id}`), reservation);
  return { id };
};

export const cancelReservation = async (reservationId: string, userId: string) => {
  const reservationRef = ref(db, `reservations/${reservationId}`);
  const snapshot = await get(reservationRef);
  
  if (!snapshot.exists()) throw new Error('Reservation not found');
  
  const reservation = snapshot.val();
  if (reservation.userId !== userId) {
    throw new Error('Unauthorized');
  }
  
  await set(reservationRef, {
    ...reservation,
    status: 'cancelled',
    updatedAt: new Date().toISOString()
  });
};