'use client';

import { motion } from 'framer-motion';
import { DashboardGrid } from './components/DashboardGrid';
import { AttendanceChart } from './components/AttendanceChart';
import { RealTimeMonitoring } from './components/RealTimeMonitoring';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
};

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6">
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                <DashboardGrid />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <AttendanceChart />
                    <RealTimeMonitoring />
                </div>
            </motion.div>
        </div>
    );
}