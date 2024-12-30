import React from 'react';
import PricingCard from './PricingCard';
import { POOL_LIMITS } from '../../utils/constants';

const PricingDisplay: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Tarifas</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <PricingCard
          title="Lunes a Viernes"
          affiliateLimits={{
            free: POOL_LIMITS.WEEKDAY.AFFILIATE.FREE_LIMIT,
            discount: POOL_LIMITS.WEEKDAY.AFFILIATE.DISCOUNT_LIMIT
          }}
          companionLimits={{
            free: POOL_LIMITS.WEEKDAY.COMPANION.FREE_LIMIT,
            discount: POOL_LIMITS.WEEKDAY.COMPANION.DISCOUNT_LIMIT
          }}
        />

        <PricingCard
          title="Fines de Semana y Feriados"
          affiliateLimits={{
            free: POOL_LIMITS.WEEKEND.AFFILIATE.FREE_LIMIT,
            discount: POOL_LIMITS.WEEKEND.AFFILIATE.DISCOUNT_LIMIT
          }}
          companionLimits={{
            free: POOL_LIMITS.WEEKEND.COMPANION.FREE_LIMIT,
            discount: POOL_LIMITS.WEEKEND.COMPANION.DISCOUNT_LIMIT
          }}
          isWeekend={true}
        />
      </div>

      <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
        <h4 className="font-medium text-blue-800 mb-2">Información Importante</h4>
        <ul className="space-y-1">
          <li>• Los precios pueden estar sujetos a cambios</li>
          <li>• La revisación médica es obligatoria y tiene una validez de 14 días</li>
          <li> <b>• Los descuentos se aplican por orden de llegada </b></li>
          <li>• Los feriados se consideran como fin de semana para las tarifas</li>
        </ul>
      </div>
    </div>
  );
};

export default PricingDisplay;