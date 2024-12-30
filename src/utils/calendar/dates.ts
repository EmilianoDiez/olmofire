import { isWeekend, parseISO, startOfDay, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { POOL_LIMITS, HOLIDAYS_2024 } from '../../constants';

export const isHoliday = (date: Date): boolean => {
  const dateString = startOfDay(date).toISOString().split('T')[0];
  return HOLIDAYS_2024.includes(dateString);
};

export const getPoolLimits = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const isWeekendOrHoliday = isWeekend(dateObj) || isHoliday(dateObj);
  return isWeekendOrHoliday ? POOL_LIMITS.WEEKEND : POOL_LIMITS.WEEKDAY;
};

export const normalizeDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
};

export const formatDateForDisplay = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
};