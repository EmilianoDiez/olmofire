import { getDatabase } from 'firebase/database';
import { app } from './app';

// Initialize Realtime Database
export const db = getDatabase(app);

// Database reference paths
export const DB_REFS = {
  USERS: 'users',
  COMPANIONS: 'companions',
  RESERVATIONS: 'reservations',
  ENTRIES: 'entries'
} as const;