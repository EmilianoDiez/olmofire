import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { usePoolStore } from '../../store/usePoolStore';
import { formatDateTime } from '../../utils/calendar/formatting';

const EntryHistory = () => {
  const { entryHistory } = usePoolStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredHistory = entryHistory.filter(entry => {
    const matchesSearch = 
      entry.name.toLowerCase().includes(search.toLowerCase()) ||
      entry.dni.includes(search);
    const matchesFilter = filter === 'all' || entry.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Historial de Ingresos</h2>
        
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
              <option value="affiliate">Afiliados</option>
              <option value="companion">Acompañantes</option>
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
                Fecha y Hora
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DNI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código QR
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredHistory.map((entry, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDateTime(entry.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.dni}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${entry.type === 'affiliate' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {entry.type === 'affiliate' ? 'Afiliado' : 'Acompañante'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="text-sm text-gray-600">{entry.qrCode}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EntryHistory;