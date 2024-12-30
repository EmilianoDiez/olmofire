export const getApprovalEmailTemplate = (name: string) => ({
  subject: 'Registro Aprobado - FADIUNC y El Olmo',
  text: `Hola ${name},\n\nTu registro ha sido aprobado. Ya podés acceder al sistema de reservas usando tu DNI.\n\nSaludos,\nEquipo FADIUNC y El Olmo`,
  html: `
    <h2>Hola ${name},</h2>
    <p>Tu registro ha sido aprobado.</p>
    <p>Ya podés acceder al sistema de reservas usando tu DNI.</p>
    <br>
    <p>Saludos,<br>Equipo FADIUNC y El Olmo</p>
  `
});