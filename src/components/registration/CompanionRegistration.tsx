import React from 'react';
import { CompanionData } from '../../types/registration';
import CompanionFormList from './CompanionFormList';

interface CompanionRegistrationProps {
  onSubmit: (companions: CompanionData[]) => void;
  onSkip: () => void;
}

const CompanionRegistration: React.FC<CompanionRegistrationProps> = ({ onSubmit, onSkip }) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-blue-800 mb-2">Acompañantes del Grupo Primario</h3>
        <p className="text-blue-700 text-sm">
          Podés registrar hasta 3 acompañantes de tu grupo primario o continuar sin agregar acompañantes.
        </p>
      </div>

      <CompanionFormList onSubmit={onSubmit} />
      
      <div className="text-center">
        <button
          onClick={onSkip}
          className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
        >
          Continuar sin agregar acompañantes
        </button>
      </div>
    </div>
  );
};

export default CompanionRegistration;