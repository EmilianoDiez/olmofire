import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { usePoolStore } from '../../store/usePoolStore';
import { validateEntry } from '../../utils/qr/validation';
import { calculatePrice } from '../../utils/pricing';
import { formatTime } from '../../utils/formatters';
import ScanResult from './ScanResult';

const QRScanner: React.FC = () => {
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
  const [result, setResult] = useState<{
    status: 'success' | 'error';
    message: string;
    details?: {
      name: string;
      dni: string;
      type: 'affiliate' | 'companion';
      price: number;
      discount: number;
    };
  } | null>(null);

  const { addEntryRecord, entryHistory } = usePoolStore();

  useEffect(() => {
    // Initialize scanner
    const qrScanner = new Html5QrcodeScanner(
      'qr-reader',
      { 
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1
      },
      false
    );
    setScanner(qrScanner);

    // Cleanup function
    return () => {
      if (qrScanner) {
        qrScanner.clear().catch(console.error);
      }
    };
  }, []);

  useEffect(() => {
    if (!scanner) return;

    const handleScan = async (decodedText: string) => {
      const dni = prompt('Por favor, ingrese su DNI:');
      if (!dni) {
        setResult({
          status: 'error',
          message: 'DNI requerido para validar el ingreso'
        });
        return;
      }

      const validation = await validateEntry(decodedText, dni);
      
      if (!validation.isValid || !validation.details) {
        setResult({
          status: 'error',
          message: validation.message
        });
        return;
      }

      const todayEntries = entryHistory.filter(
        entry => entry.timestamp.toDateString() === new Date().toDateString()
      );

      const pricing = calculatePrice({
        type: validation.details.type,
        currentAffiliates: todayEntries.filter(e => e.type === 'affiliate').length,
        currentCompanions: todayEntries.filter(e => e.type === 'companion').length
      });

      addEntryRecord({
        name: validation.details.name,
        dni: validation.details.dni,
        type: validation.details.type,
        qrCode: decodedText,
        timestamp: new Date()
      });

      setResult({
        status: 'success',
        message: `Ingreso registrado - ${formatTime(new Date())}`,
        details: {
          ...validation.details,
          price: pricing.price,
          discount: pricing.discount
        }
      });
    };

    const handleError = (error: any) => {
      console.error('Error scanning QR code:', error);
    };

    scanner.render(handleScan, handleError);
  }, [scanner, addEntryRecord, entryHistory]);

  return (
    <div className="space-y-6">
      <div id="qr-reader" className="mx-auto max-w-lg"></div>
      {result && (
        <ScanResult
          {...result}
          onClose={() => setResult(null)}
        />
      )}
    </div>
  );
};

export default QRScanner;