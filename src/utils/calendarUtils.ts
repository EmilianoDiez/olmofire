import { useCalendarStore } from '../store/useCalendarStore';
import { Reservation } from '../types/reservations';
import { normalizeDate } from './dateHandling';

export const updateCalendarStats = (date: string, reservations: Reservation[]): void => {
  const { updateDayStats } = useCalendarStore.getState();
  const normalizedDate = normalizeDate(date);
  
  const activeReservations = reservations.filter(r => r.status === 'active');
  const totalCompanions = activeReservations.reduce(
    (sum, r) => sum + r.companions.length,
    0
  );

  updateDayStats(normalizedDate, {
    affiliateReservations: activeReservations.length,
    companionReservations: totalCompanions,
    currentReservations: activeReservations.length + totalCompanions
  });
};

export const getReservationStats = (reservations: Reservation[]) => {
  const activeReservations = reservations.filter(r => r.status === 'active');
  const totalCompanions = activeReservations.reduce(
    (sum, r) => sum + r.companions.length,
    0
  );

  return {
    affiliates: activeReservations.length,
    companions: totalCompanions,
    total: activeReservations.length + totalCompanions
  };
};