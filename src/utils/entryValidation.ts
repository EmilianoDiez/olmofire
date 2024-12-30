import { useReservationStore } from '../store/useReservationStore';
import { usePoolStore } from '../store/usePoolStore';
import { normalizeDate } from './dateHandling';
import { parseQRCode } from './qrUtils';

interface ValidationResult {
  isValid: boolean;
  error?: string;
  type?: 'affiliate' | 'companion';
  name?: string;
  dni?: string;
  reservationId?: string;
  companions?: Array<{ name: string; dni: string }>;
}

export const validateEntry = async (qrCode: string): Promise<ValidationResult> => {
  const parsedQR = parseQRCode(qrCode);
  if (!parsedQR) {
    return { isValid: false, error: 'Formato de código QR inválido' };
  }

  const { type, id, dni } = parsedQR;
  const { affiliates, authorizedCompanions } = usePoolStore.getState();
  const { reservations } = useReservationStore.getState();
  const today = normalizeDate(new Date());

  if (type === 'AFFILIATE') {
    return validateAffiliateEntry(dni, affiliates, reservations[today] || []);
  }

  if (type === 'COMPANION') {
    return validateCompanionEntry(dni, authorizedCompanions, reservations[today] || []);
  }

  return { isValid: false, error: 'Tipo de código QR inválido' };
};

const validateAffiliateEntry = (dni: string, affiliates: any[], todayReservations: any[]): ValidationResult => {
  const affiliate = affiliates.find(a => a.dni === dni);
  
  if (!affiliate) {
    return { isValid: false, error: 'Afiliado no encontrado' };
  }

  if (affiliate.status !== 'approved') {
    return { isValid: false, error: 'Afiliado no autorizado' };
  }

  const reservation = todayReservations.find(
    r => r.affiliateId === affiliate.id && r.status === 'active'
  );

  return {
    isValid: true,
    type: 'affiliate',
    name: affiliate.name,
    dni: affiliate.dni,
    reservationId: reservation?.id,
    companions: reservation?.companions
  };
};

const validateCompanionEntry = (dni: string, companions: any[], todayReservations: any[]): ValidationResult => {
  const companion = companions.find(c => c.dni === dni);
  
  if (!companion) {
    return { isValid: false, error: 'Acompañante no encontrado' };
  }

  if (companion.status !== 'approved') {
    return { isValid: false, error: 'Acompañante no autorizado' };
  }

  const reservation = todayReservations.find(r => 
    r.status === 'active' && 
    r.companions.some(c => c.dni === dni)
  );

  if (!reservation) {
    return { isValid: false, error: 'No hay reserva activa para este acompañante' };
  }

  return {
    isValid: true,
    type: 'companion',
    name: companion.name,
    dni: companion.dni,
    reservationId: reservation.id
  };
};