import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DayStats } from '../types/calendar';
import { getPoolLimits } from './dateUtils';

export const calculateAvailability = (date: Date, stats: DayStats) => {
  const limits = getPoolLimits(date);
  const affiliateAvailable = limits.AFFILIATE.MAX_CAPACITY - stats.affiliateReservations;
  const companionAvailable = limits.COMPANION.MAX_CAPACITY - stats.companionReservations;

  return {
    affiliateAvailable,
    companionAvailable,
    totalAvailable: affiliateAvailable + companionAvailable
  };
};

export const formatReservationDate = (date: Date): string => {
  return format(date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
};

export const generateReservationCode = (): string => {
  return `POOL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};