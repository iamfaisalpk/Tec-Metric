'use client';

import React from 'react';
import { Controller, Control } from 'react-hook-form';
import PhoneInputLib from 'react-phone-number-input';
import type { CountryCode } from 'libphonenumber-js/core';
import 'react-phone-number-input/style.css';
import { FormData } from '../EmployeeForm';

interface PhoneInputProps {
    name: keyof FormData;
    control: Control<FormData>;
    optional?: boolean;
    defaultCountry?: CountryCode;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
    name,
    control,
    optional = false,
    defaultCountry = 'IN' as CountryCode,
}) => (
    <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
            <div className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                <PhoneInputLib
                    international
                    defaultCountry={defaultCountry}
                    countrySelectProps={{
                        searchable: "true",
                    }}
                    placeholder={optional ? 'Optional phone' : 'Enter phone number'}
                    value={value as string | undefined}
                    onChange={(val) => onChange(val ?? '')}
                    style={{
                        '--PhoneInputCountrySelectArrow-color': '#9CA3AF',
                    } as React.CSSProperties}
                />
            </div>
        )}
    />
);