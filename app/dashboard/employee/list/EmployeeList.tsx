'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useCallback } from 'react';
import { useEmployeeCRUD } from './hooks/useEmployeeCRUD';
import EmployeeFilters from './components/EmployeeFilters';
import EmployeeTable from './components/EmployeeTable';
import EmployeeForm from './components/EmployeeForm';
import DeleteModal from '../../common/components/DeleteModal';
import type { FormData } from './components/EmployeeForm';

const normalizeDocuments = (
    docs: FormData['documents']
): { name: string; file: File | null; type: string }[] | undefined => {
    if (!docs || docs.length === 0) return undefined;
    return docs
        .filter((d) => d.name && d.type)
        .map((d) => ({
            name: d.name,
            type: d.type,
            file: d.file ?? null,
        }));
};

export default function EmployeeList() {
    const {
        employees,
        loading,
        error,
        pagination,
        filters,
        search,
        selectedEmployee,
        isCreateOpen,
        isEditOpen,
        isDeleteOpen,
        openCreateModal,
        openEditModal,
        openDeleteModal,
        closeModals,
        loadEmployees,
        handleCreate,
        handleUpdate,
        handleDelete,
        handleSearch,
        handlePageChange,
        handleLimitChange,
        handleFilterChange,
        handleClearFilters,
    } = useEmployeeCRUD();

    const loadEmployeesStable = useCallback(() => {
        loadEmployees();
    }, [loadEmployees]);

    useEffect(() => {
        loadEmployeesStable();
    }, [loadEmployeesStable]);

    const handleView = (employee: typeof selectedEmployee) => {
        console.log('View employee:', employee);
    };

    // Convert FormData → Employee (create)
    const onCreateSubmit = async (data: FormData) => {
        const employeeData: Omit<import('./hooks/useEmployeeCRUD').Employee, '_id' | 'createdAt'> = {
            ...data,
            name: `${data.firstName} ${data.lastName}`,
            createdBy: 'admin',
            documents: normalizeDocuments(data.documents),
        };
        await handleCreate(employeeData);
    };

    // Convert FormData → Employee (update)
    const onUpdateSubmit = async (data: FormData) => {
        if (!selectedEmployee?._id) return;
        const employeeData: Partial<import('./hooks/useEmployeeCRUD').Employee> = {
            ...data,
            name: `${data.firstName} ${data.lastName}`,
            documents: normalizeDocuments(data.documents),
        };
        await handleUpdate(employeeData);
    };

    // Convert Employee → FormData (edit mode)
    const editFormData: Partial<FormData> | undefined = selectedEmployee
        ? {
            employeeId: selectedEmployee.employeeId,
            firstName: selectedEmployee.name.split(' ')[0] ?? '',
            lastName: selectedEmployee.name.split(' ').slice(1).join(' ') ?? '',
            gender: selectedEmployee.gender,
            dateOfBirth: selectedEmployee.dateOfBirth,
            phone: selectedEmployee.phone,
            phoneOptional: selectedEmployee.phoneOptional,
            email: selectedEmployee.email,
            nationality: selectedEmployee.nationality,
            fatherName: selectedEmployee.fatherName,
            motherName: selectedEmployee.motherName,
            qualification: selectedEmployee.qualification,
            fieldOfStudy: selectedEmployee.fieldOfStudy,
            maritalStatus: selectedEmployee.maritalStatus,
            residentialAddress: selectedEmployee.residentialAddress,
            branch: selectedEmployee.branch,
            department: selectedEmployee.department,
            position: selectedEmployee.position,
            superior: selectedEmployee.superior,
            dateOfJoin: selectedEmployee.dateOfJoin,
            salary: selectedEmployee.salary,
            verifyMode: selectedEmployee.verifyMode,
            cardNo: selectedEmployee.cardNo,
            enrollDevice: selectedEmployee.enrollDevice,
            plmQty: selectedEmployee.plmQty,
            devicePrivilege: selectedEmployee.devicePrivilege,
            pin: selectedEmployee.pin,
            fpQty: selectedEmployee.fpQty,
            faceQty: selectedEmployee.faceQty,
            documents: selectedEmployee.documents?.map((d) => ({
                ...d,
                file: d.file ?? null,
            })),
        }
        : undefined;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="container mx-auto px-4 py-8"
        >

            <EmployeeFilters
                filters={filters}
                search={search}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                onSearch={handleSearch}
                onAdd={openCreateModal}
            />

            <EmployeeTable
                employees={employees}
                loading={loading}
                pagination={pagination}
                // onAdd={openCreateModal}
                onEdit={openEditModal}
                onView={handleView}
                onDelete={openDeleteModal}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
            />

            <EmployeeForm isOpen={isCreateOpen} onClose={closeModals} onSubmit={onCreateSubmit} isEdit={false} />
            <EmployeeForm isOpen={isEditOpen} onClose={closeModals} onSubmit={onUpdateSubmit} editData={editFormData} isEdit={true} />

            {isDeleteOpen && selectedEmployee && (
                <DeleteModal
                    isOpen={isDeleteOpen}
                    title="Delete Employee"
                    message={`Are you sure you want to delete "${selectedEmployee.name}"?`}
                    onConfirm={handleDelete}
                    onCancel={closeModals}
                />
            )}

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