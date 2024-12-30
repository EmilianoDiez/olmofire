import React from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface ScanResultProps {
  status: 'success' | 'error';
  message: string;
  code: string;
  price?: number;
  onClose: () => void;
}

const ScanResult: React.FC<ScanResultProps> = ({ status, message, code, price, onClose }) => {
  return (
    <div className={`p-4 ${status === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {status === 'success' ? (
            <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5" />
          ) : (
            <XCircle className="w-6 h-6 text-red-600 mt-0.5" />
          )}
          <div>
            <p className={`font-medium ${
              status === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {message}
            </p>
            <p className="text-sm text-gray-600 mt-1">Código: {code}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ScanResult;