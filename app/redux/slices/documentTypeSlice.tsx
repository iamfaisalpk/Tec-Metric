import axiosInstance from '@/app/lib/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface DocumentType {
    _id: string;
    name: string;
    code: string;
    branch: string;
    department: string;
    departmentName: string;
    createdAt: string;
    updatedAt: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
}

interface DocumentTypeState {
    documentTypes: DocumentType[];
    loading: boolean;
    error: string | null;
    pagination: Pagination;
    search: string;
}

export const fetchDocumentTypes = createAsyncThunk(
    'documentType/fetchDocumentTypes',
    async ({ page, limit, search }: { page: number; limit: number; search: string }) => {
        const response = await axiosInstance.get('/document-type', { params: { page, limit, search } });
        return response.data;
    }
);

export const createDocumentType = createAsyncThunk(
    'documentType/createDocumentType',
    async (data: { branch: string; department: string; documentTypes: string[] }) => {
        const response = await axiosInstance.post('/document-type', data);
        return response.data;
    }
);

export const updateDocumentType = createAsyncThunk(
    'documentType/updateDocumentType',
    async ({ id, data }: { id: string; data: { branch: string; department: string; documentTypes: string[] } }) => {
        const response = await axiosInstance.patch(`/document-type/${id}`, data);
        return response.data;
    }
);

export const deleteDocumentType = createAsyncThunk(
    'documentType/deleteDocumentType',
    async (id: string) => {
        await axiosInstance.delete(`/document-type/${id}`);
        return id;
    }
);

const initialState: DocumentTypeState = {
    documentTypes: [],
    loading: false,
    error: null,
    pagination: { page: 1, limit: 10, total: 0 },
    search: '',
};

const documentTypeSlice = createSlice({
    name: 'documentType',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setPage: (state, action) => {
            state.pagination.page = action.payload;
        },
        setLimit: (state, action) => {
            state.pagination.limit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDocumentTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDocumentTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.documentTypes = action.payload.documentTypes;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchDocumentTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch document types';
            })
            .addCase(createDocumentType.fulfilled, (state, action) => {
                state.documentTypes.push(...action.payload);
            })
            .addCase(updateDocumentType.fulfilled, (state, action) => {
                const index = state.documentTypes.findIndex((d) => d._id === action.payload._id);
                if (index !== -1) state.documentTypes[index] = action.payload;
            })
            .addCase(deleteDocumentType.fulfilled, (state, action) => {
                state.documentTypes = state.documentTypes.filter((d) => d._id !== action.payload);
            });
    },
});

export const { setSearch, setPage, setLimit } = documentTypeSlice.actions;
export default documentTypeSlice.reducer;
