export const getConfirmationEmailTemplate = (name: string) => ({
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
});