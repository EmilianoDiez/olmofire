import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../lib/firebase/auth';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import FormField from '../common/FormField';

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const { loading } = useFirebaseAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    try {
      await signIn(email, password);
      navigate('/reservations');
    } catch (error) {
      console.error('Sign in error:', error);
      alert('Error signing in. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingresar</h2>
      
      <div className="space-y-6">
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="Ingresá tu email"
          required
        />

        <FormField
          label="Contraseña"
          name="password"
          type="password"
          placeholder="Ingresá tu contraseña"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>

        <p className="text-center text-sm text-gray-600">
          ¿No estás registrado?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:text-blue-700"
          >
            Registrate aquí
          </button>
        </p>
      </div>
    </form>
  );
};