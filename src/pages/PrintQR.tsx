import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { usePoolStore } from '../store/usePoolStore';
import { generateQRCode, generatePDF, QRPrintData } from '../utils/qr';
import QRCodeDisplay from '../components/qr/QRCodeDisplay';
import QRCodeActions from '../components/qr/QRCodeActions';

const PrintQR = () => {
  const { id } = useParams();
  const { affiliates, authorizedCompanions } = usePoolStore();

  const affiliate = affiliates.find(a => a.id === id);
  const companions = authorizedCompanions.filter(
    c => c.affiliateId === id && c.status === 'approved'
  );

  if (!affiliate) {
    return <Navigate to="/" replace />;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const qrData: QRPrintData[] = [
      {
        type: 'affiliate',
        name: affiliate.name,
        dni: affiliate.dni,
        qrCode: generateQRCode({ type: 'affiliate', id: affiliate.id, dni: affiliate.dni })
      },
      ...companions.map(companion => ({
        type: 'companion',
        name: companion.name,
        dni: companion.dni,
        qrCode: generateQRCode({ type: 'companion', id: companion.id, dni: companion.dni })
      }))
    ];
    
    generatePDF(qrData);
  };

  return (
    <div className="container mx-auto p-8">
      <QRCodeActions onPrint={handlePrint} onDownload={handleDownloadPDF} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <QRCodeDisplay
          type="affiliate"
          name={affiliate.name}
          dni={affiliate.dni}
          qrCode={generateQRCode({ type: 'affiliate', id: affiliate.id, dni: affiliate.dni })}
        />

        {companions.map(companion => (
          <QRCodeDisplay
            key={companion.id}
            type="companion"
            name={companion.name}
            dni={companion.dni}
            qrCode={generateQRCode({ type: 'companion', id: companion.id, dni: companion.dni })}
          />
        ))}
      </div>
    </div>
  );
};

export default PrintQR;