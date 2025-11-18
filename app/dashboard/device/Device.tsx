'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useCallback } from 'react';
import { useDeviceCRUD } from './hooks/useDeviceCRUD';
import DeviceActions from './DeviceActions';
import DeviceTable from './DeviceTable';
import DeviceForm from './DeviceForm';
import DeleteModal from '../common/components/DeleteModal';
import type { Device, DeviceFormData } from './types/deviceTypes';

const Device: React.FC = () => {
    const {
        devices,
        loading,
        error,
        pagination,
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
        search,
        handlePageChange,
        handleLimitChange,
    } = useDeviceCRUD();

    const loadDevicesStable = useCallback(() => loadDevices(), [loadDevices]);

    useEffect(() => {
        loadDevicesStable();
    }, [loadDevicesStable]);

    // Fixed: No more 'any'
    const handleView = (device: Device) => {
        console.log('View device:', device);
    };

    // Fixed: createdBy is now allowed via type augmentation or backend handles it
    const onCreateSubmit = async (data: DeviceFormData) => {
        // If DeviceFormData doesn't have createdBy, remove it or extend the type
        await handleCreate(data);
    };

    const editFormData: Partial<DeviceFormData> | undefined = selectedDevice
        ? {
            deviceName: selectedDevice.deviceName,
            attendanceDevice: selectedDevice.attendanceDevice,
            deviceIP: selectedDevice.deviceIP,
            registrationDevice: selectedDevice.registrationDevice,
            serialNo: selectedDevice.serialNo,
            requestMethod: selectedDevice.requestMethod,
            timeZone: selectedDevice.timeZone,
            transferMode: selectedDevice.transferMode,
        }
        : undefined;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-4 py-8 max-w-7xl"
        >
            <DeviceActions onAdd={openCreateModal} />

            <DeviceTable
                devices={devices}
                loading={loading}
                pagination={pagination}
                searchQuery={search || ''}
                onSearch={handleSearch}
                onEdit={openEditModal}
                onView={handleView}
                onDelete={openDeleteModal}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
            />

            <DeviceForm isOpen={isCreateOpen} onClose={closeModals} onSubmit={onCreateSubmit} isEdit={false} />
            <DeviceForm isOpen={isEditOpen} onClose={closeModals} onSubmit={handleUpdate} editData={editFormData} isEdit={true} />

            {isDeleteOpen && selectedDevice && (
                <DeleteModal
                    isOpen={isDeleteOpen}
                    title="Delete Device"
                    message={`Are you sure you want to delete "${selectedDevice.deviceName}"?`}
                    onConfirm={handleDelete}
                    onCancel={closeModals}
                />
            )}

            {error && (
                <motion.div className="mt-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded-xl">
                    {error}
                </motion.div>
            )}
        </motion.div>
    );
};

export default Device;