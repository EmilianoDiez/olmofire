import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config/firebase';

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);