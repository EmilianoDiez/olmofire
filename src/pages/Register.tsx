import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../components/registration/RegistrationForm';
import { useRegistration } from '../hooks/useRegistration';
import { AlertCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useRegistration();

  const handleSubmit = async (userData: any, companions?: any[]) => {
    try {
      clearError();
      await register(userData, companions);
      navigate('/signin');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Registro de Afiliado</h1>
        <p className="text-sm text-gray-600">
          El registro es por única vez y requiere validación por FADIUNC para que puedas generar la reserva.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <RegistrationForm 
        onSubmit={handleSubmit}
        initialData={{
          name: '',
          email: '',
          phone: '',
          dni: ''
        }}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Register;