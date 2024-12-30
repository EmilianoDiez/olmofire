export interface FirebaseUser {
  id: string;
  email: string;
  dni: string;
  name: string;
  phone?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface FirebaseCompanion {
  id: string;
  userId: string;
  name: string;
  dni: string;
  age: number;
  phone?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface FirebaseReservation {
  id: string;
  userId: string;
  date: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  companions: string[]; // Array of companion IDs
}

export interface FirebaseEntry {
  id: string;
  userId: string;
  companionId?: string;
  reservationId?: string;
  entryDate: string;
  entryTime: string;
  createdAt: string;
}