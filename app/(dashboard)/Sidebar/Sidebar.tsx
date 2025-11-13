'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Home,
    Users,
    Monitor,
    Clock,
    Settings,
    FileText,
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', path: '/dashboard', Icon: Home },
    { name: 'Employee', path: '/employee', Icon: Users },
    { name: 'Device', path: '/device', Icon: Monitor },
    { name: 'Attendance', path: '/attendance', Icon: Clock },
    { name: 'System', path: '/system', Icon: Settings },
    { name: 'Reports', path: '/report', Icon: FileText },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-56 bg-white border-r border-gray-100 sticky top-0 h-screen flex flex-col">
            {/* Logo */}
            <div className="pt-6 pb-10 flex justify-center">
                <Image
                    src="/Techon.png"
                    alt="TecTrack Logo"
                    width={48}
                    height={48}
                    priority
                />
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-5 space-y-2 pb-6">
                {navItems.map(({ name, path, Icon }) => {
                    const isActive = pathname === path;

                    return (
                        <Link key={name} href={path}>
                            <motion.div
                                className={`
                  relative flex items-center gap-4 px-4 py-3 rounded-2xl
                  text-[15px] font-normal transition-all cursor-pointer
                  ${isActive
                                        ? 'bg-[#E3F2FF] text-primary shadow-sm'
                                        : 'text-gray-600 hover:bg-[#E3F2FF]'
                                    }
                `}
                                whileHover={{ x: 2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Icon className="w-5 h-5" strokeWidth={2} />
                                <span>{name}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}