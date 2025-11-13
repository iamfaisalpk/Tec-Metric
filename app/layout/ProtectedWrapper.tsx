'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

interface ProtectedWrapperProps {
    children: React.ReactNode;
}

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const token = getCookie('token');
            if (!token) {
                router.push('/login');
            } else {
                setIsLoading(false);
            }
        };

        checkAuth();

        // Watch for token removal
        const interval = setInterval(() => {
            const token = getCookie('token');
            if (!token) router.push('/login');
        }, 3000);

        return () => clearInterval(interval);
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedWrapper;
