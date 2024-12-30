import { ValidationResult } from './types';
import { usePoolStore } from '../../store/usePoolStore';
import { calculatePrice } from '../pricing';
import { parseQRCode, isQRCodeValid } from './core';

export const validateEntry = async (
  code: string,
  dni: string
): Promise<ValidationResult> => {
  const qrData = parseQRCode(code);
  
  if (!qrData || !isQRCodeValid(qrData)) {
    return {
      isValid: false,
      message: 'El código QR es inválido o ha expirado'
    };
  }

  const { affiliates, authorizedCompanions, entryHistory } = usePoolStore.getState();
  const person = affiliates.find(a => a.dni === dni) || 
                authorizedCompanions.find(c => c.dni === dni);

  if (!person) {
    return {
      isValid: false,
      message: 'Persona no encontrada'
    };
  }

  if (person.status !== 'approved') {
    return {
      isValid: false,
      message: 'Persona no autorizada'
    };
  }

  const type = affiliates.find(a => a.dni === dni) ? 'affiliate' : 'companion';
  const todayEntries = getTodayEntries(entryHistory);
  const pricing = calculateEntryPrice(type, todayEntries);

  return {
    isValid: true,
    message: 'Ingreso autorizado',
    details: {
      name: person.name,
      dni: person.dni,
      type,
      ...pricing
    }
  };
};

const getTodayEntries = (entryHistory: any[]) => {
  const today = new Date();
  return entryHistory.filter(entry => 
    entry.timestamp.toDateString() === today.toDateString()
  );
};

const calculateEntryPrice = (type: 'affiliate' | 'companion', todayEntries: any[]) => {
  const stats = {
    type,
    currentAffiliates: todayEntries.filter(e => e.type === 'affiliate').length,
    currentCompanions: todayEntries.filter(e => e.type === 'companion').length
  };

  return calculatePrice(stats);
};