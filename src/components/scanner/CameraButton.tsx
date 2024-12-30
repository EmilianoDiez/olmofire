import React from 'react';
import { Camera } from 'lucide-react';

interface CameraButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export const CameraButton: React.FC<CameraButtonProps> = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        flex items-center justify-center px-6 py-3 
        bg-blue-600 text-white rounded-lg
        transition-colors duration-200
        ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}
      `}
    >
      <Camera className="w-5 h-5 mr-2" />
      {isLoading ? 'Iniciando cámara...' : 'Iniciar Cámara'}
    </button>
  );
};

export default CameraButton;