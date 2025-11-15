// app/dashboard/positions/page.tsx

'use client';
import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePositionCRUD } from './hooks/usePositionCRUD';
import PositionTable from './components/PositionTable';
import PositionForm from './components/PositionForm';
import DeleteModal from '../../common/components/DeleteModal';

const PositionPage: React.FC = () => {
    const {
        positions,
        departments,
        loading,
        error,
        pagination,
        search,
        editData,
        isCreateOpen,
        isEditOpen,
        isDeleteOpen,
        openCreateModal,
        openEditModal,
        openDeleteModal,
        closeModals,
        handleCreate,
        handleUpdate,
        handleDelete,
        handleFetchPositions,
        handleFetchDepartments,
        handleSearch,
        handlePageChange,
        handleLimitChange,
    } = usePositionCRUD();

    useEffect(() => {
        handleFetchPositions();
        handleFetchDepartments();
    }, [handleFetchPositions, handleFetchDepartments]);

    return (
        <div className="container mx-auto px-4 py-8">
            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <PositionTable
                positions={positions}
                departments={departments}
                loading={loading}
                pagination={pagination}
                search={search}
                onSearch={handleSearch}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                onAdd={openCreateModal}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
            />

            {/* PASS `positions` TO FORM */}
            <AnimatePresence mode="wait">
                {isCreateOpen && (
                    <PositionForm
                        key="create-form"
                        isOpen={isCreateOpen}
                        onClose={closeModals}
                        onSubmit={handleCreate}
                        isEdit={false}
                        departments={departments}
                        positions={positions}  // ← ADD THIS
                    />
                )}
                {isEditOpen && (
                    <PositionForm
                        key="edit-form"
                        isOpen={isEditOpen}
                        onClose={closeModals}
                        onSubmit={handleUpdate}
                        editData={editData}
                        isEdit={true}
                        departments={departments}
                        positions={positions}  // ← ADD THIS
                    />
                )}
            </AnimatePresence>

            <DeleteModal
                isOpen={isDeleteOpen}
                title="Delete Position"
                message={`Are you sure you want to delete the position "${editData?.name}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={closeModals}
            />
        </div>
    );
};

export default PositionPage;