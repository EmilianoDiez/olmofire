import { isWeekend } from 'date-fns';
import { POOL_LIMITS, BASE_PRICES } from './constants';

export interface EntryStats {
  type: 'affiliate' | 'companion';
  currentAffiliates: number;
  currentCompanions: number;
}

export const calculatePrice = (stats: EntryStats): { price: number; discount: number } => {
  const isWeekendDay = isWeekend(new Date());
  const limits = isWeekendDay ? POOL_LIMITS.WEEKEND : POOL_LIMITS.WEEKDAY;
  const basePrice = isWeekendDay ? BASE_PRICES.WEEKEND : BASE_PRICES.WEEKDAY;
  
  if (stats.type === 'affiliate') {
    const { FREE_LIMIT, DISCOUNT_LIMIT } = limits.AFFILIATE;
    
    if (stats.currentAffiliates < FREE_LIMIT) {
      return { price: 0, discount: 100 };
    } 
    
    if (stats.currentAffiliates < DISCOUNT_LIMIT) {
      return { price: basePrice * 0.5, discount: 50 };
    }
  } else {
    const { FREE_LIMIT, DISCOUNT_LIMIT } = limits.COMPANION;
    
    if (stats.currentCompanions < FREE_LIMIT) {
      return { price: 0, discount: 100 };
    }
    
    if (stats.currentCompanions < DISCOUNT_LIMIT) {
      return { price: basePrice * 0.5, discount: 50 };
    }
  }
  
  return { price: basePrice, discount: 0 };
};