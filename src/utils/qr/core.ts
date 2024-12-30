import { QRCodeData } from './types';

const VALIDITY_PERIOD = 24 * 60 * 60 * 1000; // 24 hours

export const generateQRCode = (): string => {
  const timestamp = Date.now();
  const key = Math.random().toString(36).substring(2, 15);
  return `POOL-UNIFIED-${timestamp}-${key}`;
};

export const parseQRCode = (code: string): QRCodeData | null => {
  const parts = code.split('-');
  if (parts.length !== 4 || parts[0] !== 'POOL' || parts[1] !== 'UNIFIED') {
    return null;
  }

  const timestamp = parseInt(parts[2]);
  if (isNaN(timestamp)) {
    return null;
  }

  return {
    type: 'unified',
    timestamp,
    key: parts[3]
  };
};

export const isQRCodeValid = (qrData: QRCodeData): boolean => {
  const now = Date.now();
  return now - qrData.timestamp < VALIDITY_PERIOD;
};