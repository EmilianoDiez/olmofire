import React from 'react';
import { Search, Filter } from 'lucide-react';

interface RegistrationFiltersProps {
  filter: string;
  search: string;
  onFilterChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

export const RegistrationFilters: React.FC<RegistrationFiltersProps> = ({
  filter,
  search,
  onFilterChange,
  onSearchChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar por nombre o DNI"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      <div className="relative">
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
        >
          <option value="all">Todos</option>
          <option value="pending">Pendientes</option>
          <option value="approved">Aprobados</option>
          <option value="rejected">Rechazados</option>
        </select>
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
    </div>
  );
};