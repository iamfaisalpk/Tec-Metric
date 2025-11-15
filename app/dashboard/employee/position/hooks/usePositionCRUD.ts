// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../../../redux/store';
// import {
//     fetchPositions,
//     createPosition,
//     updatePosition,
//     deletePosition,
//     fetchDepartmentsForDropdown,
//     setSearch,
//     setPage,
//     setLimit,
// } from '@/app/redux/slices/positionSlice';

// export interface Position {
//     _id: string;
//     name: string;
//     code: string;
//     departmentId: string;
//     createdAt: string;
//     updatedAt?: string;
// }

// export const usePositionCRUD = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { positions, departments, loading, error, pagination, search } = useSelector(
//         (state: RootState) => state.position
//     );

//     const [editData, setEditData] = useState<Position | null>(null);
//     const [isCreateOpen, setIsCreateOpen] = useState(false);
//     const [isEditOpen, setIsEditOpen] = useState(false);
//     const [isDeleteOpen, setIsDeleteOpen] = useState(false);

//     const openCreateModal = () => setIsCreateOpen(true);
//     const openEditModal = (position: Position) => {
//         setEditData(position);
//         setIsEditOpen(true);
//     };
//     const openDeleteModal = (position: Position) => {
//         setEditData(position);
//         setIsDeleteOpen(true);
//     };
//     const closeModals = () => {
//         setIsCreateOpen(false);
//         setIsEditOpen(false);
//         setIsDeleteOpen(false);
//         setEditData(null);
//     };

//     const handleFetchPositions = (page?: number, limit?: number, searchTerm?: string) => {
//         dispatch(fetchPositions({ page: page || pagination.page, limit: limit || pagination.limit, search: searchTerm || search }));
//     };

//     const handleFetchDepartments = () => {
//         dispatch(fetchDepartmentsForDropdown());
//     };

//     const handleCreate = async (data: Omit<Position, '_id' | 'createdAt'>) => {
//         try {
//             await dispatch(createPosition(data)).unwrap();
//             closeModals();
//             handleFetchPositions();
//         } catch (error) {
//             console.error('Failed to create position:', error);
//         }
//     };

//     const handleUpdate = async (data: Partial<Position>) => {
//         if (!editData) return;
//         try {
//             await dispatch(updatePosition({ id: editData._id, data })).unwrap();
//             closeModals();
//             handleFetchPositions();
//         } catch (error) {
//             console.error('Failed to update position:', error);
//         }
//     };

//     const handleDelete = async () => {
//         if (!editData) return;
//         try {
//             await dispatch(deletePosition(editData._id)).unwrap();
//             closeModals();
//             handleFetchPositions();
//         } catch (error) {
//             console.error('Failed to delete position:', error);
//         }
//     };

//     const handleSearch = (searchTerm: string) => {
//         dispatch(setSearch(searchTerm));
//         handleFetchPositions(1, pagination.limit, searchTerm);
//     };

//     const handlePageChange = (page: number) => {
//         dispatch(setPage(page));
//         handleFetchPositions(page);
//     };

//     const handleLimitChange = (limit: number) => {
//         dispatch(setLimit(limit));
//         handleFetchPositions(1, limit);
//     };

//     return {
//         positions,
//         departments,
//         loading,
//         error,
//         pagination,
//         search,
//         editData,
//         setEditData,
//         isCreateOpen,
//         isEditOpen,
//         isDeleteOpen,
//         openCreateModal,
//         openEditModal,
//         openDeleteModal,
//         closeModals,
//         handleCreate,
//         handleUpdate,
//         handleDelete,
//         handleFetchPositions,
//         handleFetchDepartments,
//         handleSearch,
//         handlePageChange,
//         handleLimitChange,
//     };
// };






'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

export interface Position {
    _id: string;
    name: string;
    code: string;
    departmentId: string;
    createdAt: string;
    updatedAt?: string;
    superiorId?: string;
}

export interface Department {
    _id: string;
    name: string;
    code: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
}

const MOCK_DEPARTMENTS: Department[] = [
    { _id: 'dept1', name: 'Engineering', code: 'ENG' },
    { _id: 'dept2', name: 'Human Resources', code: 'HR' },
    { _id: 'dept3', name: 'Finance', code: 'FIN' },
    { _id: 'dept4', name: 'Marketing', code: 'MKT' },
];

const STORAGE_KEY = 'positions_mock_data';

export const usePositionCRUD = () => {
    const [positions, setPositions] = useState<Position[]>([]);
    const [departments] = useState<Department[]>(MOCK_DEPARTMENTS);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0 });

    const [isCreateOpen, setIsCreateOpen] = useState(false); // ← Fixed: isState → useState
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editData, setEditData] = useState<Position | null>(null);

    // Load from localStorage
    useEffect(() => {
        const loadData = () => {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                const data = saved ? JSON.parse(saved) : generateSampleData();
                setPositions(data);
                setPagination(prev => ({ ...prev, total: data.length }));
            } catch {
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Save to localStorage
    const saveToStorage = useCallback((data: Position[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, []);

    // Generate sample data
    const generateSampleData = (): Position[] => {
        return [
            {
                _id: '1',
                name: 'Senior Software Engineer',
                code: 'SE001',
                departmentId: 'dept1',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                _id: '2',
                name: 'HR Manager',
                code: 'HR001',
                departmentId: 'dept2',
                createdAt: new Date().toISOString(),
            },
            {
                _id: '3',
                name: 'Finance Analyst',
                code: 'FIN001',
                departmentId: 'dept3',
                createdAt: new Date().toISOString(),
            },
        ];
    };

    // Filtered & Paginated
    const filteredPositions = useMemo(() => {
        let filtered = positions;

        if (search) {
            const term = search.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(term) ||
                p.code.toLowerCase().includes(term)
            );
        }

        const total = filtered.length;
        const start = (pagination.page - 1) * pagination.limit;
        const end = start + pagination.limit;

        return {
            data: filtered.slice(start, end),
            total,
        };
    }, [positions, search, pagination.page, pagination.limit]);

    useEffect(() => {
        setPagination(prev => ({ ...prev, total: filteredPositions.total }));
    }, [filteredPositions.total]);

    const handleCreate = useCallback((data: Omit<Position, '_id' | 'createdAt'>) => {
        const newPos: Position = {
            ...data,
            _id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const updated = [...positions, newPos];
        setPositions(updated);
        saveToStorage(updated);
        setIsCreateOpen(false); // ← Fixed dependency
    }, [positions, saveToStorage, setIsCreateOpen]); // ← Added

    const handleUpdate = useCallback((data: Partial<Position>) => {
        if (!editData) return;
        const updated = positions.map(p =>
            p._id === editData._id
                ? { ...p, ...data, updatedAt: new Date().toISOString() }
                : p
        );
        setPositions(updated);
        saveToStorage(updated);
        setIsEditOpen(false);
        setEditData(null);
    }, [editData, positions, saveToStorage]);

    const handleDelete = useCallback(() => {
        if (!editData) return;
        const updated = positions.filter(p => p._id !== editData._id);
        setPositions(updated);
        saveToStorage(updated);
        setIsDeleteOpen(false);
        setEditData(null);
    }, [editData, positions, saveToStorage]);

    const handleSearch = useCallback((term: string) => {
        setSearch(term);
        setPagination(prev => ({ ...prev, page: 1 }));
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setPagination(prev => ({ ...prev, page }));
    }, []);

    const handleLimitChange = useCallback((limit: number) => {
        setPagination(prev => ({ ...prev, limit, page: 1 }));
    }, []);

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

    // Mock fetch functions (no API)
    const handleFetchPositions = () => {};
    const handleFetchDepartments = () => {};

    return {
        positions: filteredPositions.data,
        departments,
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
        handleSearch,
        handlePageChange,
        handleLimitChange,
        handleFetchPositions,
        handleFetchDepartments,
    };
};