import { Reservation } from '../types/reservations';
import { generateId } from './helpers';
import { normalizeDate } from './dateHandling';

export const createReservation = (
  data: Omit<Reservation, 'id' | 'status' | 'createdAt'>
): Reservation => ({
  ...data,
  id: generateId(),
  status: 'active',
  createdAt: new Date().toISOString()
});

export const getReservationsForDate = (
  reservations: Record<string, Reservation[]>,
  date: string
): Reservation[] => reservations[normalizeDate(date)] || [];

export const getActiveReservations = (reservations: Reservation[]): Reservation[] =>
  reservations.filter(r => r.status === 'active');

export const getCompanionCount = (reservations: Reservation[]): number =>
  reservations.reduce((total, r) => 
    total + (r.status === 'active' ? r.companions.length : 0), 
    0
  );

export const validateReservation = (
  affiliateId: string,
  date: string,
  existingReservations: Record<string, Reservation[]>
): string | null => {
  const dateReservations = getReservationsForDate(existingReservations, date);
  const hasExisting = dateReservations.some(
    r => r.affiliateId === affiliateId && r.status === 'active'
  );

  return hasExisting ? 'Ya tenés una reserva activa para esta fecha' : null;
};