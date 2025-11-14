'use client';

import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useBranchCRUD } from './hooks/useBranchCRUD';
import BranchTable from './components/BranchTable';
import BranchForm from './components/BranchForm';
import DeleteModal from '../components/DeleteModal';

export default function Branch() {
    const {
        branches,
        loading,
        error,
        pagination,
        search,
        selectedBranch,
        isCreateOpen,
        isEditOpen,
        isDeleteOpen,
        openCreateModal,
        openEditModal,
        openDeleteModal,
        closeModals,
        handleCreateBranch,
        handleUpdateBranch,
        handleDeleteBranch,
        handleFetchBranches,
        handleSearch,
        handlePageChange,
        handleLimitChange,
    } = useBranchCRUD();

    useEffect(() => {
        handleFetchBranches();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="container mx-auto px-4 py-8"
        >
            <BranchTable
                branches={branches}
                loading={loading}
                search={search}
                pagination={pagination}
                onSearch={handleSearch}
                onAdd={openCreateModal}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
            />

            {/* Create Modal */}
            <AnimateModal isOpen={isCreateOpen} title="Add New Branch" onClose={closeModals}>
                <BranchForm mode="create" onSubmit={handleCreateBranch} onCancel={closeModals} />
            </AnimateModal>

            {/* Edit Modal */}
            <AnimateModal isOpen={isEditOpen} title="Edit Branch" onClose={closeModals}>
                {selectedBranch && (
                    <BranchForm
                        mode="edit"
                        initialData={selectedBranch}
                        onSubmit={handleUpdateBranch}
                        onCancel={closeModals}
                    />
                )}
            </AnimateModal>

            {/* Delete Modal */}
            {isDeleteOpen && selectedBranch && (
                <DeleteModal
                    isOpen={isDeleteOpen}
                    title="Delete Branch"
                    message={`Are Scottish sure you want to delete "${selectedBranch.name}"?`}
                    onConfirm={handleDeleteBranch}
                    onCancel={closeModals}
                />
            )}

            {/* Error */}
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
}

/* Reusable Modal */
function AnimateModal({
    isOpen,
    title,
    children,
    onClose,
}: {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}) {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6"
            >
                <h3 className="text-lg font-semibold text-text mb-4">{title}</h3>
                {children}
            </motion.div>
        </motion.div>
    );
}