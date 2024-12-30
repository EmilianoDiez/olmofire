import React from 'react';
import { Calendar, DollarSign } from 'lucide-react';
import { POOL_LIMITS, BASE_PRICE } from '../utils/constants';
import { isWeekend } from 'date-fns';

const PricingInfo = () => {
  const isWeekendDay = isWeekend(new Date());
  const limits = isWeekendDay ? POOL_LIMITS.WEEKEND : POOL_LIMITS.WEEKDAY;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Tarifas</h3>
      
      <div className="space-y-6">
        <div className="border-b pb-4">
          <div className="flex items-center text-blue-600 mb-2">
            <Calendar className="w-5 h-5 mr-2" />
            <h4 className="font-medium">
              {isWeekendDay ? 'Fines de Semana y Feriados' : 'Lunes a Viernes'}
            </h4>
          </div>
          <div className="space-y-2 ml-7">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Afiliados:</span>
              <br />
              • Primeros {limits.AFFILIATE.FREE_LIMIT}: Gratis
              <br />
              • Hasta {limits.AFFILIATE.DISCOUNT_LIMIT}: 50% descuento
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Acompañantes:</span>
              <br />
              • Primeros {limits.COMPANION.FREE_LIMIT}: Gratis
              <br />
              • Hasta {limits.COMPANION.DISCOUNT_LIMIT}: 50% descuento
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center text-purple-600 mb-2">
            <DollarSign className="w-5 h-5 mr-2" />
            <h4 className="font-medium">Precio Base</h4>
          </div>
          <p className="text-sm text-gray-600 ml-7">
            ${BASE_PRICE.toLocaleString()} por persona
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingInfo;