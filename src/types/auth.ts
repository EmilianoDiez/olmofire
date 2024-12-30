export interface User {
  id: string;
  name: string;
  dni: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  companions: Array<{
    id: string;
    name: string;
    dni: string;
    age: string;
    phone?: string;
    status: 'pending' | 'approved' | 'rejected';
  }>;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (dni: string) => Promise<boolean>;
  signOut: () => void;
}