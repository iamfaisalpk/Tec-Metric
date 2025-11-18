'use client';

import React, { useState, useEffect, FC } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BreakTimeFormData } from './types/breakTimeTypes';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    duration: z.string().min(1, 'Duration is required'),
    withSalary: z.boolean(),
    calculationType: z.enum(['Auto Deduct', 'Manual']),
    description: z.string().optional(),
});

interface BreakTimeFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: BreakTimeFormData) => void;
    editData?: Partial<BreakTimeFormData>;
    isEdit?: boolean;
}

const BreakTimeForm: FC<BreakTimeFormProps> = ({
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
        watch,
    } = useForm<BreakTimeFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            startTime: '',
            endTime: '',
            duration: '',
            withSalary: false,
            calculationType: 'Auto Deduct',
            description: '',
        },
    });

    const startTime = watch('startTime');
    const endTime = watch('endTime');

    // Auto-calculate duration
    useEffect(() => {
        if (startTime && endTime) {
            const start = new Date(`1970-01-01T${startTime}:00`);
            const end = new Date(`1970-01-01T${endTime}:00`);
            const diffMs = end.getTime() - start.getTime();
            if (diffMs > 0) {
                const hours = Math.floor(diffMs / (1000 * 60 * 60));
                const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                const duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                setValue('duration', duration);
            } else {
                setValue('duration', '');
            }
        }
    }, [startTime, endTime, setValue]);

    useEffect(() => {
        if (editData && isEdit) {
            Object.entries(editData).forEach(([k, v]) => {
                setValue(k as keyof BreakTimeFormData, v ?? '');
            });
        } else {
            reset();
        }
    }, [editData, isEdit, setValue, reset]);

    const onFormSubmit = async (data: BreakTimeFormData) => {
        setLoading(true);
        try {
            await onSubmit(data);
        } finally {
            setLoading(false);
        }
    };

    const calculationTypeOptions = [
        { value: 'Auto Deduct', label: 'Auto Deduct' },
        { value: 'Manual', label: 'Manual' },
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
                    className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-xl font-semibold text-text">
                            {isEdit ? 'Edit Break Time' : 'Add Break Time'}
                        </h2>
                        <button type="button" onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name
                                </label>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="Enter break time name"
                                        />
                                    )}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Time
                                </label>
                                <Controller
                                    name="startTime"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="time"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                        />
                                    )}
                                />
                                {errors.startTime && (
                                    <p className="text-sm text-red-600 mt-1">{errors.startTime.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    End Time
                                </label>
                                <Controller
                                    name="endTime"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="time"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                        />
                                    )}
                                />
                                {errors.endTime && (
                                    <p className="text-sm text-red-600 mt-1">{errors.endTime.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Duration
                                </label>
                                <Controller
                                    name="duration"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="Auto-calculated"
                                        />
                                    )}
                                />
                                {errors.duration && (
                                    <p className="text-sm text-red-600 mt-1">{errors.duration.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    With Salary
                                </label>
                                <Controller
                                    name="withSalary"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="flex items-center">
                                            <input
                                                {...field}
                                                type="checkbox"
                                                checked={field.value}
                                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Yes</span>
                                        </div>
                                    )}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Calculation Type
                                </label>
                                <Controller
                                    name="calculationType"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                                        >
                                            {calculationTypeOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                                {errors.calculationType && (
                                    <p className="text-sm text-red-600 mt-1">{errors.calculationType.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="Enter description (optional)"
                                    />
                                )}
                            />
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

export default BreakTimeForm;
