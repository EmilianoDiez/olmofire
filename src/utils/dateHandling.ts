import { format, parseISO, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    throw new Error('Invalid date provided');
  }
  return format(dateObj, 'dd/MM/yyyy', { locale: es });
};

export const formatDateLong = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    throw new Error('Invalid date provided');
  }
  return format(dateObj, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
};

export const formatDateForDisplay = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    throw new Error('Invalid date provided');
  }
  return format(dateObj, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
};

export const normalizeDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    throw new Error('Invalid date provided');
  }
  return format(dateObj, 'yyyy-MM-dd');
};