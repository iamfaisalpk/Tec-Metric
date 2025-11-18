"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const tabs = [
    { name: "Set Break Time", href: "/dashboard/attendance" },
    { name: "Set Timetable", href: "/dashboard/attendance/SetTimetable" },
    { name: "Set Shift", href: "/dashboard/attendance/SetShift" },
    { name: "Set Schedule", href: "/dashboard/attendance/SetSchedule" },
];

const Attendence = () => {
    const pathname = usePathname();

    // Parent animation (controls stagger)
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    // Each tab animation
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="w-full flex justify-start gap-3 py-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            {tabs.map((tab) => {
                const isActive =
                    pathname === tab.href ||
                    (pathname === "/attendance" && tab.href === "/dashboard/attendance");

                return (
                    <motion.div key={tab.name} variants={itemVariants}>
                        <Link
                            href={tab.href}
                            className={`px-8 py-3 rounded-2xl font-medium text-sm transition-all 
                                ${isActive
                                    ? "bg-primary text-white"
                                    : "bg-accent text-black hover:bg-primary hover:text-white"
                                }`}
                        >
                            {tab.name}
                        </Link>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

export default Attendence;
