import React from 'react';
import { UserPlus, Users } from 'lucide-react';

interface RegistrationStepsProps {
  currentStep: number;
}

const RegistrationSteps: React.FC<RegistrationStepsProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className={`flex items-center ${currentStep === 1 ? 'text-blue-600' : 'text-gray-500'}`}>
        <UserPlus className="w-5 h-5 mr-2" />
        <span className="font-medium">Datos del Afiliado</span>
      </div>
      <div className="h-px w-8 bg-gray-300" />
      <div className={`flex items-center ${currentStep === 2 ? 'text-blue-600' : 'text-gray-500'}`}>
        <Users className="w-5 h-5 mr-2" />
        <span className="font-medium">Acompañantes (opcional)</span>
      </div>
    </div>
  );
};

export default RegistrationSteps;