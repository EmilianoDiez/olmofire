import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CalendarState } from '../types/calendar';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import { getPoolLimits } from '../utils/dateUtils';

const generateInitialMonthStats = () => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const stats: Record<string, any> = {};
  days.forEach(date => {
    const limits = getPoolLimits(date);
    const dateKey = format(date, 'yyyy-MM-dd');
    stats[dateKey] = {
      totalCapacity: limits.AFFILIATE.MAX_CAPACITY + limits.COMPANION.MAX_CAPACITY,
      currentReservations: 0,
      affiliateCapacity: limits.AFFILIATE.MAX_CAPACITY,
      companionCapacity: limits.COMPANION.MAX_CAPACITY,
      affiliateReservations: 0,
      companionReservations: 0
    };
  });

  return stats;
};

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      selectedDate: new Date(),
      monthStats: generateInitialMonthStats(),
      updateDayStats: (date, stats) => set((state) => ({
        monthStats: {
          ...state.monthStats,
          [date]: {
            ...state.monthStats[date],
            ...stats,
            currentReservations: 
              (stats.affiliateReservations ?? state.monthStats[date].affiliateReservations) +
              (stats.companionReservations ?? state.monthStats[date].companionReservations)
          }
        }
      }))
    }),
    {
      name: 'calendar-store'
    }
  )
);