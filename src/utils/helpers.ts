export const generateId = (): string => {
  return crypto.randomUUID();
};

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};