import React from 'react';
import { Calendar } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';
import { BASE_PRICES, MEDICAL_EXAM } from '../../constants';

interface PricingCardProps {
  title: string;
  affiliateLimits: {
    free: number;
    discount: number;
  };
  companionLimits: {
    free: number;
    discount: number;
  };
  isWeekend?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  affiliateLimits,
  companionLimits,
  isWeekend
}) => {
  const basePrice = isWeekend ? BASE_PRICES.WEEKEND : BASE_PRICES.WEEKDAY;
  const discountPrice = basePrice * 0.5;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center text-blue-600 mb-4">
        <Calendar className="w-5 h-5 mr-2" />
        <h3 className="font-medium">{title}</h3>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Afiliados</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• Primeros {affiliateLimits.free} ingresos: Gratis</li>
            <li>• Hasta {affiliateLimits.discount} ingresos: 50% descuento ({formatCurrency(discountPrice)})</li>
            <li>• Después: {formatCurrency(basePrice)}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Acompañantes</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• Primeros {companionLimits.free} ingresos: Gratis</li>
            <li>• Hasta {companionLimits.discount} ingresos: 50% descuento ({formatCurrency(discountPrice)})</li>
            <li>• Después: {formatCurrency(basePrice)}</li>
          </ul>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium text-gray-900 mb-2">Servicios Adicionales</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div>
              <span className="font-medium">Revisación Médica:</span>{' '}
              {formatCurrency(BASE_PRICES.MEDICAL_EXAM)}
              <p className="text-xs text-gray-500">Validez: {MEDICAL_EXAM.VALIDITY_DAYS} días</p>
            </div>
            <div>
              <span className="font-medium">Estacionamiento:</span>
              <ul className="ml-4 mt-1">
                <li>• Autos: {formatCurrency(isWeekend ? 5000 : 3000)}</li>
                <li>• Camionetas: {formatCurrency(isWeekend ? 6000 : 4000)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;