import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import {
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    setFilters,
    clearFilters,
    setSearch,
    setPage,
    setLimit,
} from '@/app/redux/slices/employeeSlice';

export interface Employee {
    _id: string;
    employeeId: string;
    name: string;
    branch: string;
    department: string;
    position: string;
    gender: string;
    createdBy: string;
    createdAt: string;
    updatedAt?: string;
    // Optional: Add all other fields used in FormData
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    phone?: string;
    phoneOptional?: string;
    email?: string;
    nationality?: string;
    fatherName?: string;
    motherName?: string;
    qualification?: string;
    fieldOfStudy?: string;
    maritalStatus?: string;
    residentialAddress?: string;
    superior?: string;
    dateOfJoin?: string;
    salary?: string;
    verifyMode?: string;
    cardNo?: string;
    enrollDevice?: string;
    plmQty?: string;
    devicePrivilege?: string;
    pin?: string;
    fpQty?: string;
    faceQty?: string;
    documents?: Array<{
        name: string;
        file: File | null;
        type: string;
    }>;
}

export const useEmployeeCRUD = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { employees, loading, error, pagination, filters, search } = useSelector(
        (state: RootState) => state.employee
    );

    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const openCreateModal = () => setIsCreateOpen(true);
    const openEditModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsEditOpen(true);
    };
    const openDeleteModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsDeleteOpen(true);
    };
    const closeModals = () => {
        setIsCreateOpen(false);
        setIsEditOpen(false);
        setIsDeleteOpen(false);
        setSelectedEmployee(null);
    };

    const loadEmployees = useCallback((page?: number, limit?: number, searchTerm?: string) => {
        dispatch(
            fetchEmployees({
                page: page ?? pagination.page,
                limit: limit ?? pagination.limit,
                search: searchTerm ?? search,
                filters,
            })
        );
    }, [dispatch, pagination.page, pagination.limit, search, filters]);

    const handleCreate = async (data: Omit<Employee, '_id' | 'createdAt'>) => {
        try {
            await dispatch(createEmployee(data)).unwrap();
            closeModals();
            loadEmployees();
        } catch (error) {
            console.error('Failed to create employee:', error);
        }
    };

    const handleUpdate = async (data: Partial<Employee>) => {
        if (!selectedEmployee?._id) return;
        try {
            await dispatch(updateEmployee({ id: selectedEmployee._id, data })).unwrap();
            closeModals();
            loadEmployees();
        } catch (error) {
            console.error('Failed to update employee:', error);
        }
    };

    const handleDelete = async () => {
        if (!selectedEmployee?._id) return;
        try {
            await dispatch(deleteEmployee(selectedEmployee._id)).unwrap();
            closeModals();
            loadEmployees();
        } catch (error) {
            console.error('Failed to delete employee:', error);
        }
    };

    const handleSearch = (searchTerm: string) => {
        dispatch(setSearch(searchTerm));
        loadEmployees(1, pagination.limit, searchTerm);
    };

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
        loadEmployees(page);
    };

    const handleLimitChange = (limit: number) => {
        dispatch(setLimit(limit));
        loadEmployees(1, limit);
    };

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        dispatch(setFilters(newFilters));
        loadEmployees(1, pagination.limit);
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
        loadEmployees(1, pagination.limit);
    };

    return {
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
    };
};