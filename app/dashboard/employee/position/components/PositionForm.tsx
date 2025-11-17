'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CommonSelect from '@/app/dashboard/common/components/CommonSelect';

interface Position {
    _id: string;
    name: string;
    code: string;
    departmentId: string;
    createdAt: string;
    updatedAt?: string;
    superiorId?: string;
}

interface Department {
    _id: string;
    name: string;
    code: string;
}

interface PositionFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Position, '_id' | 'createdAt'> & { superiorId?: string }) => void;
    editData?: Position | null;
    isEdit?: boolean;
    departments: Department[];
    positions: { _id: string; name: string; departmentId: string }[];
}

const PositionForm: React.FC<PositionFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    editData,
    isEdit = false,
    departments,
    positions,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        departmentId: '',
        superiorId: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (isOpen) {
            if (isEdit && editData) {
                setFormData({
                    name: editData.name,
                    code: editData.code,
                    departmentId: editData.departmentId,
                    superiorId: editData.superiorId || '', // ← NOW SAFE
                });
            } else {
                setFormData({ name: '', code: '', departmentId: '', superiorId: '' });
            }
            setErrors({});
        }
    }, [isEdit, editData, isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const validate = useCallback(() => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name.trim()) newErrors.name = 'Position name is required';
        if (!formData.code.trim()) newErrors.code = 'Position code is required';
        if (!formData.departmentId) newErrors.departmentId = 'Department is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleSubmit = useCallback(() => {
        if (validate()) {
            const { superiorId, ...rest } = formData;
            onSubmit({ ...rest, ...(superiorId ? { superiorId } : {}) });
            onClose();
        }
    }, [formData, validate, onSubmit, onClose]);

    const departmentOptions = departments.map(d => ({
        value: d._id,
        label: d.name,
    }));

    const superiorOptions = useMemo(() => {
        if (!formData.departmentId) return [];
        return positions
            .filter(p => p.departmentId === formData.departmentId && p._id !== editData?._id)
            .map(p => ({ value: p._id, label: p.name }));
    }, [positions, formData.departmentId, editData]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-6">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {isEdit ? 'Edit Position' : 'Add Position'}
                        </h3>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <div className="px-6 pb-6 space-y-5">
                        {/* Department */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                            <CommonSelect
                                options={departmentOptions}
                                value={formData.departmentId}
                                onChange={value => setFormData({ ...formData, departmentId: value, superiorId: '' })}
                                placeholder="Select department"
                            />
                            {errors.departmentId && <p className="mt-1 text-xs text-red-600">{errors.departmentId}</p>}
                        </div>

                        {/* Position */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter position name"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                                />
                                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 cursor-pointer">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                        </div>

                        {/* Position Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Position Code</label>
                            <input
                                type="text"
                                value={formData.code}
                                onChange={e => setFormData({ ...formData, code: e.target.value })}
                                placeholder="Enter position code"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.code && <p className="mt-1 text-xs text-red-600">{errors.code}</p>}
                        </div>

                        {/* Superior */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Superior</label>
                            <CommonSelect
                                options={superiorOptions}
                                value={formData.superiorId}
                                onChange={value => setFormData({ ...formData, superiorId: value })}
                                placeholder="Select superior (optional)"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 px-6 pb-6">
                        <button onClick={onClose} className="px-6 py-3 cursor-pointer text-gray-700 font-medium bg-gray-100 rounded-full hover:bg-gray-200">
                            Cancel
                        </button>
                        <button onClick={handleSubmit} className="px-6 py-3 cursor-pointer bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 shadow-md">
                            {isEdit ? 'Update' : 'Add'}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PositionForm;