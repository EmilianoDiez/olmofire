import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd/MM/yyyy', { locale: es });
};

export const formatTime = (date: Date): string => {
  return format(date, 'HH:mm', { locale: es });
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd/MM/yyyy HH:mm', { locale: es });
};

export const formatDateLong = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
};