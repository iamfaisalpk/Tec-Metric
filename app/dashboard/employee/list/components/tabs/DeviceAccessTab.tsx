import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { FormField } from '../form/FormField';
import { FormData } from '../EmployeeForm';
import { FieldErrors } from 'react-hook-form';
import CommonSelect from '@/app/dashboard/common/components/CommonSelect';

interface Props {
    control: Control<FormData>;
    errors: FieldErrors<FormData>;
}

export const DeviceAccessTab: React.FC<Props> = ({ control, errors }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <FormField label="Verify Mode" error={errors.verifyMode}>
            <Controller
                name="verifyMode"
                control={control}
                render={({ field }) => (
                    <CommonSelect
                        options={[
                            { value: 'fp', label: 'Fingerprint' },
                            { value: 'card', label: 'Card' },
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select verify mode"
                    />
                )}
            />
        </FormField>

        <FormField label="Card No.">
            <Controller
                name="cardNo"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Enter card no."
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
            />
        </FormField>

        <FormField label="Enroll Device">
            <Controller
                name="enrollDevice"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Enter device"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
            />
        </FormField>

        <FormField label="Plm Qty">
            <Controller
                name="plmQty"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        value={field.value ?? ''}
                        type="number"
                        placeholder="Enter qty"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
            />
        </FormField>

        <FormField label="Device Privilege" error={errors.devicePrivilege}>
            <Controller
                name="devicePrivilege"
                control={control}
                render={({ field }) => (
                    <CommonSelect
                        options={[
                            { value: 'admin', label: 'Admin' },
                            { value: 'user', label: 'User' },
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select privilege"
                    />
                )}
            />
        </FormField>

        <FormField label="Pin">
            <Controller
                name="pin"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        value={field.value ?? ''}
                        type="text"
                        placeholder="Enter pin"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
            />
        </FormField>

        <FormField label="Fp Qty">
            <Controller
                name="fpQty"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        value={field.value ?? ''}
                        type="number"
                        placeholder="Enter qty"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
            />
        </FormField>

        <FormField label="Face Qty">
            <Controller
                name="faceQty"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        value={field.value ?? ''}
                        type="number"
                        placeholder="Enter qty"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
            />
        </FormField>
    </div>
);