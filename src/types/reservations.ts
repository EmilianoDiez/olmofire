export interface Reservation {
  id: string;
  date: string;
  affiliateId: string;
  affiliateName: string;
  affiliateDni: string;
  companions: Array<{
    id: string;
    name: string;
    dni: string;
  }>;
  status: 'active' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface ReservationState {
  reservations: Record<string, Reservation[]>;
  hasActiveReservation: (affiliateId: string, date: string) => boolean;
  getReservationsForDate: (date: string) => Reservation[];
  addReservation: (reservation: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => void;
  cancelReservation: (id: string) => void;
  completeReservation: (id: string) => void;
  updateReservationCompanions: (
    date: string,
    reservationId: string,
    companions: Array<{ id: string; name: string; dni: string }>
  ) => void;
}