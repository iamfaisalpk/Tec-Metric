'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import PositionTable from './components/PositionTable';
import PositionForm from './components/PositionForm';
import DeleteModal from '../../common/components/DeleteModal';
import {
    fetchPositions,
    fetchDepartmentsForDropdown,
    setSearch,
    setPage,
    setLimit,
    createPosition,
    updatePosition,
    deletePosition,
} from '@/app/redux/slices/positionSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import type { Position } from '@/app/redux/slices/positionSlice';

const PositionPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        positions,
        departments,
        loading,
        error,
        pagination,
        search,
    } = useSelector((state: RootState) => state.position);

    const [isCreateOpen, setIsCreateOpen] = React.useState(false);
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
    const [editData, setEditData] = React.useState<Position | null>(null);

    useEffect(() => {
        dispatch(fetchPositions({ page: pagination.page, limit: pagination.limit, search }));
        dispatch(fetchDepartmentsForDropdown());
    }, [dispatch, pagination.page, pagination.limit, search]);

    const handleSearch = (term: string) => {
        dispatch(setSearch(term));
        dispatch(setPage(1));
    };

    const openCreateModal = () => setIsCreateOpen(true);
    const openEditModal = (pos: Position) => {
        setEditData(pos);
        setIsEditOpen(true);
    };
    const openDeleteModal = (pos: Position) => {
        setEditData(pos);
        setIsDeleteOpen(true);
    };
    const closeModals = () => {
        setIsCreateOpen(false);
        setIsEditOpen(false);
        setIsDeleteOpen(false);
        setEditData(null);
    };

    // Real CRUD handlers (connected to backend!)
    const handleCreate = async (data: Omit<Position, '_id' | 'createdAt'>) => {
        await dispatch(createPosition(data));
        closeModals();
    };

    const handleUpdate = async (data: Partial<Position>) => {
        if (editData) {
            await dispatch(updatePosition({ id: editData._id, data }));
            closeModals();
        }
    };

    const handleDelete = async () => {
        if (editData) {
            await dispatch(deletePosition(editData._id));
            closeModals();
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
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
                onPageChange={(p) => dispatch(setPage(p))}
                onLimitChange={(l) => dispatch(setLimit(l))}
                onAdd={openCreateModal}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
            />

            <AnimatePresence mode="wait">
                {isCreateOpen && (
                    <PositionForm
                        key="create"
                        isOpen={isCreateOpen}
                        onClose={closeModals}
                        onSubmit={handleCreate}
                        isEdit={false}
                        departments={departments}
                        positions={positions}
                    />
                )}
                {isEditOpen && editData && (
                    <PositionForm
                        key="edit"
                        isOpen={isEditOpen}
                        onClose={closeModals}
                        onSubmit={handleUpdate}
                        editData={editData}
                        isEdit={true}
                        departments={departments}
                        positions={positions}
                    />
                )}
            </AnimatePresence>

            <DeleteModal
                isOpen={isDeleteOpen}
                title="Delete Position"
                message={`Are you sure you want to delete "${editData?.name}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={closeModals}
            />
        </div>
    );
};

export default PositionPage;