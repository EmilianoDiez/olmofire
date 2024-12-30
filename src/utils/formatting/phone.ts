export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length !== 10) {
    return phone;
  }

  const areaCode = cleaned.slice(0, 3);
  const firstPart = cleaned.slice(3, 7);
  const secondPart = cleaned.slice(7);

  return `(${areaCode}) ${firstPart}-${secondPart}`;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10;
};