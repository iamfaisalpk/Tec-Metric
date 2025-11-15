'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Plus, Building2, User, Hash, Users, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Department {
    _id: string;
    name: string;
    code: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

interface DepartmentFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Department, '_id' | 'createdAt' | 'updatedAt'>) => void;
    editData?: Department | null;
    isEdit?: boolean;
}

const ALL_BRANCHES = [
    'Restaurant Dubai',
    'Restaurant Abu Dhabi',
    'Head Office',
    'Warehouse - Dubai',
    'Warehouse - Sharjah',
    'Cafe Downtown',
];

const DepartmentForm: React.FC<DepartmentFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    editData,
    isEdit = false,
}) => {
    const [formData, setFormData] = useState({ name: '', code: '', createdBy: '' });
    const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
    const [branchSearch, setBranchSearch] = useState('');
    const [showBranchDropdown, setShowBranchDropdown] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Reset on open
    useEffect(() => {
        if (isOpen) {
            if (isEdit && editData) {
                setFormData({
                    name: editData.name,
                    code: editData.code,
                    createdBy: editData.createdBy,
                });
                setSelectedBranches(['Restaurant Dubai']);
            } else {
                setFormData({ name: '', code: '', createdBy: '' });
                setSelectedBranches(['Restaurant Dubai']);
            }
            setErrors({});
            setBranchSearch('');
            setShowBranchDropdown(false);
        }
    }, [isEdit, editData, isOpen]);

    // Click outside → close dropdown
    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowBranchDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const validate = useCallback(() => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name.trim()) newErrors.name = 'Department name is required';
        if (!formData.code.trim()) newErrors.code = 'Department code is required';
        if (!formData.createdBy.trim()) newErrors.createdBy = 'Created by is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleSubmit = useCallback(() => {
        if (validate()) {
            onSubmit(formData);
            onClose();
        }
    }, [formData, validate, onSubmit, onClose]);

    const addBranch = useCallback((branch: string) => {
        if (!selectedBranches.includes(branch)) {
            setSelectedBranches((prev) => [...prev, branch]);
        }
        setBranchSearch('');
        setShowBranchDropdown(false);
    }, [selectedBranches]);

    const removeBranch = useCallback((branch: string) => {
        setSelectedBranches((prev) => prev.filter((b) => b !== branch));
    }, []);

    const filteredBranches = ALL_BRANCHES.filter(
        (b) => b.toLowerCase().includes(branchSearch.toLowerCase()) && !selectedBranches.includes(b)
    );

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {/* BACKDROP – LIGHT BLUR + CONTENT VISIBLE */}
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
                {/* MODAL CARD */}
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
                            {isEdit ? 'Edit Department' : 'Add Department'}
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            type="button"
                        >
                            <X className="w-5 h-5 text-gray-500 cursor-pointer" />
                        </button>
                    </div>

                    {/* Scrollable Form */}
                    <div className="p-6 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto">
                        {/* Branch */}
                        <div ref={dropdownRef}>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <Building2 className="w-4 h-4" />
                                Branch
                            </label>
                            <div className="relative">
                                <div
                                    onClick={() => setShowBranchDropdown(!showBranchDropdown)}
                                    className="flex flex-wrap gap-2 p-3 bg-gray-50 border border-gray-200 rounded-xl min-h-12 cursor-pointer hover:border-gray-300 transition-colors"
                                >
                                    {selectedBranches.map((branch) => (
                                        <span
                                            key={branch}
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-full text-sm"
                                        >
                                            {branch}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeBranch(branch);
                                                }}
                                                className="ml-1 text-gray-500 hover:text-gray-700"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <ChevronDown className="w-4 h-4 cursor-pointer" />
                                        Add Branch
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {showBranchDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto"
                                        >
                                            <input
                                                type="text"
                                                placeholder="Search branch..."
                                                value={branchSearch}
                                                onChange={(e) => setBranchSearch(e.target.value)}
                                                className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none text-sm"
                                                autoFocus
                                            />
                                            {filteredBranches.length > 0 ? (
                                                filteredBranches.map((branch) => (
                                                    <button
                                                        key={branch}
                                                        type="button"
                                                        onClick={() => addBranch(branch)}
                                                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between text-sm"
                                                    >
                                                        {branch}
                                                        <Check className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100" />
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-4 py-3 text-sm text-gray-500">No branches found</div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Department Name */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <Users className="w-4 h-4" />
                                Department
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter department name"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition pr-12"
                                />
                                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <Plus className="w-5 h-5 cursor-pointer" />
                                </button>
                            </div>
                            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                        </div>

                        {/* Department Code */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <Hash className="w-4 h-4" />
                                Department Code
                            </label>
                            <input
                                type="text"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                placeholder="Enter code"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                            {errors.code && <p className="mt-1 text-xs text-red-600">{errors.code}</p>}
                        </div>

                        {/* Superior */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <User className="w-4 h-4" />
                                Superior
                            </label>
                            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                                <option>Select superior department</option>
                                <option>Operations</option>
                                <option>HR</option>
                            </select>
                        </div>

                        {/* Department Manager */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <User className="w-4 h-4" />
                                Department Manager
                            </label>
                            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                                <option>Select manager</option>
                                <option>John Doe</option>
                                <option>Jane Smith</option>
                            </select>
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
                                type="button"
                                onClick={handleSubmit}
                                className="px-6 py-3 cursor-pointer bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-shadow shadow-lg"
                            >
                                {isEdit ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DepartmentForm;