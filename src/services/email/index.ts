import { EmailConfig, EmailData } from './types';
import { 
  getConfirmationEmailTemplate,
  getApprovalEmailTemplate,
  getReservationEmailTemplate
} from './templates';

const EMAIL_CONFIG: EmailConfig = {
  from: 'fadiuncolmo@gmail.com',
  replyTo: 'fadiuncolmo@gmail.com'
};

export const sendConfirmationEmail = async (to: string, name: string): Promise<void> => {
  const template = getConfirmationEmailTemplate(name);
  const emailData: EmailData = {
    ...template,
    from: EMAIL_CONFIG.from,
    to
  };
  
  // TODO: Implement actual email sending logic
  console.log('Confirmation email:', emailData);
};

export const sendApprovalEmail = async (to: string, name: string): Promise<void> => {
  const template = getApprovalEmailTemplate(name);
  const emailData: EmailData = {
    ...template,
    from: EMAIL_CONFIG.from,
    to
  };
  
  // TODO: Implement actual email sending logic
  console.log('Approval email:', emailData);
};

export const sendReservationConfirmationEmail = async (
  to: string,
  name: string,
  date: string,
  companions: Array<{ name: string; dni: string }>
): Promise<void> => {
  const template = getReservationEmailTemplate(name, date, companions);
  const emailData: EmailData = {
    ...template,
    from: EMAIL_CONFIG.from,
    to
  };
  
  // TODO: Implement actual email sending logic
  console.log('Reservation confirmation email:', emailData);
};

export * from './types';