import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ReservationState } from '../types/reservations';
import { generateId } from '../utils/helpers';
import { useCalendarStore } from './useCalendarStore';
import { sendReservationConfirmationEmail } from '../services/email';

export const useReservationStore = create<ReservationState>()(
  persist(
    (set, get) => ({
      reservations: {},
      
      hasActiveReservation: (affiliateId: string, date: string) => {
        const dateReservations = get().reservations[date] || [];
        return dateReservations.some(r => 
          r.affiliateId === affiliateId && r.status === 'active'
        );
      },

      getReservationsForDate: (date: string) => {
        return get().reservations[date] || [];
      },

      updateReservationCompanions: (date: string, reservationId: string, companions: Array<{ id: string; name: string; dni: string }>) => {
        set(state => ({
          reservations: {
            ...state.reservations,
            [date]: (state.reservations[date] || []).map(reservation =>
              reservation.id === reservationId
                ? { ...reservation, companions }
                : reservation
            )
          }
        }));
      },

      addReservation: (newReservation) => {
        const hasExisting = get().hasActiveReservation(
          newReservation.affiliateId,
          newReservation.date
        );

        if (hasExisting) {
          throw new Error('Ya tenés una reserva activa para esta fecha');
        }

        const reservation = {
          ...newReservation,
          id: generateId(),
          status: 'active',
          createdAt: new Date().toISOString()
        };

        set((state) => {
          const dateReservations = state.reservations[reservation.date] || [];
          const newState = {
            reservations: {
              ...state.reservations,
              [reservation.date]: [...dateReservations, reservation]
            }
          };

          // Update calendar stats
          const { updateDayStats } = useCalendarStore.getState();
          const activeReservations = newState.reservations[reservation.date].filter(
            r => r.status === 'active'
          );
          
          updateDayStats(reservation.date, {
            affiliateReservations: activeReservations.length,
            companionReservations: activeReservations.reduce(
              (total, r) => total + r.companions.length, 
              0
            )
          });

          // Send confirmation email
          sendReservationConfirmationEmail(
            newReservation.affiliateEmail,
            newReservation.affiliateName,
            reservation.date,
            reservation.companions
          ).catch(console.error);

          return newState;
        });
      },

      cancelReservation: (id: string) => {
        set((state) => {
          const updatedReservations = { ...state.reservations };
          let updatedDate: string | null = null;

          Object.entries(updatedReservations).forEach(([date, dateReservations]) => {
            const index = dateReservations.findIndex(r => r.id === id);
            if (index !== -1) {
              updatedDate = date;
              updatedReservations[date] = dateReservations.map(r =>
                r.id === id ? { ...r, status: 'cancelled' } : r
              );
            }
          });

          if (updatedDate) {
            const { updateDayStats } = useCalendarStore.getState();
            const activeReservations = updatedReservations[updatedDate].filter(
              r => r.status === 'active'
            );
            
            updateDayStats(updatedDate, {
              affiliateReservations: activeReservations.length,
              companionReservations: activeReservations.reduce(
                (total, r) => total + r.companions.length, 
                0
              )
            });
          }

          return { reservations: updatedReservations };
        });
      }
    }),
    {
      name: 'reservation-store'
    }
  )
);