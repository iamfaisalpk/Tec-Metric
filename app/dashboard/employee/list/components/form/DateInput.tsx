import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Calendar } from 'lucide-react';
import { FormData } from '../EmployeeForm';

interface DateInputProps {
    name: keyof FormData;
    control: Control<FormData>;
}

export const DateInput: React.FC<DateInputProps> = ({ name, control }) => (
    <div className="relative">
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
                <input
                    {...field}
                    type="date"
                    value={typeof value === 'string' ? value : ''}
                    onChange={e => onChange(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
            )}
        />
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
);