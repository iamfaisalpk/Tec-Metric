import { removeToken } from '@/app/lib/auth';
import axiosInstance from '@/app/lib/axiosInstance';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';


interface LoginPayload {
    email: string;
    password: string;
}

interface AuthError {
    message: string;
}

interface AuthState {
    user: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}


const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};


export const loginUser = createAsyncThunk<
    { user: string },
    LoginPayload,
    { rejectValue: string }
>('auth/loginUser', async (payload, { rejectWithValue }) => {
    try {
        await axiosInstance.post('/auth/login', payload);
        return { user: payload.email };
    } catch (err) {
        const error = err as { response?: { data?: AuthError } };
        const msg = error.response?.data?.message ?? 'Login failed';
        return rejectWithValue(msg);
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            removeToken();
            toast.success('Logged out successfully');
        },
        clearError: (state) => {
            state.error = null;
        },
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                loginUser.fulfilled,
                (state, action: PayloadAction<{ user: string }>) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                    state.error = null;
                    toast.success('Login successful');
                }
            )
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Unknown error';
                state.isAuthenticated = false;
                toast.error(state.error);
            });
    },
});

export const { logout, clearError, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;