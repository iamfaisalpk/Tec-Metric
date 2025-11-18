import axiosInstance from '@/app/lib/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Device, DeviceFormData, DeviceFilters, Pagination } from '@/app/dashboard/device/types/deviceTypes';

interface DeviceState {
    devices: Device[];
    loading: boolean;
    error: string | null;
    pagination: Pagination;
    filters: DeviceFilters;
    search: string;
    selected: Device | null;
}

export const fetchDevices = createAsyncThunk(
    'device/fetchDevices',
    async ({ page, limit, search, filters }: { page: number; limit: number; search: string; filters: DeviceFilters }) => {
        const params = { page, limit, search, ...filters };
        const response = await axiosInstance.get('/device/list', { params });
        return response.data;
    }
);

export const createDevice = createAsyncThunk(
    'device/createDevice',
    async (deviceData: DeviceFormData) => {
        const response = await axiosInstance.post('/device/create', deviceData);
        return response.data;
    }
);

export const updateDevice = createAsyncThunk(
    'device/updateDevice',
    async ({ id, data }: { id: string; data: Partial<DeviceFormData> }) => {
        const response = await axiosInstance.put(`/device/update/${id}`, data);
        return response.data;
    }
);

export const deleteDevice = createAsyncThunk(
    'device/deleteDevice',
    async (id: string) => {
        await axiosInstance.delete(`/device/delete/${id}`);
        return id;
    }
);

export const fetchDeviceById = createAsyncThunk(
    'device/fetchDeviceById',
    async (id: string) => {
        const response = await axiosInstance.get(`/device/${id}`);
        return response.data;
    }
);

const initialState: DeviceState = {
    devices: [],
    loading: false,
    error: null,
    pagination: { page: 1, limit: 10, total: 0 },
    filters: {
        state: null,
        city: null,
    },
    search: '',
    selected: null,
};

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                state: null,
                city: null,
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
            .addCase(fetchDevices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDevices.fulfilled, (state, action) => {
                state.loading = false;
                state.devices = action.payload.devices;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchDevices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch devices';
            })
            .addCase(createDevice.fulfilled, (state, action) => {
                state.devices.push(action.payload);
            })
            .addCase(updateDevice.fulfilled, (state, action) => {
                const index = state.devices.findIndex((d) => d._id === action.payload._id);
                if (index !== -1) state.devices[index] = action.payload;
            })
            .addCase(deleteDevice.fulfilled, (state, action) => {
                state.devices = state.devices.filter((d) => d._id !== action.payload);
            })
            .addCase(fetchDeviceById.fulfilled, (state, action) => {
                state.selected = action.payload;
            });
    },
});

export const { setFilters, clearFilters, setPage, setLimit, setSearch, setSelected, clearSelected, clearError } = deviceSlice.actions;
export default deviceSlice.reducer;
