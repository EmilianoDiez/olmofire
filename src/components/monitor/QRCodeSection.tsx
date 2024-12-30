import React, { useState, useCallback } from 'react';
import { generateQRCode, generateQRImage } from '../../utils/qr';
import QRCodeDisplay from '../qr/QRCodeDisplay';
import QRCodeActions from '../qr/QRCodeActions';

const QRCodeSection = () => {
  const [qrCode, setQrCode] = useState(generateQRCode());
  const [lastGenerated, setLastGenerated] = useState(new Date());

  const handleRegenerateQR = useCallback(() => {
    setQrCode(generateQRCode());
    setLastGenerated(new Date());
  }, []);

  const handleDownloadPNG = useCallback(async () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg || !(svg instanceof SVGElement)) return;

    try {
      const pngUrl = await generateQRImage(svg);
      const link = document.createElement('a');
      link.download = `codigo-ingreso-pileta.png`;
      link.href = pngUrl;
      link.click();
    } catch (error) {
      console.error('Error downloading QR code:', error);
      alert('Error al descargar el código QR. Por favor, intente nuevamente.');
    }
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Código QR de Ingreso</h2>
        <p className="text-gray-600 mt-1">
          Código QR unificado para validar el ingreso de afiliados y acompañantes
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <QRCodeDisplay
          value={qrCode}
          title="Código QR de Ingreso"
          subtitle="Válido para todos los afiliados y acompañantes"
          lastUpdate={lastGenerated}
        />

        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">Instrucciones de Uso</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Este código QR es válido por 24 horas</li>
              <li>• Cada afiliado/acompañante debe presentar su DNI al escanear</li>
              <li>• El sistema calculará automáticamente el precio según el orden de ingreso</li>
              <li>• Regenere el código al inicio de cada jornada</li>
            </ul>
          </div>

          <QRCodeActions
            onRegenerate={handleRegenerateQR}
            onDownload={handleDownloadPNG}
            onPrint={handlePrint}
            showRegenerate={true}
            className="flex-col"
          />
        </div>
      </div>
    </div>
  );
};

export default QRCodeSection;