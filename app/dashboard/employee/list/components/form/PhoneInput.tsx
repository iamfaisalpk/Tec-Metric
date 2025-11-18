'use client';

import React from 'react';
import { Controller, Control } from 'react-hook-form';
import PhoneInputLib from 'react-phone-number-input';
import type { CountryCode } from 'libphonenumber-js/core';
import 'react-phone-number-input/style.css';
import { FormData } from '../EmployeeForm';
import { Phone } from 'lucide-react';

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
            <div className="relative w-full">
                {/* Phone Icon */}
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />

                {/* Outer container */}
                <div
                    className="
            w-full border border-gray-300 rounded-xl
            focus-within:ring-2 focus-within:ring-primary
            focus-within:border-primary bg-white
            pl-10
            "
                >
                    <PhoneInputLib
                        international
                        defaultCountry={defaultCountry}
                        countrySelectProps={{
                            className:
                                'px-2 py-2 rounded-lg bg-gray-100 border border-gray-300 cursor-pointer',
                        }}
                        placeholder={optional ? 'Optional phone' : 'Enter phone number'}
                        value={value as string | undefined}
                        onChange={(val) => onChange(val ?? '')}
                        className="w-full py-2 text-gray-800 outline-none"
                        style={{
                            '--PhoneInputCountrySelectArrow-color': '#6B7280',
                        } as React.CSSProperties}
                    />
                </div>
            </div>
        )}
    />
);
