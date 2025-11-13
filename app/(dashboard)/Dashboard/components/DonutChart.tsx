'use client';

import { motion, useInView } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useRef, useState } from 'react';

type DonutItem = { label: string; value: number; color: string };

export const DonutChart = ({
    title,
    total,
    data,
}: {
    title: string;
    total: number;
    data: DonutItem[];
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const totalValue = data.reduce((s, i) => s + i.value, 0);

    // Precompute start/end angles for each segment
    const segments = data.reduce<{ startAngle: number; endAngle: number; item: DonutItem }[]>(
        (acc, item) => {
            const pct = (item.value / totalValue) * 100;
            const angle = (pct / 100) * 360;
            const startAngle = acc.length > 0 ? acc[acc.length - 1].endAngle : -90;
            const endAngle = startAngle + angle;
            acc.push({ startAngle, endAngle, item });
            return acc;
        },
        []
    );

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            whileHover={{ scale: 1.03, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="bg-background rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 cursor-pointer overflow-hidden relative group"
        >
            <motion.div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800">{title}</h3>
                    <motion.div
                        animate={{ rotate: hoveredIndex !== null ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-primary"
                    >
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-4">
                        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                            {segments.map(({ startAngle, endAngle, item }, idx) => (
                                <motion.path
                                    key={idx}
                                    d={describeArc(50, 50, 40, startAngle, endAngle)}
                                    fill="none"
                                    stroke={item.color}
                                    strokeWidth={hoveredIndex === idx ? '24' : '20'}
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
                                    transition={{ duration: 1.5, delay: idx * 0.2, ease: 'easeOut' }}
                                    onMouseEnter={() => setHoveredIndex(idx)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    style={{
                                        filter: hoveredIndex === idx ? 'drop-shadow(0 0 8px rgba(139,92,246,0.6))' : 'none',
                                    }}
                                />
                            ))}
                        </svg>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
                                transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                                className="text-center"
                            >
                                <motion.div
                                    className="text-2xl sm:text-3xl font-bold text-primary"
                                    animate={{ scale: hoveredIndex !== null ? 1.1 : 1 }}
                                >
                                    {total}
                                </motion.div>
                                <div className="text-xs text-gray-500 mt-1">(75%)</div>
                            </motion.div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 w-full">
                        {data.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                                transition={{ delay: 1 + idx * 0.1 }}
                                whileHover={{ x: 4 }}
                                onMouseEnter={() => setHoveredIndex(idx)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                        animate={{ scale: hoveredIndex === idx ? 1.3 : 1 }}
                                    />
                                    <span className="text-xs sm:text-sm text-gray-700 font-medium">{item.label}</span>
                                </div>
                                <span className="text-xs sm:text-sm text-gray-600 font-semibold">{item.value}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Helper functions
const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};

const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};