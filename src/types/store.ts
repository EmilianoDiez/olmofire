export interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone: string;
  dni: string;
  status: 'pending' | 'approved' | 'rejected';
  registrationDate: string;
}

export interface Companion {
  id: string;
  name: string;
  dni: string;
  age: number;
  phone?: string;
  status: 'pending' | 'approved' | 'rejected';
  affiliateId?: string;
  registrationDate: string;
}

export interface PendingRegistration {
  id: string;
  type: 'affiliate' | 'companion';
  data: Omit<Affiliate, 'id' | 'status' | 'registrationDate'>;
  status: 'pending' | 'approved' | 'rejected';
  registrationDate: string;
}

export interface EntryRecord {
  timestamp: Date;
  name: string;
  dni: string;
  type: 'affiliate' | 'companion';
  qrCode: string;
}

export interface PoolState {
  currentDate: Date;
  reservations: number;
  entries: number;
  entryHistory: EntryRecord[];
  isAffiliatePending: boolean;
  hasGrantedPermissions: boolean;
  authorizedCompanions: Companion[];
  affiliates: Affiliate[];
  pendingRegistrations: PendingRegistration[];
  setReservations: (count: number) => void;
  setEntries: (count: number) => void;
  setAffiliatePending: (pending: boolean) => void;
  setPermissionsGranted: (granted: boolean) => void;
  addAffiliate: (affiliate: Omit<Affiliate, 'id' | 'status' | 'registrationDate'>, companions?: Array<Omit<Companion, 'id' | 'status' | 'affiliateId' | 'registrationDate'>>) => void;
  updateRegistrationStatus: (id: string, status: 'approved' | 'rejected') => void;
  addEntryRecord: (record: Omit<EntryRecord, 'timestamp'>) => void;
}