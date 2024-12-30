import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { formatDateTime } from '../../utils/formatters';

interface QRCodeDisplayProps {
  value: string;
  title: string;
  subtitle?: string;
  lastUpdate?: Date;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ 
  value, 
  title, 
  subtitle,
  lastUpdate 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 print:shadow-none">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      
      <div className="flex justify-center mb-4">
        <QRCodeSVG
          id="qr-code-svg"
          value={value}
          size={250}
          level="H"
          includeMargin={true}
        />
      </div>

      <div className="text-center text-sm text-gray-500">
        {lastUpdate && (
          <p>Última actualización: {formatDateTime(lastUpdate)}</p>
        )}
        <p className="mt-1">Este código es válido por 24 horas</p>
        <p>Debe presentar DNI al momento del ingreso</p>
      </div>
    </div>
  );
};

export default QRCodeDisplay;