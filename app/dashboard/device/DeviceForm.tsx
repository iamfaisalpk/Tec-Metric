'use client';

import React, { useState, useEffect, FC } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DeviceFormData } from './types/deviceTypes';

const schema = z.object({
    deviceName: z.string().min(1, 'Device name is required'),
    attendanceDevice: z.string().min(1, 'Attendance device is required'),
    deviceIP: z.string().min(1, 'Device IP is required'),
    registrationDevice: z.string().min(1, 'Registration device is required'),
    serialNo: z.string().min(1, 'Serial number is required'),
    requestMethod: z.string().min(1, 'Request method is required'),
    timeZone: z.string().min(1, 'Time zone is required'),
    transferMode: z.string().min(1, 'Transfer mode is required'),
});

interface DeviceFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: DeviceFormData) => void;
    editData?: Partial<DeviceFormData>;
    isEdit?: boolean;
}

const DeviceForm: FC<DeviceFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    editData,
    isEdit = false,
}) => {
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<DeviceFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            deviceName: '',
            attendanceDevice: '',
            deviceIP: '',
            registrationDevice: '',
            serialNo: '',
            requestMethod: '',
            timeZone: '',
            transferMode: '',
        },
    });

    useEffect(() => {
        if (editData && isEdit) {
            Object.entries(editData).forEach(([k, v]) => {
                setValue(k as keyof DeviceFormData, v ?? '');
            });
        } else {
            reset();
        }
    }, [editData, isEdit, setValue, reset]);

    const onFormSubmit = async (data: DeviceFormData) => {
        setLoading(true);
        try {
            await onSubmit(data);
        } finally {
            setLoading(false);
        }
    };

    const attendanceDeviceOptions = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
    ];

    const registrationDeviceOptions = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
    ];

    const requestMethodOptions = [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' },
    ];

    const timeZoneOptions = [
        { value: 'UTC', label: 'UTC' },
        { value: 'EST', label: 'EST' },
        { value: 'PST', label: 'PST' },
        { value: 'GMT', label: 'GMT' },
    ];

    const transferModeOptions = [
        { value: 'TCP', label: 'TCP' },
        { value: 'UDP', label: 'UDP' },
        { value: 'HTTP', label: 'HTTP' },
    ];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-xl font-semibold text-text">
                            {isEdit ? 'Edit Device' : 'Add Device'}
                        </h2>
                        <button type="button" onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Device Name
                                </label>
                                <Controller
                                    name="deviceName"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="Enter device name"
                                        />
                                    )}
                                />
                                {errors.deviceName && (
                                    <p className="text-sm text-red-600 mt-1">{errors.deviceName.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Attendance Device
                                </label>
                                <Controller
                                    name="attendanceDevice"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                                        >
                                            <option value="">Select attendance device</option>
                                            {attendanceDeviceOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                                {errors.attendanceDevice && (
                                    <p className="text-sm text-red-600 mt-1">{errors.attendanceDevice.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Device IP
                                </label>
                                <Controller
                                    name="deviceIP"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="Enter device IP"
                                        />
                                    )}
                                />
                                {errors.deviceIP && (
                                    <p className="text-sm text-red-600 mt-1">{errors.deviceIP.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Registration Device
                                </label>
                                <Controller
                                    name="registrationDevice"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                                        >
                                            <option value="">Select registration device</option>
                                            {registrationDeviceOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                                {errors.registrationDevice && (
                                    <p className="text-sm text-red-600 mt-1">{errors.registrationDevice.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Serial No.
                                </label>
                                <Controller
                                    name="serialNo"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="Enter serial number"
                                        />
                                    )}
                                />
                                {errors.serialNo && (
                                    <p className="text-sm text-red-600 mt-1">{errors.serialNo.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Request Method
                                </label>
                                <Controller
                                    name="requestMethod"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                                        >
                                            <option value="">Select request method</option>
                                            {requestMethodOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                                {errors.requestMethod && (
                                    <p className="text-sm text-red-600 mt-1">{errors.requestMethod.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Time Zone
                                </label>
                                <Controller
                                    name="timeZone"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                                        >
                                            <option value="">Select time zone</option>
                                            {timeZoneOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                                {errors.timeZone && (
                                    <p className="text-sm text-red-600 mt-1">{errors.timeZone.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Transfer Mode
                                </label>
                                <Controller
                                    name="transferMode"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                                        >
                                            <option value="">Select transfer mode</option>
                                            {transferModeOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                                {errors.transferMode && (
                                    <p className="text-sm text-red-600 mt-1">{errors.transferMode.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-8">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition disabled:opacity-50 cursor-pointer"
                            >
                                {loading ? 'Submitting...' : isEdit ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DeviceForm;
