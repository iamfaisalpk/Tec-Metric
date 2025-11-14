import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import {
    fetchBranches,
    createBranch,
    updateBranch,
    deleteBranch,
    setSearch,
    setPage,
    setLimit,
} from '@/app/redux/slices/branchSlice';

interface Branch {
    _id: string;
    name: string;
    code: string;
    location: string;
    status: 'active' | 'inactive';
    createdAt: string;
}

export const useBranchCRUD = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { branches, loading, error, pagination, search } = useSelector(
        (state: RootState) => state.branch
    );

    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const openCreateModal = () => setIsCreateOpen(true);
    const openEditModal = (branch: Branch) => {
        setSelectedBranch(branch);
        setIsEditOpen(true);
    };
    const openDeleteModal = (branch: Branch) => {
        setSelectedBranch(branch);
        setIsDeleteOpen(true);
    };
    const closeModals = () => {
        setIsCreateOpen(false);
        setIsEditOpen(false);
        setIsDeleteOpen(false);
        setSelectedBranch(null);
    };

    const handleFetchBranches = (page?: number, limit?: number, searchTerm?: string) => {
        dispatch(fetchBranches({ page: page || pagination.page, limit: limit || pagination.limit, search: searchTerm || search }));
    };

    const handleCreateBranch = async (data: Omit<Branch, '_id' | 'createdAt'>) => {
        try {
            await dispatch(createBranch(data)).unwrap();
            closeModals();
            handleFetchBranches();
        } catch (error) {
            console.error('Failed to create branch:', error);
        }
    };

    const handleUpdateBranch = async (data: Partial<Branch>) => {
        if (!selectedBranch) return;
        try {
            await dispatch(updateBranch({ id: selectedBranch._id, data })).unwrap();
            closeModals();
            handleFetchBranches();
        } catch (error) {
            console.error('Failed to update branch:', error);
        }
    };

    const handleDeleteBranch = async () => {
        if (!selectedBranch) return;
        try {
            await dispatch(deleteBranch(selectedBranch._id)).unwrap();
            closeModals();
            handleFetchBranches();
        } catch (error) {
            console.error('Failed to delete branch:', error);
        }
    };

    const handleSearch = (searchTerm: string) => {
        dispatch(setSearch(searchTerm));
        handleFetchBranches(1, pagination.limit, searchTerm);
    };

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
        handleFetchBranches(page);
    };

    const handleLimitChange = (limit: number) => {
        dispatch(setLimit(limit));
        handleFetchBranches(1, limit);
    };

    return {
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
    };
};
