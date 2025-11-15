import axiosInstance from '@/app/lib/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Position {
    _id: string;
    name: string;
    code: string;
    departmentId: string;
    createdAt: string;
    updatedAt?: string;
}

interface Department {
    _id: string;
    name: string;
    code: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
}

interface PositionState {
    positions: Position[];
    departments: Department[];
    loading: boolean;
    error: string | null;
    pagination: Pagination;
    search: string;
}

export const fetchPositions = createAsyncThunk(
    'position/fetchPositions',
    async ({ page, limit, search }: { page: number; limit: number; search: string }) => {
        const response = await axiosInstance.get('/position', { params: { page, limit, search } });
        return response.data;
    }
);

export const createPosition = createAsyncThunk(
    'position/createPosition',
    async (positionData: Omit<Position, '_id' | 'createdAt'>) => {
        const response = await axiosInstance.post('/position', positionData);
        return response.data;
    }
);

export const updatePosition = createAsyncThunk(
    'position/updatePosition',
    async ({ id, data }: { id: string; data: Partial<Position> }) => {
        const response = await axiosInstance.put(`/position/${id}`, data);
        return response.data;
    }
);

export const deletePosition = createAsyncThunk(
    'position/deletePosition',
    async (id: string) => {
        await axiosInstance.delete(`/position/${id}`);
        return id;
    }
);

export const fetchDepartmentsForDropdown = createAsyncThunk(
    'position/fetchDepartmentsForDropdown',
    async () => {
        const response = await axiosInstance.get('/department', { params: { page: 1, limit: 1000 } });
        return response.data.departments;
    }
);

const initialState: PositionState = {
    positions: [],
    departments: [],
    loading: false,
    error: null,
    pagination: { page: 1, limit: 10, total: 0 },
    search: '',
};

const positionSlice = createSlice({
    name: 'position',
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
            .addCase(fetchPositions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPositions.fulfilled, (state, action) => {
                state.loading = false;
                state.positions = action.payload.positions;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchPositions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch positions';
            })
            .addCase(createPosition.fulfilled, (state, action) => {
                state.positions.push(action.payload);
            })
            .addCase(updatePosition.fulfilled, (state, action) => {
                const index = state.positions.findIndex((p) => p._id === action.payload._id);
                if (index !== -1) state.positions[index] = action.payload;
            })
            .addCase(deletePosition.fulfilled, (state, action) => {
                state.positions = state.positions.filter((p) => p._id !== action.payload);
            })
            .addCase(fetchDepartmentsForDropdown.fulfilled, (state, action) => {
                state.departments = action.payload;
            });
    },
});

export const { setSearch, setPage, setLimit } = positionSlice.actions;
export default positionSlice.reducer;
