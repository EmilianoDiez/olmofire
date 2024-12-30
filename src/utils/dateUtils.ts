import { isWeekend, parseISO } from 'date-fns';
import { POOL_LIMITS, HOLIDAYS_2024 } from './constants';

export const isHoliday = (date: Date): boolean => {
  const dateString = date.toISOString().split('T')[0];
  return HOLIDAYS_2024.includes(dateString);
};

export const getPoolLimits = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const isWeekendOrHoliday = isWeekend(dateObj) || isHoliday(dateObj);
  return isWeekendOrHoliday ? POOL_LIMITS.WEEKEND : POOL_LIMITS.WEEKDAY;
};

export const formatDateForDisplay = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(dateObj);
};

// Add the getCapacityClass function
export const getCapacityClass = (currentCount: number): string => {
  if (currentCount <= 70) return 'bg-green-100 text-green-800';
  if (currentCount <= 140) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
};