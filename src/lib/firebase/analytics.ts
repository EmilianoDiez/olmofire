import { getAnalytics, Analytics } from 'firebase/analytics';
import { app } from './init';

let analytics: Analytics | null = null;

export const initializeAnalytics = () => {
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
  return analytics;
};