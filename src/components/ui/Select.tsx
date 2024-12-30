import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  options: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({ 
  label,
  error,
  icon: Icon,
  options,
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                size={20} />
        )}
        <select
          className={`input-field ${Icon ? 'pl-10' : ''} ${error ? 'input-error' : ''} ${className}`}
          {...props}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};