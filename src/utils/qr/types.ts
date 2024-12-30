export interface QRCodeData {
  type: 'unified';
  timestamp: number;
  key: string;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
  details?: {
    name: string;
    dni: string;
    type: 'affiliate' | 'companion';
    price?: number;
    discount?: number;
  };
}