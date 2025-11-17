'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import CommonSelect from '../../../common/components/CommonSelect';

interface EmployeeFiltersProps {
    filters: {
        branch: string | null;
        department: string | null;
        position: string | null;
        gender: string | null;
    };
    search: string;
    onFilterChange: (filters: Partial<EmployeeFiltersProps['filters']>) => void;
    onClearFilters: () => void;
    onSearch: (search: string) => void;
}

const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
    filters,
    search,
    onFilterChange,
    onClearFilters,
    onSearch,
}) => {
    // Mock options - in real app, these would come from API
    const branchOptions = [
        { value: 'branch1', label: 'Main Branch' },
        { value: 'branch2', label: 'Downtown Branch' },
        { value: 'branch3', label: 'North Branch' },
    ];

    const departmentOptions = [
        { value: 'dept1', label: 'Engineering' },
        { value: 'dept2', label: 'Human Resources' },
        { value: 'dept3', label: 'Finance' },
        { value: 'dept4', label: 'Marketing' },
    ];

    const positionOptions = [
        { value: 'pos1', label: 'Software Engineer' },
        { value: 'pos2', label: 'Manager' },
        { value: 'pos3', label: 'Analyst' },
        { value: 'pos4', label: 'Designer' },
    ];

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-primary/20 p-6 mb-6"
        >
            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                >
                    <CommonSelect
                        options={branchOptions}
                        value={filters.branch || ''}
                        onChange={(value) => onFilterChange({ branch: value || null })}
                        placeholder="Select Branch"
                        label="Branch"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <CommonSelect
                        options={departmentOptions}
                        value={filters.department || ''}
                        onChange={(value) => onFilterChange({ department: value || null })}
                        placeholder="Select Department"
                        label="Department"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    <CommonSelect
                        options={positionOptions}
                        value={filters.position || ''}
                        onChange={(value) => onFilterChange({ position: value || null })}
                        placeholder="Select Position"
                        label="Position"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <CommonSelect
                        options={genderOptions}
                        value={filters.gender || ''}
                        onChange={(value) => onFilterChange({ gender: value || null })}
                        placeholder="Select Gender"
                        label="Gender"
                    />
                </motion.div>
            </div>

            {/* Search and Reset Row */}
            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex-1"
                >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search Employees
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            placeholder="Search by name, employee ID..."
                            value={search}
                            onChange={(e) => onSearch(e.target.value)}
                            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                        />
                    </div>
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClearFilters}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 font-medium"
                >
                    <X className="w-4 h-4" />
                    Reset Filters
                </motion.button>
            </div>
        </motion.div>
    );
};

export default EmployeeFilters;
