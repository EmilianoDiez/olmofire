import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  className = '' 
}) => {
  if (!message) return null;

  return (
    <div className={`flex items-center text-red-600 ${className}`}>
      <AlertCircle className="w-4 h-4 mr-1" />
      <span className="text-sm">{message}</span>
    </div>
  );
};