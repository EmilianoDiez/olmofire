import { addDays, isBefore } from 'date-fns';
import { MEDICAL_EXAM } from '../../constants';

export const isMedicalExamValid = (examDate: Date): boolean => {
  const expirationDate = MEDICAL_EXAM.getExpirationDate(examDate);
  return isBefore(new Date(), expirationDate);
};

export const getMedicalExamExpirationDate = (examDate: Date): Date => {
  return MEDICAL_EXAM.getExpirationDate(examDate);
};

export const formatMedicalExamExpiration = (examDate: Date): string => {
  return MEDICAL_EXAM.formatExpirationDate(examDate);
};