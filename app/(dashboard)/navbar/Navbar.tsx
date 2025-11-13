'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Settings, Bell,  User, LogOut } from 'lucide-react';
import { removeToken } from '@/app/lib/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        removeToken();
        router.push('/login');
    };

    // Map pathname to titles
    const titleMap: Record<string, string> = {
        '/dashboard': 'Analytics',
        '/employee': 'Employee',
        '/device': 'Device',
        '/attendance': 'Attendance',
        '/system': 'System',
        '/report': 'Reports',
    };

    const title = titleMap[pathname] || 'Dashboard';

    return (
        <motion.nav
            className="bg-background px-8 py-5 flex justify-between items-center border-b border-gray-100"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* LEFT: Dynamic title */}
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

            {/* RIGHT: Settings, Notifications, Avatar */}
            <div className="flex items-center gap-2.5">
                {/* Settings */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Settings"
                >
                    <Settings className="w-6 h-6 text-gray-600" strokeWidth={2} />
                </motion.button>

                {/* Notifications */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                    aria-label="Notifications"
                >
                    <Bell className="w-6 h-6 text-gray-600" strokeWidth={2} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
                </motion.button>

                {/* Avatar Dropdown */}
                <div className="relative">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-9 h-9 rounded-full overflow-hidden bg-gray-900 cursor-pointer ring-2 ring-gray-200"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <Image
                            src="/Techon.png"
                            alt="User avatar"
                            width={36}
                            height={36}
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    <AnimatePresence>
                        {open && (
                            <>
                                {/* Backdrop */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-black/30 z-40"
                                    onClick={() => setOpen(false)}
                                />

                                {/* Dropdown Modal - Aligned to Avatar (Right) */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 top-12 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                                >
                                    {/* Header */}
                                    <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
                                        <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-blue-500">
                                            <Image
                                                src="/Techon.png"
                                                alt="Laura Monaldo"
                                                width={44}
                                                height={44}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 flex items-center gap-1 text-sm">
                                                Techon
                                                <svg className="w-4 h-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </p>
                                            <p className="text-xs text-gray-500">Techon@gmail.com</p>
                                        </div>
                                    </div>

                                    {/* Profile Details */}
                                    <button className="flex items-center gap-3 w-full px-4 py-3 text-sm cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors">
                                        <User className="w-4 h-4 text-blue-600" strokeWidth={2} />
                                        <span>Profile Details</span>
                                    </button>

                                    {/* Log Out */}
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setOpen(false);
                                        }}
                                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white bg-blue-500 cursor-pointer hover:bg-blue-600 transition-colors rounded-2xl"
                                    >
                                        <LogOut className="w-4 h-4 cursor-pointer" strokeWidth={2} />
                                        <span className='cursor-pointer'>Log Out</span>
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.nav>
    );
}