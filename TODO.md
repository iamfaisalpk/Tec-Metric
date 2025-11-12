# TODO: Implement Authentication System

- [x] Update lib/axiosInstance.ts: Configure Axios with baseURL, withCredentials, Authorization header, 401 handler.
- [x] Update lib/auth.ts: Functions for getToken, setToken, removeToken using cookies-next.
- [x] Update redux/slices/authSlice.ts: Auth state management with loginUser thunk, handle loading/error.
- [x] Update redux/store.tsx: Setup store with useAppDispatch/useAppSelector.
- [x] Update components/layout/ProtectedWrapper.tsx: Check token cookie, redirect if missing, show loading.
- [x] Update middleware.ts: Protect /dashboard routes, redirect to /auth/login.
- [x] Update app/(auth)/login/LoginForm.tsx: Form with email/password, validation, submit with toast feedback, redirect on success.
- [x] Update app/(auth)/login/page.tsx: Wrap LoginForm, add styling.
