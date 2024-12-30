import { CONTACT_INFO } from '../../constants';

export const sendNotification = async (
  email: string,
  subject: string,
  message: string
): Promise<void> => {
  // In a real implementation, this would use an email service
  console.log(`Sending notification to ${email}`);
  console.log(`From: ${CONTACT_INFO.EMAIL}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}`);
};

export const sendReservationConfirmation = async (
  email: string,
  name: string,
  date: string,
  companions: Array<{ name: string; dni: string }>
): Promise<void> => {
  const companionsList = companions.length > 0
    ? companions.map(c => `- ${c.name} (DNI: ${c.dni})`).join('\n')
    : 'Sin acompañantes';

  const message = `
    Hola ${name},

    Tu reserva para el ${date} ha sido confirmada.

    Acompañantes:
    ${companionsList}

    Recordá presentar tu DNI al ingresar.

    Saludos,
    Equipo FADIUNC y El Olmo
  `;

  await sendNotification(
    email,
    'Confirmación de Reserva - FADIUNC y El Olmo',
    message
  );
};