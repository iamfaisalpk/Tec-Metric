import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { FormField } from '../form/FormField';
import { DateInput } from '../form/DateInput';
import { FormData } from '../EmployeeForm';
import { FieldErrors } from 'react-hook-form';
import CommonSelect from '@/app/dashboard/common/components/CommonSelect';

interface Props {
    control: Control<FormData>;
    errors: FieldErrors<FormData>;
}

export const WorkInfoTab: React.FC<Props> = ({ control, errors }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <FormField label="Branch" error={errors.branch}>
            <Controller
                name="branch"
                control={control}
                render={({ field }) => (
                    <CommonSelect
                        options={[
                            { value: 'main', label: 'Main Branch' },
                            { value: 'north', label: 'North Branch' },
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select branch"
                    />
                )}
            />
        </FormField>

        <FormField label="Department" error={errors.department}>
            <Controller
                name="department"
                control={control}
                render={({ field }) => (
                    <CommonSelect
                        options={[
                            { value: 'eng', label: 'Engineering' },
                            { value: 'hr', label: 'HR' },
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select department"
                    />
                )}
            />
        </FormField>

        <FormField label="Position" error={errors.position}>
            <Controller
                name="position"
                control={control}
                render={({ field }) => (
                    <CommonSelect
                        options={[
                            { value: 'dev', label: 'Developer' },
                            { value: 'mgr', label: 'Manager' },
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select position"
                    />
                )}
            />
        </FormField>

        <FormField label="Superior" error={errors.superior}>
            <Controller
                name="superior"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        placeholder="Enter superior name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
            />
        </FormField>

        <FormField label="Date of Join" error={errors.dateOfJoin}>
            <DateInput name="dateOfJoin" control={control} />
        </FormField>

        <FormField label="Salary" error={errors.salary}>
            <Controller
                name="salary"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type="number"
                        placeholder="Enter salary"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
            />
        </FormField>
    </div>
);