export const validateDNI = (dni: string): string => {
  if (!dni.trim()) return 'El DNI es obligatorio';
  if (!/^\d{7,8}$/.test(dni)) return 'DNI inválido (7-8 dígitos)';
  return '';
};

export const validatePhone = (phone: string): string => {
  if (!phone.trim()) return 'El teléfono es obligatorio';
  if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
    return 'El teléfono debe tener 10 dígitos';
  }
  return '';
};

export const validateEmail = (email: string): string => {
  if (!email.trim()) return 'El email es obligatorio';
  if (!/^\S+@\S+\.\S+$/.test(email)) return 'Formato de email inválido';
  return '';
};

export const validateAge = (age: string): string => {
  if (!age.trim()) return 'La edad es obligatoria';
  const numAge = Number(age);
  if (isNaN(numAge) || numAge < 0 || numAge > 120) return 'Edad inválida';
  return '';
};