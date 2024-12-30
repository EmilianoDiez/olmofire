import React from 'react';
import { isWeekend } from 'date-fns';
import PricingCard from './PricingCard';
import { POOL_LIMITS } from '../../utils/constants';

interface PricingInfoProps {
  selectedDate?: Date;
}

const PricingInfo: React.FC<PricingInfoProps> = ({ selectedDate = new Date() }) => {
  const isWeekendDay = isWeekend(selectedDate);
  const limits = isWeekendDay ? POOL_LIMITS.WEEKEND : POOL_LIMITS.WEEKDAY;

  return (
    <div className="space-y-6">
      <PricingCard
        title={isWeekendDay ? "Fines de Semana y Feriados" : "Lunes a Viernes"}
        affiliateLimits={{
          free: limits.AFFILIATE.FREE_LIMIT,
          discount: limits.AFFILIATE.DISCOUNT_LIMIT
        }}
        companionLimits={{
          free: limits.COMPANION.FREE_LIMIT,
          discount: limits.COMPANION.DISCOUNT_LIMIT
        }}
        isWeekend={isWeekendDay}
      />

      <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
        <h4 className="font-medium text-blue-800 mb-2">Recordá</h4>
        <ul className="space-y-1">
          <li>• La revisación médica es obligatoria</li>
          <li>• Los descuentos se aplican por orden de llegada</li>
          <li>• Presentá tu DNI al ingresar</li>
        </ul>
      </div>
    </div>
  );
};

export default PricingInfo;