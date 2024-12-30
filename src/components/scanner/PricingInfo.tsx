import React from 'react';

interface PricingInfoProps {
  limits: {
    AFFILIATE: { FREE_LIMIT: number; DISCOUNT_LIMIT: number };
    COMPANION: { FREE_LIMIT: number; DISCOUNT_LIMIT: number };
  };
  isWeekend: boolean;
}

export const PricingInfo: React.FC<PricingInfoProps> = ({ limits, isWeekend }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h2 className="font-semibold text-blue-800 mb-2">
        Precios del día ({isWeekend ? 'Fin de semana/Feriado' : 'Lunes a Viernes'}):
      </h2>
      <ul className="space-y-2 text-sm text-blue-700">
        <li>• Primeros {limits.AFFILIATE.FREE_LIMIT} afiliados: Gratis</li>
        <li>
          • Afiliados {limits.AFFILIATE.FREE_LIMIT + 1}-{limits.AFFILIATE.DISCOUNT_LIMIT}: 50% descuento
        </li>
        <li>• Primeros {limits.COMPANION.FREE_LIMIT} acompañantes: Gratis</li>
        <li>
          • Acompañantes {limits.COMPANION.FREE_LIMIT + 1}-{limits.COMPANION.DISCOUNT_LIMIT}: 50% descuento
        </li>
      </ul>
    </div>
  );
};