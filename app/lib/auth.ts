import { getCookie, setCookie, deleteCookie } from 'cookies-next';

// Token management functions using cookies-next
export const getToken = (): string | null => {
    return getCookie('token') as string | null;
};

export const setToken = (token: string): void => {
    setCookie('token', token, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
    });
};

export const removeToken = (): void => {
    deleteCookie('token');
};

export const isAuthenticated = (): boolean => {
    return !!getToken();
};
