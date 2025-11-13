'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Settings, Bell, LogOut, User } from 'lucide-react';
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

    const title = titleMap[pathname] || 'Dashboard'; // default if route not found

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
                    <Settings className="w-6 h-6 text-gray-600 cursor-pointer" strokeWidth={2} />
                </motion.button>

                {/* Notifications */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                    aria-label="Notifications"
                >
                    <Bell className="w-6 h-6 text-gray-600 cursor-pointer" strokeWidth={2} />
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
                                <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                                >
                                    <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                        <User className="w-4 h-4" strokeWidth={2} />
                                        <span>Profile</span>
                                    </button>
                                    <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                        <Settings className="w-4 h-4" strokeWidth={2} />
                                        <span>Settings</span>
                                    </button>
                                    <hr className="my-2 border-gray-100" />
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4 cursor-pointer" strokeWidth={2} />
                                        <span>Logout</span>
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
