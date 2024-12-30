import React from 'react';
import { Download, Printer, RefreshCw } from 'lucide-react';

interface QRCodeActionsProps {
  onPrint?: () => void;
  onDownload?: () => void;
  onRegenerate?: () => void;
  showRegenerate?: boolean;
  className?: string;
}

const QRCodeActions: React.FC<QRCodeActionsProps> = ({
  onPrint,
  onDownload,
  onRegenerate,
  showRegenerate,
  className = ''
}) => {
  return (
    <div className={`print:hidden flex flex-wrap gap-4 ${className}`}>
      {showRegenerate && onRegenerate && (
        <button
          onClick={onRegenerate}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Regenerar Código QR
        </button>
      )}

      {onDownload && (
        <button
          onClick={onDownload}
          className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Download className="w-5 h-5 mr-2" />
          Descargar PNG
        </button>
      )}

      {onPrint && (
        <button
          onClick={onPrint}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Printer className="w-5 h-5 mr-2" />
          Imprimir
        </button>
      )}
    </div>
  );
};

export default QRCodeActions;