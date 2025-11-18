import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import {
    fetchDevices,
    createDevice,
    updateDevice,
    deleteDevice,
    setFilters,
    clearFilters,
    setSearch,
    setPage,
    setLimit,
} from '@/app/redux/slices/deviceSlice';
import { Device, DeviceFormData } from '../types/deviceTypes';

export const useDeviceCRUD = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { devices, loading, error, pagination, filters, search } = useSelector(
        (state: RootState) => state.device
    );

    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const openCreateModal = () => setIsCreateOpen(true);
    const openEditModal = (device: Device) => {
        setSelectedDevice(device);
        setIsEditOpen(true);
    };
    const openDeleteModal = (device: Device) => {
        setSelectedDevice(device);
        setIsDeleteOpen(true);
    };
    const closeModals = () => {
        setIsCreateOpen(false);
        setIsEditOpen(false);
        setIsDeleteOpen(false);
        setSelectedDevice(null);
    };

    const loadDevices = useCallback((page?: number, limit?: number, searchTerm?: string) => {
        dispatch(
            fetchDevices({
                page: page ?? pagination.page,
                limit: limit ?? pagination.limit,
                search: searchTerm ?? search,
                filters,
            })
        );
    }, [dispatch, pagination.page, pagination.limit, search, filters]);

    const handleCreate = async (data: DeviceFormData) => {
        try {
            await dispatch(createDevice(data)).unwrap();
            closeModals();
            loadDevices();
        } catch (error) {
            console.error('Failed to create device:', error);
        }
    };

    const handleUpdate = async (data: Partial<DeviceFormData>) => {
        if (!selectedDevice?._id) return;
        try {
            await dispatch(updateDevice({ id: selectedDevice._id, data })).unwrap();
            closeModals();
            loadDevices();
        } catch (error) {
            console.error('Failed to update device:', error);
        }
    };

    const handleDelete = async () => {
        if (!selectedDevice?._id) return;
        try {
            await dispatch(deleteDevice(selectedDevice._id)).unwrap();
            closeModals();
            loadDevices();
        } catch (error) {
            console.error('Failed to delete device:', error);
        }
    };

    const handleSearch = (searchTerm: string) => {
        dispatch(setSearch(searchTerm));
        loadDevices(1, pagination.limit, searchTerm);
    };

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
        loadDevices(page);
    };

    const handleLimitChange = (limit: number) => {
        dispatch(setLimit(limit));
        loadDevices(1, limit);
    };

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        dispatch(setFilters(newFilters));
        loadDevices(1, pagination.limit);
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
        loadDevices(1, pagination.limit);
    };

    return {
        devices,
        loading,
        error,
        pagination,
        filters,
        search,
        selectedDevice,
        isCreateOpen,
        isEditOpen,
        isDeleteOpen,
        openCreateModal,
        openEditModal,
        openDeleteModal,
        closeModals,
        loadDevices,
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
