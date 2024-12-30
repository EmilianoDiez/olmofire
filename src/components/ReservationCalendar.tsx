import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { es } from 'date-fns/locale';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarDay from './calendar/CalendarDay';
import CalendarLegend from './calendar/CalendarLegend';
import { useCalendarStore } from '../store/useCalendarStore';
import { useReservationStore } from '../store/useReservationStore';
import { useAuth } from '../hooks/useAuth';
import { normalizeDate } from '../utils/dateHandling';

const ReservationCalendar = () => {
  const { user } = useAuth();
  const { monthStats } = useCalendarStore();
  const { reservations } = useReservationStore();
  
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const hasReservationForDate = (date: Date): boolean => {
    if (!user) return false;
    const normalizedDate = normalizeDate(date);
    const dateReservations = reservations[normalizedDate] || [];
    return dateReservations.some(r => 
      r.affiliateId === user.id && 
      r.status === 'active'
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {format(today, 'MMMM yyyy', { locale: es })}
        </h2>
      </div>

      <CalendarHeader />

      <div className="grid grid-cols-7 gap-2">
        {days.map((date, i) => {
          const dateKey = normalizeDate(date);
          const stats = monthStats[dateKey] || {
            totalCapacity: 0,
            currentReservations: 0
          };
          
          return (
            <CalendarDay
              key={i}
              date={date}
              stats={stats}
              hasReservation={hasReservationForDate(date)}
            />
          );
        })}
      </div>

      <CalendarLegend />
    </div>
  );
};

export default ReservationCalendar;