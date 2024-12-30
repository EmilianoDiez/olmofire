import React from 'react';
import { Users, UserCheck, UserMinus } from 'lucide-react';
import QRScanner from '../components/scanner/QRScanner';
import { usePoolStore } from '../store/usePoolStore';
import { POOL_LIMITS } from '../utils/constants';
import { isWeekend } from 'date-fns';
import { formatDate } from '../utils/formatters';
import { StatsDisplay } from '../components/scanner/StatsDisplay';
import { PricingInfo } from '../components/scanner/PricingInfo';

const Scanner = () => {
  const { entries, entryHistory } = usePoolStore();
  const today = new Date();

  // Calculate current stats
  const affiliateEntries = entryHistory.filter(
    entry => entry.type === 'affiliate' && 
    entry.timestamp.toDateString() === today.toDateString()
  ).length;

  const companionEntries = entryHistory.filter(
    entry => entry.type === 'companion' && 
    entry.timestamp.toDateString() === today.toDateString()
  ).length;

  const isWeekendDay = isWeekend(today);
  const limits = isWeekendDay ? POOL_LIMITS.WEEKEND : POOL_LIMITS.WEEKDAY;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Escáner de QR</h1>
        <h3 className="text-sm text-gray-900 mb-4">
          El código cambia todos los días y nos permite confirmar tu ingreso y el de tus 
          acompañantes en orden de llegada y que todos sepamos cuantos han ingresado ese día.
        </h3>
        
        <StatsDisplay 
          affiliateEntries={affiliateEntries}
          companionEntries={companionEntries}
          limits={limits}
          today={today}
        />

        <PricingInfo 
          limits={limits}
          isWeekend={isWeekendDay}
        />
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Escanear Código QR</h2>
          <p className="text-sm text-gray-600">Posicioná el código QR dentro del marco</p>
        </div>

        <QRScanner />
      </div>
    </div>
  );
};

export default Scanner;
