import axiosInstance from '@/app/lib/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Department {
    _id: string;
    name: string;
    code: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
}

interface DepartmentState {
    departments: Department[];
    loading: boolean;
    error: string | null;
    pagination: Pagination;
    search: string;
}

export const fetchDepartments = createAsyncThunk(
    'department/fetchDepartments',
    async ({ page, limit, search }: { page: number; limit: number; search: string }) => {
        const response = await axiosInstance.get('/department', { params: { page, limit, search } });
        return response.data;
    }
);

export const createDepartment = createAsyncThunk(
    'department/createDepartment',
    async (departmentData: Omit<Department, '_id' | 'createdAt' | 'updatedAt'>) => {
        const response = await axiosInstance.post('/department', departmentData);
        return response.data;
    }
);

export const updateDepartment = createAsyncThunk(
    'department/updateDepartment',
    async ({ id, data }: { id: string; data: Partial<Department> }) => {
        const response = await axiosInstance.put(`/department/${id}`, data);
        return response.data;
    }
);

export const deleteDepartment = createAsyncThunk(
    'department/deleteDepartment',
    async (id: string) => {
        await axiosInstance.delete(`/department/${id}`);
        return id;
    }
);

const initialState: DepartmentState = {
    departments: [],
    loading: false,
    error: null,
    pagination: { page: 1, limit: 10, total: 0 },
    search: '',
};

const departmentSlice = createSlice({
    name: 'department',
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
            .addCase(fetchDepartments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.departments = action.payload.departments;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch departments';
            })
            .addCase(createDepartment.fulfilled, (state, action) => {
                state.departments.push(action.payload);
            })
            .addCase(updateDepartment.fulfilled, (state, action) => {
                const index = state.departments.findIndex((d) => d._id === action.payload._id);
                if (index !== -1) state.departments[index] = action.payload;
            })
            .addCase(deleteDepartment.fulfilled, (state, action) => {
                state.departments = state.departments.filter((d) => d._id !== action.payload);
            });
    },
});

export const { setSearch, setPage, setLimit } = departmentSlice.actions;
export default departmentSlice.reducer;
