'use client';

import { motion } from 'framer-motion';
import { DonutChart } from './DonutChart';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

export const DashboardGrid = () => (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
    >
        <DonutChart
            title="Present"
            total={100}
            data={[
                { label: 'Present', value: 75, color: '#8B5CF6' },
                { label: 'Absent', value: 25, color: '#F59E0B' },
            ]}
        />
        <DonutChart
            title="Device Status"
            total={100}
            data={[
                { label: 'Online', value: 75, color: '#8B5CF6' },
                { label: 'Offline', value: 15, color: '#F59E0B' },
                { label: 'Unauthorized', value: 10, color: '#EF4444' },
            ]}
        />
        <DonutChart
            title="Schedule"
            total={100}
            data={[
                { label: 'Scheduled', value: 75, color: '#8B5CF6' },
                { label: 'Not Scheduled', value: 25, color: '#F59E0B' },
            ]}
        />
        <DonutChart
            title="Approvals"
            total={100}
            data={[
                { label: 'Approved', value: 75, color: '#8B5CF6' },
                { label: 'Pending', value: 15, color: '#F59E0B' },
                { label: 'Rejected', value: 10, color: '#EF4444' },
            ]}
        />
    </motion.div>
);