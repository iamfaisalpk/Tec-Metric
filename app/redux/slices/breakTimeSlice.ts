import axiosInstance from '@/app/lib/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BreakTime, BreakTimeFormData, BreakTimeFilters, Pagination } from '@/app/dashboard/attendance/SetTimetable/types/breakTimeTypes';

interface BreakTimeState {
    breakTimes: BreakTime[];
    loading: boolean;
    error: string | null;
    pagination: Pagination;
    filters: BreakTimeFilters;
    search: string;
    selected: BreakTime | null;
}

export const fetchBreakTimes = createAsyncThunk(
    'breakTime/fetchBreakTimes',
    async ({ page, limit, search, filters }: { page: number; limit: number; search: string; filters: BreakTimeFilters }) => {
        const params = { page, limit, search, ...filters };
        const response = await axiosInstance.get('/break-time/list', { params });
        return response.data;
    }
);

export const createBreakTime = createAsyncThunk(
    'breakTime/createBreakTime',
    async (breakTimeData: BreakTimeFormData) => {
        const response = await axiosInstance.post('/break-time/create', breakTimeData);
        return response.data;
    }
);

export const updateBreakTime = createAsyncThunk(
    'breakTime/updateBreakTime',
    async ({ id, data }: { id: string; data: Partial<BreakTimeFormData> }) => {
        const response = await axiosInstance.put(`/break-time/update/${id}`, data);
        return response.data;
    }
);

export const deleteBreakTime = createAsyncThunk(
    'breakTime/deleteBreakTime',
    async (id: string) => {
        await axiosInstance.delete(`/break-time/delete/${id}`);
        return id;
    }
);

export const fetchBreakTimeById = createAsyncThunk(
    'breakTime/fetchBreakTimeById',
    async (id: string) => {
        const response = await axiosInstance.get(`/break-time/${id}`);
        return response.data;
    }
);

const initialState: BreakTimeState = {
    breakTimes: [],
    loading: false,
    error: null,
    pagination: { page: 1, limit: 10, total: 0 },
    filters: {
        name: null,
        startTime: null,
        calculationType: null,
    },
    search: '',
    selected: null,
};

const breakTimeSlice = createSlice({
    name: 'breakTime',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                name: null,
                startTime: null,
                calculationType: null,
            };
        },
        setPage: (state, action) => {
            state.pagination.page = action.payload;
        },
        setLimit: (state, action) => {
            state.pagination.limit = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setSelected: (state, action) => {
            state.selected = action.payload;
        },
        clearSelected: (state) => {
            state.selected = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBreakTimes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBreakTimes.fulfilled, (state, action) => {
                state.loading = false;
                state.breakTimes = action.payload.breakTimes;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchBreakTimes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch break times';
            })
            .addCase(createBreakTime.fulfilled, (state, action) => {
                state.breakTimes.push(action.payload);
            })
            .addCase(updateBreakTime.fulfilled, (state, action) => {
                const index = state.breakTimes.findIndex((b) => b._id === action.payload._id);
                if (index !== -1) state.breakTimes[index] = action.payload;
            })
            .addCase(deleteBreakTime.fulfilled, (state, action) => {
                state.breakTimes = state.breakTimes.filter((b) => b._id !== action.payload);
            })
            .addCase(fetchBreakTimeById.fulfilled, (state, action) => {
                state.selected = action.payload;
            });
    },
});

export const { setFilters, clearFilters, setPage, setLimit, setSearch, setSelected, clearSelected, clearError } = breakTimeSlice.actions;
export default breakTimeSlice.reducer;
