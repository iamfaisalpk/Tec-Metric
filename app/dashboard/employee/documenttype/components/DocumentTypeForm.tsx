'use client';

import React, { useState, useEffect,  useCallback } from 'react';
import { X, Plus, FileText, } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CommonSelect from '../../../common/components/CommonSelect';

const schema = z.object({
    branch: z.string().min(1, 'Branch is required'),
    department: z.string().min(1, 'Department is required'),
    documentTypes: z.array(z.string().min(2, 'Document type must be at least 2 characters').max(50, 'Document type must be at most 50 characters')).min(1, 'At least one document type is required'),
});

type FormData = z.infer<typeof schema>;

interface DocumentTypeFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: FormData) => void;
    editData?: { branch: string; department: string; documentTypes: string[] } | null;
    isEdit?: boolean;
}

const DocumentTypeForm: React.FC<DocumentTypeFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    editData,
    isEdit = false,
}) => {
    const [branches, setBranches] = useState<{ value: string; label: string }[]>([]);
    const [departments, setDepartments] = useState<{ value: string; label: string }[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<string>('');

    const { control, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            branch: '',
            department: '',
            documentTypes: [''],
        },
    });

    const watchedDocumentTypes = watch('documentTypes');

    // Fetch branches on mount
    useEffect(() => {
        // Mock data - replace with actual API call
        setBranches([
            { value: 'branch1', label: 'Restaurant Dubai' },
            { value: 'branch2', label: 'Restaurant Abu Dhabi' },
            { value: 'branch3', label: 'Head Office' },
        ]);
    }, []);

    // Fetch departments when branch changes
    useEffect(() => {
        if (selectedBranch) {
            // Mock data - replace with actual API call
            setDepartments([
                { value: 'dept1', label: 'Operations' },
                { value: 'dept2', label: 'HR' },
                { value: 'dept3', label: 'Finance' },
            ]);
        } else {
            setDepartments([]);
        }
    }, [selectedBranch]);

    // Reset form on open
    useEffect(() => {
        if (isOpen) {
            if (isEdit && editData) {
                reset({
                    branch: editData.branch,
                    department: editData.department,
                    documentTypes: editData.documentTypes,
                });
                setSelectedBranch(editData.branch);
            } else {
                reset({
                    branch: '',
                    department: '',
                    documentTypes: [''],
                });
                setSelectedBranch('');
            }
        }
    }, [isOpen, isEdit, editData, reset]);

    // ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const addDocumentType = useCallback(() => {
        setValue('documentTypes', [...watchedDocumentTypes, '']);
    }, [watchedDocumentTypes, setValue]);

    const removeDocumentType = useCallback((index: number) => {
        if (watchedDocumentTypes.length > 1) {
            const newTypes = watchedDocumentTypes.filter((_, i) => i !== index);
            setValue('documentTypes', newTypes);
        }
    }, [watchedDocumentTypes, setValue]);

    const updateDocumentType = useCallback((index: number, value: string) => {
        const newTypes = [...watchedDocumentTypes];
        newTypes[index] = value;
        setValue('documentTypes', newTypes);
    }, [watchedDocumentTypes, setValue]);

    const handleFormSubmit = (data: FormData) => {
        onSubmit(data);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent backdrop-blur-sm"
                style={{
                    background: 'rgba(255, 255, 255, 0.15)'
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {isEdit ? 'Edit Document Type' : 'Add Document Type'}
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                            type="button"
                        >
                            <X className="w-5 h-5 text-gray-500 cursor-pointer" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto">
                        {/* Branch */}
                        <div>
                            <Controller
                                name="branch"
                                control={control}
                                render={({ field }) => (
                                    <CommonSelect
                                        label="Branch"
                                        options={branches}
                                        value={field.value}
                                        onChange={(value) => {
                                            field.onChange(value);
                                            setSelectedBranch(value);
                                            setValue('department', ''); // Reset department when branch changes
                                        }}
                                        placeholder="Select a branch"
                                    />
                                )}
                            />
                            {errors.branch && <p className="mt-1 text-xs text-red-600">{errors.branch.message}</p>}
                        </div>

                        {/* Department */}
                        <div>
                            <Controller
                                name="department"
                                control={control}
                                render={({ field }) => (
                                    <CommonSelect
                                        label="Department"
                                        options={departments}
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Select a department"
                                        disabled={!selectedBranch}
                                    />
                                )}
                            />
                            {errors.department && <p className="mt-1 text-xs text-red-600">{errors.department.message}</p>}
                        </div>

                        {/* Document Types */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <FileText className="w-4 h-4" />
                                Document Types
                            </label>
                            <div className="space-y-2">
                                {watchedDocumentTypes.map((type, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={type}
                                            onChange={(e) => updateDocumentType(index, e.target.value)}
                                            placeholder="Enter document type"
                                            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        />
                                        {watchedDocumentTypes.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeDocumentType(index)}
                                                className="p-2 text-red-500 hover:text-red-700 transition-colors"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addDocumentType}
                                    className="flex items-center gap-2 px-4 py-2 cursor-pointer text-primary hover:text-primary/80 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Document Type
                                </button>
                            </div>
                            {errors.documentTypes && <p className="mt-1 text-xs text-red-600">{errors.documentTypes.message}</p>}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 cursor-pointer text-gray-700 font-medium bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-shadow"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 cursor-pointer bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-shadow shadow-lg"
                            >
                                {isEdit ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DocumentTypeForm;
