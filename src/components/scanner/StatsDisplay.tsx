import React from 'react';
import { Users, UserCheck } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

interface StatsDisplayProps {
  affiliateEntries: number;
  companionEntries: number;
  limits: {
    AFFILIATE: { MAX_CAPACITY: number };
    COMPANION: { MAX_CAPACITY: number };
  };
  today: Date;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  affiliateEntries,
  companionEntries,
  limits,
  today
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center text-blue-600 mb-2">
          <UserCheck className="w-5 h-5 mr-2" />
          <span className="font-medium">Afiliados {formatDate(today)}</span>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-2xl font-bold">
            {affiliateEntries}/{limits.AFFILIATE.MAX_CAPACITY}
          </p>
          <p className="text-sm text-gray-600 mb-1">ingresaron</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(affiliateEntries / limits.AFFILIATE.MAX_CAPACITY) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center text-green-600 mb-2">
          <Users className="w-5 h-5 mr-2" />
          <span className="font-medium">Acompañantes {formatDate(today)}</span>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-2xl font-bold">
            {companionEntries}/{limits.COMPANION.MAX_CAPACITY}
          </p>
          <p className="text-sm text-gray-600 mb-1">ingresaron</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div 
            className="bg-green-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(companionEntries / limits.COMPANION.MAX_CAPACITY) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};