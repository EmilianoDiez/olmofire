import React from 'react';

interface CompanionFormFieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  type?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanionFormField: React.FC<CompanionFormFieldProps> = ({
  label,
  name,
  value,
  error,
  type = 'text',
  placeholder,
  min,
  max,
  onChange
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className={`w-full px-4 py-2 rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CompanionFormField;