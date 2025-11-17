import React from 'react';
import { FieldError } from 'react-hook-form';

interface FormFieldProps {
    label: string;
    error?: FieldError;
    children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, error, children }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        {children}
        {error && <p className="text-red-600 text-xs mt-1">{error.message}</p>}
    </div>
);