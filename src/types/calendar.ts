export interface DayStats {
  totalCapacity: number;
  currentReservations: number;
  affiliateCapacity: number;
  companionCapacity: number;
  affiliateReservations: number;
  companionReservations: number;
}

export interface CalendarState {
  selectedDate: Date;
  monthStats: Record<string, DayStats>;
  updateDayStats: (date: string, stats: Partial<DayStats>) => void;
}