// Email notification utilities
export const createReservationMessage = (date: string, companionsList: string): string => {
  return `¡Reserva confirmada!\n\n` +
    `Fecha: ${date}\n\n` +
    `Acompañantes:\n${companionsList}\n\n` +
    `Por favor, presentate con tu DNI y el de tus acompañantes en la entrada.\n\n` +
    `Recordá que podés cancelar tu reserva hasta 24 horas antes.`;
};