import React from 'react';

const CalendarLegend: React.FC = () => {
  const items = [
    { color: 'bg-green-100', text: 'Menos de 70 reservas' },
    { color: 'bg-orange-100', text: 'Entre 71 y 140 reservas' },
    { color: 'bg-red-100', text: 'Más de 200 reservas' }
  ];

  return (
    <div className="mt-6 space-y-2">
      {items.map(({ color, text }) => (
        <div key={text} className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <span className="text-sm text-gray-600">{text}</span>
        </div>
      ))}
    </div>
  );
};

export default CalendarLegend;