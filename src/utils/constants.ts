export const POOL_LIMITS = {
  WEEKDAY: {
    AFFILIATE: {
      FREE_LIMIT: 42,
      DISCOUNT_LIMIT: 80,
      MAX_CAPACITY: 80
    },
    COMPANION: {
      FREE_LIMIT: 28,
      DISCOUNT_LIMIT: 60,
      MAX_CAPACITY: 60
    }
  },
  WEEKEND: {
    AFFILIATE: {
      FREE_LIMIT: 84,
      DISCOUNT_LIMIT: 140,
      MAX_CAPACITY: 140
    },
    COMPANION: {
      FREE_LIMIT: 56,
      DISCOUNT_LIMIT: 80,
      MAX_CAPACITY: 80
    }
  }
};

export const BASE_PRICES = {
  WEEKDAY: 9000,
  WEEKEND: 12000
};

export const DISCOUNT_PERCENTAGES = {
  FREE: 100,
  HALF: 50,
  NONE: 0
};

// Argentine holidays for 2024
export const HOLIDAYS_2024 = [
  '2024-01-01', // Año Nuevo
  '2024-02-12', // Carnaval
  '2024-02-13', // Carnaval
  '2024-03-24', // Día Nacional de la Memoria
  '2024-03-28', // Jueves Santo
  '2024-03-29', // Viernes Santo
  '2024-04-02', // Día del Veterano
  '2024-05-01', // Día del Trabajo
  '2024-05-25', // Día de la Revolución de Mayo
  '2024-06-17', // Día del Paso a la Inmortalidad del Gral. Güemes
  '2024-06-20', // Día de la Bandera
  '2024-07-09', // Día de la Independencia
  '2024-08-17', // Paso a la Inmortalidad del Gral. San Martín
  '2024-10-12', // Día del Respeto a la Diversidad Cultural
  '2024-11-20', // Día de la Soberanía Nacional
  '2024-12-08', // Inmaculada Concepción de María
  '2024-12-25', // Navidad
];