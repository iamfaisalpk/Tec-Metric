'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Monitor, Clock, Settings, FileText, Menu, X } from 'lucide-react';
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
    const [isExpanded, setIsExpanded] = useState(false);
    const prevPathnameRef = useRef(pathname);
    const collapseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Close mobile menu on route change
    useEffect(() => {
        if (prevPathnameRef.current !== pathname && isMobileOpen) {
            setIsMobileOpen(false);
        }
        prevPathnameRef.current = pathname;
    }, [pathname, isMobileOpen]);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileOpen]);

    // === INSTANT EXPAND + FAST COLLAPSE ===
    const handleMouseEnter = () => {
        if (collapseTimeoutRef.current) {
            clearTimeout(collapseTimeoutRef.current);
            collapseTimeoutRef.current = null;
        }
        setIsExpanded(true); // Instant open
    };

    const handleMouseLeave = () => {
        collapseTimeoutRef.current = setTimeout(() => {
            setIsExpanded(false);
        }, 100); // Only 100ms delay to collapse (feels natural, no flicker)
    };

    // Cleanup timeout
    useEffect(() => {
        return () => {
            if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current);
        };
    }, []);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg border border-gray-100 hover:bg-gray-50 active:scale-95 transition-all"
                aria-label="Toggle menu"
            >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Desktop Sidebar - Super Fast Hover */}
            <motion.aside
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                animate={{
                    width: isExpanded ? '16rem' : '5rem',
                }}
                transition={{
                    duration: 0.22,
                    ease: [0.32, 0, 0, 1],
                }}
                className="hidden lg:flex fixed lg:sticky top-0 h-screen z-40 bg-white border-r border-gray-100 flex-col"
            >
                {/* Logo */}
                <div className="pt-6 pb-8 flex justify-center">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Image
                            src="/Tecon.png"
                            alt="TecTrack Logo"
                            width={48}
                            height={48}
                            className="w-12 h-12"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 space-y-1 pb-6 overflow-y-auto">
                    {navItems.map(({ name, path, Icon },) => {
                        const isActive =
                            pathname === path ||
                            (path !== '/dashboard' && pathname.startsWith(path + '/'));

                        return (
                            <Link key={name} href={path}>
                                <motion.div
                                    className={`relative flex items-center gap-4 px-4 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                                        isActive
                                            ? 'text-primary'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                    whileHover={{ x: 6 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="sidebar-active"
                                            className="absolute inset-0 bg-[#E3F2FF] rounded-xl"
                                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                        />
                                    )}

                                    <Icon className="w-5 h-5 shrink-0 relative z-10" strokeWidth={2.2} />

                                    <motion.span
                                        animate={{ opacity: isExpanded ? 1 : 0 }}
                                        transition={{ duration: 0.15 }}
                                        className="relative z-10 whitespace-nowrap overflow-hidden"
                                    >
                                        {name}
                                    </motion.span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>
            </motion.aside>

            {/* Mobile Sidebar (unchanged, always full width) */}
            <aside className={`fixed top-0 h-screen z-40 w-72 bg-white border-r border-gray-100 flex-col transition-transform duration-300 lg:hidden ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
                <div className="pt-6 pb-8 flex justify-center">
                    <Image src="/Techon.png" alt="Logo" width={48} height={48} className="w-12 h-12" priority />
                </div>
                <nav className="flex-1 px-4 space-y-1 pb-6">
                    {navItems.map(({ name, path, Icon }) => {
                        const isActive = pathname === path || (path !== '/dashboard' && pathname.startsWith(path + '/'));
                        return (
                            <Link key={name} href={path} onClick={() => setIsMobileOpen(false)}>
                                <div className={`flex items-center gap-4 px-4 py-3 rounded-xl text-[15px] font-medium ${isActive ? 'bg-[#E3F2FF] text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
                                    <Icon className="w-5 h-5" strokeWidth={2.2} />
                                    <span>{name}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}