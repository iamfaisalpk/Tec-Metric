'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Users,
    Monitor,
    Clock,
    Settings,
    FileText,
    Menu,
    X,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const navItems = [
    { name: 'Dashboard', path: '/dashboard', Icon: Home },
    { name: 'Employee', path: '/dashboard/employee', Icon: Users },
    { name: 'Device', path: '/dashboard/device', Icon: Monitor },
    { name: 'Attendance', path: '/dashboard/attendance', Icon: Clock },
    { name: 'System', path: '/dashboard/system', Icon: Settings },
    { name: 'Reports', path: '/dashboard/report', Icon: FileText },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const prevPathnameRef = useRef(pathname);

    // Close mobile menu on route change
    useEffect(() => {
        if (prevPathnameRef.current !== pathname && isMobileOpen) {
            setIsMobileOpen(false);
        }
        prevPathnameRef.current = pathname;
    }, [pathname, isMobileOpen]);

    // Lock scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? 'hidden' : 'unset';
    }, [isMobileOpen]);

    return (
        <>
            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg border border-gray-100 hover:bg-gray-50 active:scale-95 transition-all"
                aria-label="Toggle menu"
            >
                {isMobileOpen ? (
                    <X className="w-6 h-6 text-gray-700" />
                ) : (
                    <Menu className="w-6 h-6 text-gray-700" />
                )}
            </button>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                        onClick={() => setIsMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:sticky top-0 h-screen z-40
                    w-64 sm:w-72 lg:w-56 xl:w-64
                    bg-white border-r border-gray-100
                    flex flex-col
                    transition-transform duration-300 ease-in-out
                    ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Logo */}
                <div className="pt-6 pb-8 lg:pb-10 flex justify-center px-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                        <Image
                            src="/Techon.png"
                            alt="TecTrack Logo"
                            width={48}
                            height={48}
                            priority
                            className="w-12 h-12"
                        />
                    </motion.div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 sm:px-4 lg:px-5 space-y-1.5 pb-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {navItems.map(({ name, path, Icon }, index) => {
                        // Fixed: Highlight parent when in child route
                        const isActive =
                            pathname === path ||
                            (path !== '/dashboard' && pathname.startsWith(path + '/'));

                        return (
                            <Link key={name} href={path}>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: index * 0.05,
                                        type: 'spring',
                                        stiffness: 260,
                                        damping: 20,
                                    }}
                                    className={`
                                        relative flex items-center gap-3 sm:gap-4
                                        px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl
                                        text-[14px] sm:text-[15px] font-medium
                                        transition-colors duration-150
                                        ${isActive
                                            ? 'bg-[#E3F2FF] text-primary shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                                        }
                                    `}
                                    whileHover={{
                                        x: 4,
                                        transition: { type: 'spring', stiffness: 400, damping: 10 },
                                    }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {/* Fixed: Unique layoutId per route */}
                                    {isActive && (
                                        <motion.div
                                            layoutId={`sidebar-active-${path}`}
                                            className="absolute inset-0 bg-[#E3F2FF] rounded-xl sm:rounded-2xl"
                                            transition={{
                                                type: 'spring',
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}

                                    <Icon
                                        className="w-5 h-5 relative z-10 shrink-0"
                                        strokeWidth={2}
                                    />
                                    <span className="relative z-10 truncate">{name}</span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}