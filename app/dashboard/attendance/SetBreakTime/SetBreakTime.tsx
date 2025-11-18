'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useCallback } from 'react';
import { useBreakTimeCRUD } from './hooks/useBreakTimeCRUD';
import BreakTimeActions from './BreakTimeActions';
import BreakTimeTable from './BreakTimeTable';
import BreakTimeForm from './BreakTimeForm';
import DeleteModal from '../../common/components/DeleteModal';
import CommonSelect from '../../common/components/CommonSelect';
import { Search } from 'lucide-react';

const SetBreakTime: React.FC = () => {
    const {
        breakTimes,
        loading,
        error,
        pagination,
        filters,
        search,
        selectedBreakTime,
        isCreateOpen,
        isEditOpen,
        isDeleteOpen,
        openCreateModal,
        openEditModal,
        openDeleteModal,
        closeModals,
        loadBreakTimes,
        handleCreate,
        handleUpdate,
        handleDelete,
        handleSearch,
        handlePageChange,
        handleLimitChange,
        handleFilterChange,
        handleClearFilters,
    } = useBreakTimeCRUD();

    const loadBreakTimesStable = useCallback(() => {
        loadBreakTimes();
    }, [loadBreakTimes]);

    useEffect(() => {
        loadBreakTimesStable();
    }, [loadBreakTimesStable]);

    const handleView = (breakTime: typeof selectedBreakTime) => {
        console.log('View break time:', breakTime);
    };

    // Convert FormData → BreakTime (create)
    const onCreateSubmit = async (data: import('./types/breakTimeTypes').BreakTimeFormData) => {
        const breakTimeData = {
            ...data,
            createdBy: 'admin',
        };
        await handleCreate(breakTimeData);
    };

    // Convert FormData → BreakTime (update)
    const onUpdateSubmit = async (data: import('./types/breakTimeTypes').BreakTimeFormData) => {
        if (!selectedBreakTime?._id) return;
        await handleUpdate(data);
    };

    // Convert BreakTime → FormData (edit mode)
    const editFormData: Partial<import('./types/breakTimeTypes').BreakTimeFormData> | undefined = selectedBreakTime
        ? {
            name: selectedBreakTime.name,
            startTime: selectedBreakTime.startTime,
            endTime: selectedBreakTime.endTime,
            duration: selectedBreakTime.duration,
            withSalary: selectedBreakTime.withSalary,
            calculationType: selectedBreakTime.calculationType,
            description: selectedBreakTime.description,
        }
        : undefined;

    // Mock options - in real app, these would come from API
    const nameOptions = [
        { value: 'lunch', label: 'Lunch Break' },
        { value: 'tea', label: 'Tea Break' },
        { value: 'prayer', label: 'Prayer Break' },
    ];

    const startTimeOptions = [
        { value: '12:00', label: '12:00 PM' },
        { value: '13:00', label: '1:00 PM' },
        { value: '14:00', label: '2:00 PM' },
    ];

    const calculationTypeOptions = [
        { value: 'Auto Deduct', label: 'Auto Deduct' },
        { value: 'Manual', label: 'Manual' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="container mx-auto px-4 py-8"
        >
            {/* Top Heading */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-6"
            >
                <h1 className="text-3xl font-bold text-text">Break Time List</h1>
                <BreakTimeActions onAdd={openCreateModal} />
            </motion.div>

            {/* Filter Bar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
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
                            options={nameOptions}
                            value={filters.name || ''}
                            onChange={(value) => handleFilterChange({ name: value || null })}
                            placeholder="Select Name"
                            label="Name"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <CommonSelect
                            options={startTimeOptions}
                            value={filters.startTime || ''}
                            onChange={(value) => handleFilterChange({ startTime: value || null })}
                            placeholder="Select Start Time"
                            label="Start Time"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        <CommonSelect
                            options={calculationTypeOptions}
                            value={filters.calculationType || ''}
                            onChange={(value) => handleFilterChange({ calculationType: value || null })}
                            placeholder="Select Calculation Type"
                            label="Calculation Type"
                        />
                    </motion.div>

                    {/* Empty div for grid alignment */}
                    <div></div>
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
                            Search Break Times
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                type="text"
                                placeholder="Search by name..."
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                            />
                        </div>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClearFilters}
                        className="px-6 py-3 cursor-pointer bg-accent text-black rounded-xl hover:bg-primary hover:text-white transition-colors flex items-center gap-2 font-medium"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reset Filters
                    </motion.button>
                </div>
            </motion.div>

            <BreakTimeTable
                breakTimes={breakTimes}
                loading={loading}
                pagination={pagination}
                onEdit={openEditModal}
                onView={handleView}
                onDelete={openDeleteModal}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
            />

            <BreakTimeForm isOpen={isCreateOpen} onClose={closeModals} onSubmit={onCreateSubmit} isEdit={false} />
            <BreakTimeForm isOpen={isEditOpen} onClose={closeModals} onSubmit={onUpdateSubmit} editData={editFormData} isEdit={true} />

            {isDeleteOpen && selectedBreakTime && (
                <DeleteModal
                    isOpen={isDeleteOpen}
                    title="Delete Break Time"
                    message={`Are you sure you want to delete "${selectedBreakTime.name}"?`}
                    onConfirm={handleDelete}
                    onCancel={closeModals}
                />
            )}

            {error && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg"
                >
                    {error}
                </motion.div>
            )}
        </motion.div>
    );
};

export default SetBreakTime;