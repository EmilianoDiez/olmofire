import React from 'react';
import { Users, UserCheck } from 'lucide-react';
import { usePoolStore } from '../store/usePoolStore';
import { getCapacityClass } from '../utils/dateUtils';

const DailyStats = () => {
  const { reservations, entries } = usePoolStore();
  const capacityClass = getCapacityClass(reservations).replace('bg-', 'text-').replace('-100', '-600').replace('-800', '-600');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className={`flex items-center ${capacityClass} mb-2`}>
          <Users className="w-5 h-5 mr-2" />
          <span className="font-medium">Reservas de hoy</span>
        </div>
        <p className="text-2xl font-bold">{reservations}</p>
        <p className="text-sm text-gray-600">personas han reservado</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center text-blue-600 mb-2">
          <UserCheck className="w-5 h-5 mr-2" />
          <span className="font-medium">Ingresos de hoy</span>
        </div>
        <p className="text-2xl font-bold">{entries}</p>
        <p className="text-sm text-gray-600">personas han ingresado</p>
      </div>
    </div>
  );
};

export default DailyStats;