import { DayStats } from '../types/calendar';

export const getCapacityClass = (currentCount: number): string => {
  if (currentCount <= 70) return 'bg-green-100 text-green-800';
  if (currentCount <= 140) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
};

export const getCapacityStatus = (stats: DayStats) => {
  const { currentReservations, totalCapacity } = stats;
  const percentage = (currentReservations / totalCapacity) * 100;

  if (percentage <= 35) return 'low';
  if (percentage <= 70) return 'medium';
  return 'high';
};