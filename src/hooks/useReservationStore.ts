import { create } from 'zustand';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../lib/firebase/database';
import type { FirebaseReservation } from '../types/firebase';

interface ReservationState {
  reservations: Record<string, FirebaseReservation[]>;
  loading: boolean;
  error: string | null;
  subscribeToReservations: (userId: string) => void;
  unsubscribeFromReservations: () => void;
}

export const useReservationStore = create<ReservationState>((set) => ({
  reservations: {},
  loading: false,
  error: null,

  subscribeToReservations: (userId: string) => {
    set({ loading: true });
    
    const reservationsRef = ref(db, 'reservations');
    onValue(reservationsRef, (snapshot) => {
      if (snapshot.exists()) {
        const reservations = snapshot.val();
        const userReservations: Record<string, FirebaseReservation[]> = {};

        Object.values(reservations).forEach((reservation: any) => {
          if (reservation.userId === userId) {
            const date = reservation.date;
            if (!userReservations[date]) {
              userReservations[date] = [];
            }
            userReservations[date].push(reservation);
          }
        });

        set({ reservations: userReservations, loading: false });
      } else {
        set({ reservations: {}, loading: false });
      }
    }, (error) => {
      set({ error: error.message, loading: false });
    });
  },

  unsubscribeFromReservations: () => {
    const reservationsRef = ref(db, 'reservations');
    off(reservationsRef);
  }
}));