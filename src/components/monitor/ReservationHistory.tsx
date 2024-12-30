import React, { useState } from 'react';
import { Calendar, Users, Search, Filter } from 'lucide-react';
import { useReservationStore } from '../../store/useReservationStore';
import { formatDate } from '../../utils/formatters';

const ReservationHistory = () => {
  const { reservations } = useReservationStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const getAllReservations = () => {
    return Object.entries(reservations)
      .flatMap(([date, dateReservations]) =>
        dateReservations.map(reservation => ({
          ...reservation,
          date
        }))
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const filteredReservations = getAllReservations().filter(reservation => {
    const matchesSearch = 
      reservation.affiliateName.toLowerCase().includes(search.toLowerCase()) ||
      reservation.affiliateDni.includes(search) ||
      reservation.companions.some(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.dni.includes(search)
      );
    const matchesFilter = filter === 'all' || reservation.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Historial de Reservas</h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre o DNI"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">Todos</option>
              <option value="active">Activas</option>
              <option value="completed">Completadas</option>
              <option value="cancelled">Canceladas</option>
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Afiliado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DNI Afiliado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acompañantes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {formatDate(reservation.date)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {reservation.affiliateName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reservation.affiliateDni}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {reservation.companions.length} acompañantes
                    </span>
                  </div>
                  {reservation.companions.length > 0 && (
                    <div className="mt-1 space-y-1">
                      {reservation.companions.map((companion, index) => (
                        <div key={index} className="text-xs text-gray-500">
                          {companion.name} (DNI: {companion.dni})
                        </div>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${reservation.status === 'completed' ? 'bg-green-100 text-green-800' :
                      reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'}`}>
                    {reservation.status === 'completed' ? 'Completada' :
                     reservation.status === 'cancelled' ? 'Cancelada' : 'Activa'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationHistory;