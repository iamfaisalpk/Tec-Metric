import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import {
    fetchDocumentTypes,
    createDocumentType,
    updateDocumentType,
    deleteDocumentType,
    setSearch,
    setPage,
    setLimit,
} from '@/app/redux/slices/documentTypeSlice';

export interface DocumentType {
    _id: string;
    name: string;
    code: string;
    branch: string;
    department: string;
    departmentName: string;
    createdAt: string;
    updatedAt: string;
}

export const useDocumentTypeCRUD = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { documentTypes, loading, error, pagination, search } = useSelector(
        (state: RootState) => state.documentType
    );

    const [editData, setEditData] = useState<DocumentType | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const openCreateModal = () => setIsCreateOpen(true);
    const openEditModal = (documentType: DocumentType) => {
        setEditData(documentType);
        setIsEditOpen(true);
    };
    const openDeleteModal = (documentType: DocumentType) => {
        setEditData(documentType);
        setIsDeleteOpen(true);
    };
    const closeModals = () => {
        setIsCreateOpen(false);
        setIsEditOpen(false);
        setIsDeleteOpen(false);
        setEditData(null);
    };

    const handleFetchDocumentTypes = (page?: number, limit?: number, searchTerm?: string) => {
        dispatch(fetchDocumentTypes({ page: page || pagination.page, limit: limit || pagination.limit, search: searchTerm || search }));
    };

    const handleCreate = async (data: { branch: string; department: string; documentTypes: string[] }) => {
        try {
            await dispatch(createDocumentType(data)).unwrap();
            closeModals();
            handleFetchDocumentTypes();
        } catch (error) {
            console.error('Failed to create document type:', error);
        }
    };

    const handleUpdate = async (data: { branch: string; department: string; documentTypes: string[] }) => {
        if (!editData) return;
        try {
            await dispatch(updateDocumentType({ id: editData._id, data })).unwrap();
            closeModals();
            handleFetchDocumentTypes();
        } catch (error) {
            console.error('Failed to update document type:', error);
        }
    };

    const handleDelete = async () => {
        if (!editData) return;
        try {
            await dispatch(deleteDocumentType(editData._id)).unwrap();
            closeModals();
            handleFetchDocumentTypes();
        } catch (error) {
            console.error('Failed to delete document type:', error);
        }
    };

    const handleSearch = (searchTerm: string) => {
        dispatch(setSearch(searchTerm));
        handleFetchDocumentTypes(1, pagination.limit, searchTerm);
    };

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
        handleFetchDocumentTypes(page);
    };

    const handleLimitChange = (limit: number) => {
        dispatch(setLimit(limit));
        handleFetchDocumentTypes(1, limit);
    };

    return {
        documentTypes,
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
        handleFetchDocumentTypes,
        handleSearch,
        handlePageChange,
        handleLimitChange,
    };
};
