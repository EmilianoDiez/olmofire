import React from 'react';

const CalendarHeader: React.FC = () => {
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="grid grid-cols-7 gap-2 mb-2">
      {weekDays.map(day => (
        <div key={day} className="text-center text-sm font-medium text-gray-600">
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarHeader;