import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Users, DollarSign } from 'lucide-react';

interface ReservationConfirmationProps {
  reservation: {
    date: string;
    time: string;
    numberOfPeople: number;
    price: number;
  };
}

const ReservationConfirmation: React.FC<ReservationConfirmationProps> = ({ reservation }) => {
  const reservationCode = `POOL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const handleDownload = () => {
    const svg = document.getElementById('qr-code');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `pool-reservation-${reservationCode}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reservation Confirmed!</h2>
        <p className="text-gray-600">Your reservation has been successfully created</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-700 mb-2">
              <Users className="w-5 h-5 mr-2" />
              <span className="font-medium">Reservation Details</span>
            </div>
            <div className="space-y-2">
              <p><span className="font-medium">Date:</span> {reservation.date}</p>
              <p><span className="font-medium">Time:</span> {reservation.time}</p>
              <p><span className="font-medium">People:</span> {reservation.numberOfPeople}</p>
              <p><span className="font-medium">Code:</span> {reservationCode}</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-700 mb-2">
              <DollarSign className="w-5 h-5 mr-2" />
              <span className="font-medium">Price Details</span>
            </div>
            <div className="space-y-2">
              <p><span className="font-medium">Price per person:</span> ${reservation.price}</p>
              <p><span className="font-medium">Total:</span> ${reservation.price * reservation.numberOfPeople}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
          <QRCodeSVG
            id="qr-code"
            value={reservationCode}
            size={200}
            level="H"
            includeMargin={true}
          />
          <button
            onClick={handleDownload}
            className="mt-4 inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
          >
            <Download size={16} className="mr-2" />
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmation;