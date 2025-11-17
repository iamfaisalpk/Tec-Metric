import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { FormField } from '../form/FormField';
import { PhoneInput } from '../form/PhoneInput';
import { DateInput } from '../form/DateInput';
import { FormData } from '../EmployeeForm';
import { FieldErrors } from 'react-hook-form';
import CommonSelect from '@/app/dashboard/common/components/CommonSelect';

interface Props {
    control: Control<FormData>;
    errors: FieldErrors<FormData>;
}

export const PersonalDetailsTab: React.FC<Props> = ({ control, errors }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <FormField label="Employee ID" error={errors.employeeId}>
            <Controller
                name="employeeId"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        placeholder="e.g. EMP001"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
            />
        </FormField>

        <FormField label="First Name" error={errors.firstName}>
            <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        placeholder="Enter first name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
            />
        </FormField>

        <FormField label="Last Name" error={errors.lastName}>
            <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        placeholder="Enter last name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
            />
        </FormField>

        <FormField label="Gender" error={errors.gender}>
            <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                    <CommonSelect
                        options={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'other', label: 'Other' },
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select gender"
                    />
                )}
            />
        </FormField>

        <FormField label="Date of Birth" error={errors.dateOfBirth}>
            <DateInput name="dateOfBirth" control={control} />
        </FormField>

        <FormField label="Contact No" error={errors.phone}>
            <PhoneInput name="phone" control={control} />
        </FormField>

        <FormField label="Contact No. (optional)">
            <PhoneInput name="phoneOptional" control={control} optional />
        </FormField>

        <FormField label="Email" error={errors.email}>
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type="email"
                        placeholder="Enter email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
            />
        </FormField>

        <FormField label="Nationality" error={errors.nationality}>
            <Controller
                name="nationality"
                control={control}
                render={({ field }) => (
                    <CommonSelect
                        options={[{ value: 'indian', label: 'Indian' }]}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select nationality"
                    />
                )}
            />
        </FormField>

        <FormField label="Father Name" error={errors.fatherName}>
            <Controller
                name="fatherName"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        placeholder="Enter father name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
            />
        </FormField>

        <FormField label="Mother Name" error={errors.motherName}>
            <Controller
                name="motherName"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        placeholder="Enter mother name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
            />
        </FormField>

        <FormField label="Qualification" error={errors.qualification}>
            <Controller
                name="qualification"
                control={control}
                render={({ field }) => (
                    <CommonSelect
                        options={[
                            { value: 'btech', label: 'B.Tech' },
                            { value: 'mba', label: 'MBA' },
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select qualification"
                    />
                )}
            />
        </FormField>

        <FormField label="Field of study" error={errors.fieldOfStudy}>
            <Controller
                name="fieldOfStudy"
                control={control}
                render={({ field }) => (
                    <CommonSelect
                        options={[
                            { value: 'cs', label: 'Computer Science' },
                            { value: 'mech', label: 'Mechanical' },
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select field"
                    />
                )}
            />
        </FormField>

        <FormField label="Marital status" error={errors.maritalStatus}>
            <Controller
                name="maritalStatus"
                control={control}
                render={({ field }) => (
                    <CommonSelect
                        options={[
                            { value: 'single', label: 'Single' },
                            { value: 'married', label: 'Married' },
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select status"
                    />
                )}
            />
        </FormField>

        <FormField label="Residential address" error={errors.residentialAddress}>
            <Controller
                name="residentialAddress"
                control={control}
                render={({ field }) => (
                    <textarea
                        {...field}
                        rows={2}
                        placeholder="Enter address"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
            />
        </FormField>
    </div>
);