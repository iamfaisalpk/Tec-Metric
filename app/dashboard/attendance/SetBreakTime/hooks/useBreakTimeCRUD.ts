import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import {
    fetchBreakTimes,
    createBreakTime,
    updateBreakTime,
    deleteBreakTime,
    setFilters,
    clearFilters,
    setSearch,
    setPage,
    setLimit,
} from '@/app/redux/slices/breakTimeSlice';
import { BreakTime, BreakTimeFormData } from '../types/breakTimeTypes';

export const useBreakTimeCRUD = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { breakTimes, loading, error, pagination, filters, search } = useSelector(
        (state: RootState) => state.break as any
    );

    const [selectedBreakTime, setSelectedBreakTime] = useState<BreakTime | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const openCreateModal = () => setIsCreateOpen(true);
    const openEditModal = (breakTime: BreakTime) => {
        setSelectedBreakTime(breakTime);
        setIsEditOpen(true);
    };
    const openDeleteModal = (breakTime: BreakTime) => {
        setSelectedBreakTime(breakTime);
        setIsDeleteOpen(true);
    };
    const closeModals = () => {
        setIsCreateOpen(false);
        setIsEditOpen(false);
        setIsDeleteOpen(false);
        setSelectedBreakTime(null);
    };

    const loadBreakTimes = useCallback((page?: number, limit?: number, searchTerm?: string) => {
        dispatch(
            fetchBreakTimes({
                page: page ?? pagination.page,
                limit: limit ?? pagination.limit,
                search: searchTerm ?? search,
                filters,
            })
        );
    }, [dispatch, pagination.page, pagination.limit, search, filters]);

    const handleCreate = async (data: BreakTimeFormData) => {
        try {
            await dispatch(createBreakTime(data)).unwrap();
            closeModals();
            loadBreakTimes();
        } catch (error) {
            console.error('Failed to create break time:', error);
        }
    };

    const handleUpdate = async (data: Partial<BreakTimeFormData>) => {
        if (!selectedBreakTime?._id) return;
        try {
            await dispatch(updateBreakTime({ id: selectedBreakTime._id, data })).unwrap();
            closeModals();
            loadBreakTimes();
        } catch (error) {
            console.error('Failed to update break time:', error);
        }
    };

    const handleDelete = async () => {
        if (!selectedBreakTime?._id) return;
        try {
            await dispatch(deleteBreakTime(selectedBreakTime._id)).unwrap();
            closeModals();
            loadBreakTimes();
        } catch (error) {
            console.error('Failed to delete break time:', error);
        }
    };

    const handleSearch = (searchTerm: string) => {
        dispatch(setSearch(searchTerm));
        loadBreakTimes(1, pagination.limit, searchTerm);
    };

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
        loadBreakTimes(page);
    };

    const handleLimitChange = (limit: number) => {
        dispatch(setLimit(limit));
        loadBreakTimes(1, limit);
    };

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        dispatch(setFilters(newFilters));
        loadBreakTimes(1, pagination.limit);
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
        loadBreakTimes(1, pagination.limit);
    };

    return {
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
    };
};
