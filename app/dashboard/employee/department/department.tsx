'use client';
import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useDepartmentCRUD } from './hooks/useDepartmentCRUD';
import DepartmentTable from './components/DepartmentTable';
import DepartmentForm from './components/DepartmentForm';
import DeleteModal from '../../common/components/DeleteModal';
import { NetworkIcon } from 'lucide-react';

const DepartmentPage: React.FC = () => {
    const {
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
        handleFetchDepartments,
        handleSearch,
        handlePageChange,
        handleLimitChange,
    } = useDepartmentCRUD();

    useEffect(() => {
        handleFetchDepartments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-end">
                <div className="flex flex-col items-center">
                    <button
                        onClick={openCreateModal}
                        className="flex flex-col items-center gap-1 px-4 py-5 cursor-pointer bg-primary text-white rounded-3xl font-medium hover:bg-blue-700 transition-colors shadow-lg"
                        title="Add Department"
                    >
                        <NetworkIcon className="w-8 h-8" />
                    </button>
                    <span className="text-primary font-bold text-center">Add Department</span>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <DepartmentTable
                departments={departments}
                loading={loading}
                pagination={pagination}
                search={search}
                onSearch={handleSearch}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
            />

            {/* WRAP FORMS IN AnimatePresence */}
            <AnimatePresence mode="wait">
                {isCreateOpen && (
                    <DepartmentForm
                        key="create-form"
                        isOpen={isCreateOpen}
                        onClose={closeModals}
                        onSubmit={handleCreate}
                        isEdit={false}
                    />
                )}
                {isEditOpen && (
                    <DepartmentForm
                        key="edit-form"
                        isOpen={isEditOpen}
                        onClose={closeModals}
                        onSubmit={handleUpdate}
                        editData={editData}
                        isEdit={true}
                    />
                )}
            </AnimatePresence>

            <DeleteModal
                isOpen={isDeleteOpen}
                title="Delete Department"
                message={`Are you sure you want to delete the department "${editData?.name}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={closeModals}
            />
        </div>
    );
};

export default DepartmentPage;