import { Companion } from '../types/store';
import { Reservation } from '../types/reservations';
import { areCompanionsEqual } from './comparators';

export const syncReservationCompanions = (
  affiliateId: string,
  companions: Companion[],
  reservations: Record<string, Reservation[]>,
  updateFn: (date: string, reservationId: string, companions: Array<{ id: string; name: string; dni: string }>) => void
) => {
  Object.entries(reservations).forEach(([date, dateReservations]) => {
    dateReservations
      .filter(r => r.affiliateId === affiliateId && r.status === 'active')
      .forEach(reservation => {
        const updatedCompanions = companions.map(companion => ({
          id: companion.id,
          name: companion.name,
          dni: companion.dni
        }));

        // Only update if companions have actually changed
        if (!areCompanionsEqual(reservation.companions, updatedCompanions)) {
          updateFn(date, reservation.id, updatedCompanions);
        }
      });
  });
};