import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase/auth';
import { PageLayout } from './components/layout/PageLayout';
import { useFirebaseAuth } from './hooks/useFirebaseAuth';

function App() {
  const { loading, error } = useFirebaseAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Firebase auth state change handling is managed by useFirebaseAuth hook
      console.log('Auth state changed:', user ? 'logged in' : 'logged out');
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg text-red-700">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <PageLayout />
    </BrowserRouter>
  );
}

export default App;