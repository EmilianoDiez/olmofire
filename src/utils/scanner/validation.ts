import { Html5QrcodeResult } from 'html5-qrcode';

export const isValidQRCode = (result: Html5QrcodeResult): boolean => {
  try {
    // Validate QR code format
    const decoded = JSON.parse(result.decodedText);
    return decoded && typeof decoded === 'object';
  } catch {
    return false;
  }
};

export const handleScanError = (error: string): void => {
  // Only log relevant errors, ignore common scanning process messages
  if (!error.includes('No MultiFormat Readers') && 
      !error.includes('No QR code found')) {
    console.error('QR Scan error:', error);
  }
};