import React from 'react';
import { CheckCircle2, XCircle, X, Users } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface ScanResultProps {
  status: 'success' | 'error';
  message: string;
  details?: {
    name: string;
    dni: string;
    type: 'affiliate' | 'companion';
    price: number;
    discount: number;
    companions?: Array<{ name: string; dni: string }>;
  };
  onClose: () => void;
}

const ScanResult: React.FC<ScanResultProps> = ({ status, message, details, onClose }) => {
  return (
    <div className={`rounded-lg p-6 ${
      status === 'success' ? 'bg-green-50' : 'bg-red-50'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {status === 'success' ? (
            <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5" />
          ) : (
            <XCircle className="w-6 h-6 text-red-600 mt-0.5" />
          )}
          <div className="flex-1">
            <p className={`font-medium ${
              status === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {message}
            </p>
            
            {details && (
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">Nombre:</span> {details.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">DNI:</span> {details.dni}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Tipo:</span> {
                      details.type === 'affiliate' ? 'Afiliado' : 'Acompañante'
                    }
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <p className="text-lg font-medium text-gray-900">
                    Precio de entrada: {formatCurrency(details.price)}
                  </p>
                  {details.discount > 0 && (
                    <p className="text-sm text-green-600">
                      Descuento aplicado: {details.discount}%
                    </p>
                  )}
                </div>

                {details.companions && details.companions.length > 0 && (
                  <div className="border-t pt-3">
                    <div className="flex items-center text-gray-700 mb-2">
                      <Users className="w-5 h-5 mr-2" />
                      <span className="font-medium">Acompañantes:</span>
                    </div>
                    <ul className="space-y-1">
                      {details.companions.map((companion, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          {companion.name} (DNI: {companion.dni})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ScanResult;