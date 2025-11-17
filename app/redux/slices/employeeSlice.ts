import axiosInstance from '@/app/lib/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Employee {
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
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
}

interface Filters {
    branch: string | null;
    department: string | null;
    position: string | null;
    gender: string | null;
}

interface EmployeeState {
    employees: Employee[];
    loading: boolean;
    error: string | null;
    pagination: Pagination;
    filters: Filters;
    search: string;
    selected: Employee | null;
}

export const fetchEmployees = createAsyncThunk(
    'employee/fetchEmployees',
    async ({ page, limit, search, filters }: { page: number; limit: number; search: string; filters: Filters }) => {
        const params = { page, limit, search, ...filters };
        const response = await axiosInstance.get('/employee/list', { params });
        return response.data;
    }
);

export const createEmployee = createAsyncThunk(
    'employee/createEmployee',
    async (employeeData: Omit<Employee, '_id' | 'createdAt'>) => {
        const response = await axiosInstance.post('/employee/create', employeeData);
        return response.data;
    }
);

export const updateEmployee = createAsyncThunk(
    'employee/updateEmployee',
    async ({ id, data }: { id: string; data: Partial<Employee> }) => {
        const response = await axiosInstance.put(`/employee/update/${id}`, data);
        return response.data;
    }
);

export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',
    async (id: string) => {
        await axiosInstance.delete(`/employee/delete/${id}`);
        return id;
    }
);

export const fetchEmployeeById = createAsyncThunk(
    'employee/fetchEmployeeById',
    async (id: string) => {
        const response = await axiosInstance.get(`/employee/${id}`);
        return response.data;
    }
);

const initialState: EmployeeState = {
    employees: [],
    loading: false,
    error: null,
    pagination: { page: 1, limit: 10, total: 0 },
    filters: {
        branch: null,
        department: null,
        position: null,
        gender: null,
    },
    search: '',
    selected: null,
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                branch: null,
                department: null,
                position: null,
                gender: null,
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
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload.employees;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch employees';
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.employees.push(action.payload);
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.employees.findIndex((e) => e._id === action.payload._id);
                if (index !== -1) state.employees[index] = action.payload;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter((e) => e._id !== action.payload);
            })
            .addCase(fetchEmployeeById.fulfilled, (state, action) => {
                state.selected = action.payload;
            });
    },
});

export const { setFilters, clearFilters, setPage, setLimit, setSearch, setSelected, clearSelected, clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
