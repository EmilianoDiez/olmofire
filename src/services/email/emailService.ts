import { EmailConfig } from './types';

const EMAIL_CONFIG: EmailConfig = {
  from: 'fadiuncolmo@gmail.com',
  replyTo: 'fadiuncolmo@gmail.com'
};

export const sendConfirmationEmail = async (to: string, name: string): Promise<void> => {
  // In a real implementation, this would use a service like SendGrid, AWS SES, etc.
  console.log(`Sending confirmation email to ${to}`);
  
  const emailData = {
    from: EMAIL_CONFIG.from,
    to,
    subject: 'Confirmación de Registro - FADIUNC y El Olmo',
    text: `Hola ${name},\n\nGracias por registrarte en el sistema de reservas de FADIUNC y El Olmo. Tu registro está siendo revisado por nuestro equipo.\n\nTe notificaremos cuando tu cuenta haya sido aprobada.\n\nSaludos,\nEquipo FADIUNC y El Olmo`,
    html: `
      <h2>Hola ${name},</h2>
      <p>Gracias por registrarte en el sistema de reservas de FADIUNC y El Olmo.</p>
      <p>Tu registro está siendo revisado por nuestro equipo.</p>
      <p>Te notificaremos cuando tu cuenta haya sido aprobada.</p>
      <br>
      <p>Saludos,<br>Equipo FADIUNC y El Olmo</p>
    `
  };

  // TODO: Implement actual email sending logic
  console.log('Email data:', emailData);
};

export const sendApprovalEmail = async (to: string, name: string): Promise<void> => {
  const emailData = {
    from: EMAIL_CONFIG.from,
    to,
    subject: 'Registro Aprobado - FADIUNC y El Olmo',
    text: `Hola ${name},\n\nTu registro ha sido aprobado. Ya podés acceder al sistema de reservas usando tu DNI.\n\nSaludos,\nEquipo FADIUNC y El Olmo`,
    html: `
      <h2>Hola ${name},</h2>
      <p>Tu registro ha sido aprobado.</p>
      <p>Ya podés acceder al sistema de reservas usando tu DNI.</p>
      <br>
      <p>Saludos,<br>Equipo FADIUNC y El Olmo</p>
    `
  };

  // TODO: Implement actual email sending logic
  console.log('Email data:', emailData);
};

export const sendReservationConfirmationEmail = async (
  to: string, 
  name: string,
  reservationDate: string,
  companions: Array<{ name: string; dni: string }>
): Promise<void> => {
  const companionsList = companions.length > 0
    ? companions.map(c => `- ${c.name} (DNI: ${c.dni})`).join('\n')
    : 'Sin acompañantes';

  const emailData = {
    from: EMAIL_CONFIG.from,
    to,
    subject: 'Confirmación de Reserva - FADIUNC y El Olmo',
    text: `Hola ${name},\n\nTu reserva para el ${reservationDate} ha sido confirmada.\n\nAcompañantes:\n${companionsList}\n\nRecordá presentar tu DNI al ingresar.\n\nSaludos,\nEquipo FADIUNC y El Olmo`,
    html: `
      <h2>Hola ${name},</h2>
      <p>Tu reserva para el ${reservationDate} ha sido confirmada.</p>
      <h3>Acompañantes:</h3>
      <p>${companionsList.replace(/\n/g, '<br>')}</p>
      <p><strong>Recordá presentar tu DNI al ingresar.</strong></p>
      <br>
      <p>Saludos,<br>Equipo FADIUNC y El Olmo</p>
    `
  };

  // TODO: Implement actual email sending logic
  console.log('Email data:', emailData);
};