import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import {
    fetchDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    setSearch,
    setPage,
    setLimit,
} from '@/app/redux/slices/departmentSlice';

export interface Department {
    _id: string;
    name: string;
    code: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export const useDepartmentCRUD = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { departments, loading, error, pagination, search } = useSelector(
        (state: RootState) => state.department
    );

    const [editData, setEditData] = useState<Department | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const openCreateModal = () => setIsCreateOpen(true);
    const openEditModal = (department: Department) => {
        setEditData(department);
        setIsEditOpen(true);
    };
    const openDeleteModal = (department: Department) => {
        setEditData(department);
        setIsDeleteOpen(true);
    };
    const closeModals = () => {
        setIsCreateOpen(false);
        setIsEditOpen(false);
        setIsDeleteOpen(false);
        setEditData(null);
    };

    const handleFetchDepartments = (page?: number, limit?: number, searchTerm?: string) => {
        dispatch(fetchDepartments({ page: page || pagination.page, limit: limit || pagination.limit, search: searchTerm || search }));
    };

    const handleCreate = async (data: Omit<Department, '_id' | 'createdAt' | 'updatedAt'>) => {
        try {
            await dispatch(createDepartment(data)).unwrap();
            closeModals();
            handleFetchDepartments();
        } catch (error) {
            console.error('Failed to create department:', error);
        }
    };

    const handleUpdate = async (data: Partial<Department>) => {
        if (!editData) return;
        try {
            await dispatch(updateDepartment({ id: editData._id, data })).unwrap();
            closeModals();
            handleFetchDepartments();
        } catch (error) {
            console.error('Failed to update department:', error);
        }
    };

    const handleDelete = async () => {
        if (!editData) return;
        try {
            await dispatch(deleteDepartment(editData._id)).unwrap();
            closeModals();
            handleFetchDepartments();
        } catch (error) {
            console.error('Failed to delete department:', error);
        }
    };

    const handleSearch = (searchTerm: string) => {
        dispatch(setSearch(searchTerm));
        handleFetchDepartments(1, pagination.limit, searchTerm);
    };

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
        handleFetchDepartments(page);
    };

    const handleLimitChange = (limit: number) => {
        dispatch(setLimit(limit));
        handleFetchDepartments(1, limit);
    };

    return {
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
        handleFetchDepartments,
        handleSearch,
        handlePageChange,
        handleLimitChange,
    };
};
