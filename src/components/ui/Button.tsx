import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: LucideIcon;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  icon: Icon,
  children,
  className = '',
  ...props 
}) => {
  const baseClass = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    outline: 'button-outline'
  }[variant];

  return (
    <button 
      className={`inline-flex items-center justify-center ${baseClass} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
};