'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';

import { Branch } from '../hooks/useBranchCRUD';

interface BranchFormProps {
    mode: 'create' | 'edit';
    initialData?: Branch;
    onSubmit: (data: Omit<Branch, '_id' | 'createdAt'>) => void;
    onCancel: () => void;
}

const BranchForm: React.FC<BranchFormProps> = ({ mode, initialData, onSubmit, onCancel }) => {

    const [formData, setFormData] = useState<Omit<Branch, '_id' | 'createdAt'>>(
        initialData ? {
            name: initialData.name,
            code: initialData.code,
            location: initialData.location,
            phone: initialData.phone,
            state: initialData.state,
            city: initialData.city,
            address: initialData.address,
            country: initialData.country,
            superior: initialData.superior,
            logo: initialData.logo,
            status: initialData.status,
            updatedAt: initialData.updatedAt,
        } : {
            name: '',
            code: '',
            location: '',
            phone: '',
            state: '',
            city: '',
            address: '',
            country: '',
            superior: '',
            logo: '',
            status: 'active' as const,
            updatedAt: undefined,
        }
    );

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setFormData({
                name: initialData.name,
                code: initialData.code,
                location: initialData.location,
                phone: initialData.phone,
                state: initialData.state,
                city: initialData.city,
                address: initialData.address,
                country: initialData.country,
                superior: initialData.superior,
                logo: initialData.logo,
                status: initialData.status,
                updatedAt: initialData.updatedAt,
            });
        }
    }, [mode, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Remove error once user starts typing/selecting
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validateAll = () => {
        const newErrors: { [key: string]: string } = {};

        Object.keys(formData).forEach((key) => {
            const value = formData[key as keyof typeof formData];
            if (value === "" || value === undefined) {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} `;
            }
        });

        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateAll();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSubmit(formData);
    };

    const inputClass = (field: string) =>
        `mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition 
        ${errors[field] ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-primary"}`;

    return (
        <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={handleSubmit}
            className="p-6 bg-white rounded-xl"
        >
            <h3 className="text-lg font-semibold text-text mb-6">
                {mode === 'create' ? 'Add Branch' : 'Edit Branch'}
            </h3>

            {/* Row 1: Name, Code, Logo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

                {/* Name */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
                    <label className="block text-sm font-medium text-text">Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass('name')}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </motion.div>

                {/* Code */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <label className="block text-sm font-medium text-text">Branch Code</label>
                    <input
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        className={inputClass('code')}
                    />
                    {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
                </motion.div>

                {/* Logo */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                    <label className="block text-sm font-medium text-text">Add Branch Photo</label>
                    <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-20 cursor-pointer hover:border-primary transition">
                        <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                </motion.div>
            </div>

            {/* Address */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="mb-4">
                <label className="block text-sm font-medium text-text">Address</label>
                <textarea
                    name="address"
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    className={inputClass('address')}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </motion.div>

            {/* Country, State, City */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {['country', 'state', 'city'].map((field, i) => (
                    <motion.div
                        key={field}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + i * 0.05 }}
                    >
                        <label className="block text-sm font-medium text-text capitalize">{field}</label>
                        <select
                            name={field}
                            value={formData[field as keyof typeof formData]}
                            onChange={handleChange}
                            className={inputClass(field)}
                        >
                            <option value="">Select {field}</option>
                            <option value="sample">Sample {field}</option>
                        </select>
                        {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                    </motion.div>
                ))}
            </div>

            {/* Superior, Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                {/* Superior */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                    <label className="block text-sm font-medium text-text">Superior</label>
                    <select
                        name="superior"
                        value={formData.superior}
                        onChange={handleChange}
                        className={inputClass('superior')}
                    >
                        <option value="">Select Superior</option>
                        <option value="hq">Head Office</option>
                    </select>
                    {errors.superior && <p className="text-red-500 text-xs mt-1">{errors.superior}</p>}
                </motion.div>

                {/* Phone */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
                    <label className="block text-sm font-medium text-text">Phone No.</label>
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+44 20 7946 0123"
                        className={inputClass('phone')}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </motion.div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2.5 border cursor-pointer border-gray-300 rounded-lg text-text hover:bg-formbg transition"
                >
                    Cancel
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-5 py-2.5 cursor-pointer bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-md"
                >
                    {mode === 'create' ? 'Add' : 'Update'}
                </motion.button>
            </div>
        </motion.form>
    );
};

export default BranchForm;
