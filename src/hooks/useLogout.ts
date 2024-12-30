import { useNavigate } from 'react-router-dom';
import { signOut } from '../lib/firebase/auth';
import { useFirebaseAuth } from './useFirebaseAuth';

export const useLogout = () => {
  const navigate = useNavigate();
  const { user } = useFirebaseAuth();

  const logout = async () => {
    try {
      await signOut();
      
      // Clear any stored session data
      sessionStorage.clear();
      localStorage.removeItem('firebase:auth');
      
      // Redirect to home
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  return { logout };
};