'use client';

import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDocumentTypeCRUD } from './hooks/useDocumentTypeCRUD';
import DocumentTypeTable from './components/DocumentTypeTable';
import DocumentTypeForm from './components/DocumentTypeForm';
import DocumentTypeActions from './components/DocumentTypeActions';
import DeleteModal from '../../common/components/DeleteModal';

export default function DocumentType() {
    const {
        documentTypes,
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
        handleFetchDocumentTypes,
        handleSearch,
        handlePageChange,
        handleLimitChange,
    } = useDocumentTypeCRUD();

    useEffect(() => {
        handleFetchDocumentTypes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Transform editData for the form
    const editFormData = editData ? {
        branch: editData.branch,
        department: editData.department,
        documentTypes: [editData.name],
    } : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="container mx-auto px-4 py-8"
        >
            <DocumentTypeActions
                onAdd={openCreateModal}
            />

            <DocumentTypeTable
                documentTypes={documentTypes}
                loading={loading}
                pagination={pagination}
                search={search}
                onSearch={handleSearch}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
            />

            {/* Create Modal */}
            <AnimateModal isOpen={isCreateOpen} title="Add New Document Type" onClose={closeModals}>
                <DocumentTypeForm
                    isOpen={isCreateOpen}
                    onClose={closeModals}
                    onSubmit={handleCreate}
                    isEdit={false}
                />
            </AnimateModal>

            {/* Edit Modal */}
            <AnimateModal isOpen={isEditOpen} title="Edit Document Type" onClose={closeModals}>
                {editFormData && (
                    <DocumentTypeForm
                        isOpen={isEditOpen}
                        onClose={closeModals}
                        onSubmit={handleUpdate}
                        editData={editFormData}
                        isEdit={true}
                    />
                )}
            </AnimateModal>

            {/* Delete Modal */}
            {isDeleteOpen && editData && (
                <DeleteModal
                    isOpen={isDeleteOpen}
                    title="Delete Document Type"
                    message={`Are you sure you want to delete "${editData.name}"?`}
                    onConfirm={handleDelete}
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
