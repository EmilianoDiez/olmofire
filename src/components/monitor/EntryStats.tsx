import React from 'react';
import { Users, Calendar, CheckCircle } from 'lucide-react';
import { usePoolStore } from '../../store/usePoolStore';

const EntryStats = () => {
  const { entries, reservations } = usePoolStore();

  const stats = [
    {
      title: 'Ingresos del Día',
      value: entries,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Reservas Totales',
      value: reservations,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Capacidad Disponible',
      value: 200 - entries,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-md p-6">
            <div className={`flex items-center ${stat.color} mb-4`}>
              <Icon className="w-6 h-6 mr-2" />
              <h3 className="font-medium">{stat.title}</h3>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="ml-2 text-gray-600">personas</p>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${stat.bgColor} h-2 rounded-full`}
                  style={{
                    width: `${Math.min((stat.value / 200) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EntryStats;