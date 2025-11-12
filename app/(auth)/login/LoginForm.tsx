"use client";

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store';
import { loginUser } from '@/app/redux/slices/authSlice';

interface LoginFormData {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state: RootState) => state.auth);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            await dispatch(loginUser(data)).unwrap();
            router.push('/dashboard');
        } catch {
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAFBFC] px-4">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to TecMetrics
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#0064FF] focus:border-[#0064FF] focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#0064FF] focus:border-[#0064FF] focus:z-10 sm:text-sm"
                                placeholder="Password"
                                {...register('password', { required: 'Password is required' })}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0064FF] hover:bg-[#0052CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0064FF] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
            <Toaster position="top-right" />
        </div>
    );
};

export default LoginForm;
