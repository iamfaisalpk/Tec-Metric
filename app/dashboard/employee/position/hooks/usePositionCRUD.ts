import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import {
    fetchPositions,
    createPosition,
    updatePosition,
    deletePosition,
    fetchDepartmentsForDropdown,
    setSearch,
    setPage,
    setLimit,
} from '@/app/redux/slices/positionSlice';

export interface Position {
    _id: string;
    name: string;
    code: string;
    departmentId: string;
    createdAt: string;
    updatedAt?: string;
}

export const usePositionCRUD = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { positions, departments, loading, error, pagination, search } = useSelector(
        (state: RootState) => state.position
    );

    const [editData, setEditData] = useState<Position | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const openCreateModal = () => setIsCreateOpen(true);
    const openEditModal = (position: Position) => {
        setEditData(position);
        setIsEditOpen(true);
    };
    const openDeleteModal = (position: Position) => {
        setEditData(position);
        setIsDeleteOpen(true);
    };
    const closeModals = () => {
        setIsCreateOpen(false);
        setIsEditOpen(false);
        setIsDeleteOpen(false);
        setEditData(null);
    };

    const handleFetchPositions = (page?: number, limit?: number, searchTerm?: string) => {
        dispatch(fetchPositions({ page: page || pagination.page, limit: limit || pagination.limit, search: searchTerm || search }));
    };

    const handleFetchDepartments = () => {
        dispatch(fetchDepartmentsForDropdown());
    };

    const handleCreate = async (data: Omit<Position, '_id' | 'createdAt'>) => {
        try {
            await dispatch(createPosition(data)).unwrap();
            closeModals();
            handleFetchPositions();
        } catch (error) {
            console.error('Failed to create position:', error);
        }
    };

    const handleUpdate = async (data: Partial<Position>) => {
        if (!editData) return;
        try {
            await dispatch(updatePosition({ id: editData._id, data })).unwrap();
            closeModals();
            handleFetchPositions();
        } catch (error) {
            console.error('Failed to update position:', error);
        }
    };

    const handleDelete = async () => {
        if (!editData) return;
        try {
            await dispatch(deletePosition(editData._id)).unwrap();
            closeModals();
            handleFetchPositions();
        } catch (error) {
            console.error('Failed to delete position:', error);
        }
    };

    const handleSearch = (searchTerm: string) => {
        dispatch(setSearch(searchTerm));
        handleFetchPositions(1, pagination.limit, searchTerm);
    };

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
        handleFetchPositions(page);
    };

    const handleLimitChange = (limit: number) => {
        dispatch(setLimit(limit));
        handleFetchPositions(1, limit);
    };

    return {
        positions,
        departments,
        loading,
        error,
        pagination,
        search,
        editData,
        setEditData,
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
    };
};
