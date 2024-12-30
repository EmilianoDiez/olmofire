import React from 'react';
import { isToday } from 'date-fns';
import { getCapacityClass } from '../../utils/calendar/capacity';
import { formatDate } from '../../utils/calendar/formatting';
import { DayStats } from '../../types/calendar';

interface CalendarDayProps {
  date: Date;
  stats: DayStats;
  hasReservation?: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ date, stats, hasReservation }) => {
  const { totalCapacity, currentReservations } = stats;
  const capacityClass = getCapacityClass(currentReservations);
  const isCurrentDay = isToday(date);
  
  const baseClass = "h-14 rounded-lg flex flex-col items-center justify-center relative";
  const dayClass = isCurrentDay 
    ? `${baseClass} border-2 border-blue-600` 
    : `${baseClass} hover:bg-blue-50`;

  return (
    <div className={dayClass}>
      {hasReservation && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-blue-600 rounded-full m-1" />
      )}
      <div className="text-center">
        <span className={`text-sm ${capacityClass} px-2 py-0.5 rounded-full`}>
          {formatDate(date)}
        </span>
        <div className="text-xs text-gray-500 mt-1">
          {currentReservations}/{totalCapacity}
        </div>
      </div>
    </div>
  );
};

export default CalendarDay;