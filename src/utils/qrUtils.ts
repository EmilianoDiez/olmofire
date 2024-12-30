import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';

export const generateQRCode = (type: 'affiliate' | 'companion', id: string, dni: string): string => {
  return `POOL-${type.toUpperCase()}-${id}-${dni}`;
};

export const parseQRCode = (qrCode: string): { 
  type: 'affiliate' | 'companion'; 
  id: string; 
  dni: string; 
} | null => {
  const parts = qrCode.split('-');
  if (parts.length !== 4 || parts[0] !== 'POOL') return null;
  
  const [_, type, id, dni] = parts;
  if (!type || !id || !dni) return null;
  
  return { 
    type: type.toLowerCase() as 'affiliate' | 'companion', 
    id, 
    dni 
  };
};

export const generatePDF = (
  data: Array<{
    type: 'affiliate' | 'companion';
    name: string;
    dni: string;
    qrCode: string;
  }>
): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  data.forEach((item, index) => {
    if (index > 0) {
      doc.addPage();
    }
    
    // Add header
    doc.setFontSize(20);
    doc.text('Código QR de Ingreso', pageWidth / 2, 20, { align: 'center' });
    
    // Add user info
    doc.setFontSize(14);
    doc.text(`${item.type === 'affiliate' ? 'Afiliado' : 'Acompañante'}: ${item.name}`, pageWidth / 2, 40, { align: 'center' });
    doc.text(`DNI: ${item.dni}`, pageWidth / 2, 50, { align: 'center' });
    
    // Add QR code
    const qrCanvas = document.createElement('canvas');
    QRCodeSVG({
      value: item.qrCode,
      size: 200,
      level: 'H'
    }).toCanvas(qrCanvas);
    
    const qrImage = qrCanvas.toDataURL('image/png');
    doc.addImage(qrImage, 'PNG', (pageWidth - 100) / 2, 70, 100, 100);
    
    // Add footer
    doc.setFontSize(10);
    doc.text('Este código QR es personal e intransferible', pageWidth / 2, pageHeight - 20, { align: 'center' });
    doc.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 15, { align: 'center' });
  });
  
  doc.save('codigos-qr-ingreso.pdf');
};