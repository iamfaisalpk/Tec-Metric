'use client';

import { motion, useInView } from 'framer-motion';
import { TrendingDown } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';
import { useRef } from 'react';
import { attendanceData } from '../data/mock';

export const AttendanceChart = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 overflow-hidden"
        >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Attendance Exception</h3>
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                    <TrendingDown className="w-5 h-5 text-red-500" />
                </motion.div>
            </div>

            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <LineChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#9CA3AF" className="sm:text-xs" />
                    <YAxis tick={{ fontSize: 10 }} stroke="#9CA3AF" domain={[0, 400]} className="sm:text-xs" />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '12px' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '15px' }} className="sm:text-xs" />

                    {(['late', 'entryLevel', 'absent'] as const).map((key, idx) => (
                        <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={['#A855F7', '#EF4444', '#10B981'][idx]}
                            strokeWidth={2.5}
                            dot={{ r: 3, fill: ['#A855F7', '#EF4444', '#10B981'][idx], strokeWidth: 2 }}
                            activeDot={{ r: 6, strokeWidth: 2 }}
                            name={['Late', 'Entry Level', 'Absent'][idx]}
                            animationDuration={1500}
                            animationBegin={idx * 200}
                        />
                    ))}

                    <ReferenceLine x="Jul" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
            </ResponsiveContainer>
        </motion.div>
    );
};