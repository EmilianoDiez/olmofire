export const getReservationEmailTemplate = (
  name: string,
  date: string,
  companions: Array<{ name: string; dni: string }>
) => {
  const companionsList = companions.length > 0
    ? companions.map(c => `- ${c.name} (DNI: ${c.dni})`).join('\n')
    : 'Sin acompañantes';

  return {
    subject: 'Confirmación de Reserva - FADIUNC y El Olmo',
    text: `Hola ${name},\n\nTu reserva para el ${date} ha sido confirmada.\n\nAcompañantes:\n${companionsList}\n\nRecordá presentar tu DNI al ingresar.\n\nSaludos,\nEquipo FADIUNC y El Olmo`,
    html: `
      <h2>Hola ${name},</h2>
      <p>Tu reserva para el ${date} ha sido confirmada.</p>
      <h3>Acompañantes:</h3>
      <p>${companionsList.replace(/\n/g, '<br>')}</p>
      <p><strong>Recordá presentar tu DNI al ingresar.</strong></p>
      <br>
      <p>Saludos,<br>Equipo FADIUNC y El Olmo</p>
    `
  };
};