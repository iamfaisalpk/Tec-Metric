import axiosInstance from '@/app/lib/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Branch {
    _id: string;
    name: string;
    code: string;
    location?: string;
    phone?: string;
    state?: string;
    city?: string;
    address?: string;
    country?: string;
    superior?: string;
    logo?: string;
    status?: 'active' | 'inactive';
    createdAt: string;
    updatedAt?: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
}

interface BranchState {
    branches: Branch[];
    loading: boolean;
    error: string | null;
    pagination: Pagination;
    search: string;
}

export const fetchBranches = createAsyncThunk(
    'branch/fetchBranches',
    async ({ page, limit, search }: { page: number; limit: number; search: string }) => {
        const response = await axiosInstance.get('/branch', { params: { page, limit, search } });
        return response.data;
    }
);

export const createBranch = createAsyncThunk(
    'branch/createBranch',
    async (branchData: Omit<Branch, '_id' | 'createdAt'>) => {
        const response = await axiosInstance.post('/branch', branchData);
        return response.data;
    }
);

export const updateBranch = createAsyncThunk(
    'branch/updateBranch',
    async ({ id, data }: { id: string; data: Partial<Branch> }) => {
        const response = await axiosInstance.put(`/branch/${id}`, data);
        return response.data;
    }
);

export const deleteBranch = createAsyncThunk(
    'branch/deleteBranch',
    async (id: string) => {
        await axiosInstance.delete(`/branch/${id}`);
        return id;
    }
);

const initialState: BranchState = {
    branches: [],
    loading: false,
    error: null,
    pagination: { page: 1, limit: 10, total: 0 },
    search: '',
};

const branchSlice = createSlice({
    name: 'branch',
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
            .addCase(fetchBranches.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBranches.fulfilled, (state, action) => {
                state.loading = false;
                state.branches = action.payload.branches;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchBranches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch branches';
            })
            .addCase(createBranch.fulfilled, (state, action) => {
                state.branches.push(action.payload);
            })
            .addCase(updateBranch.fulfilled, (state, action) => {
                const index = state.branches.findIndex((b) => b._id === action.payload._id);
                if (index !== -1) state.branches[index] = action.payload;
            })
            .addCase(deleteBranch.fulfilled, (state, action) => {
                state.branches = state.branches.filter((b) => b._id !== action.payload);
            });
    },
});

export const { setSearch, setPage, setLimit } = branchSlice.actions;
export default branchSlice.reducer;
