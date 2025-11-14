'use client';

import { motion, useInView } from 'framer-motion';
import { MapPin, Eye } from 'lucide-react';
import { useState, useRef } from 'react';
import { monitoringData } from '../data/mock';

export const RealTimeMonitoring = () => {
    const [realTimeEnabled, setRealTimeEnabled] = useState(true);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-accent overflow-hidden relative"
        >
            <motion.div
                className="absolute inset-0 bg-linear-to-r from-blue-100/50 to-transparent opacity-0"
                animate={{ opacity: realTimeEnabled ? [0, 0.5, 0] : 0 }}
                transition={{ duration: 3, repeat: Infinity }}
            />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-semibold text-primary">Real-Time Monitoring</h3>
                        {realTimeEnabled && (
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-2 h-2 bg-primary rounded-full"
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={realTimeEnabled}
                                onChange={(e) => setRealTimeEnabled(e.target.checked)}
                            />
                            <motion.div
                                className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-primary transition-colors"
                                animate={{ boxShadow: realTimeEnabled ? '0 0 20px rgba(0,100,255,0.4)' : 'none' }}
                            />
                            <motion.div
                                className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md"
                                animate={{ x: realTimeEnabled ? 20 : 0, rotate: realTimeEnabled ? 360 : 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        </label>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-xs sm:text-sm text-primary hover:text-blue-700 font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            View Leave
                        </motion.button>
                    </div>
                </div>

                {/* List */}
                {realTimeEnabled ? (
                    <motion.div className="space-y-3">
                        {monitoringData.map((item, idx) => {
                            const isCheckedIn = item.isCheckedIn ?? true;
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100 }}
                                    whileHover={{ x: 6, scale: 1.02, boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}
                                    className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl bg-linear-to-r from-gray-50 to-white border border-gray-100 hover:border-purple-200 transition-all cursor-pointer"
                                >
                                    {/* Avatar */}
                                    <div className="relative shrink-0">
                                        <motion.div
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-sm overflow-hidden"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {item.name.charAt(0)}
                                        </motion.div>
                                        <motion.div
                                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${isCheckedIn ? 'bg-green-500' : 'bg-gray-300'}`}
                                            animate={{
                                                scale: isCheckedIn ? [1, 1.4, 1] : 1,
                                                boxShadow: isCheckedIn
                                                    ? ['0 0 0 0 rgba(34,197,94,0.4)', '0 0 0 8px rgba(34,197,94,0)', '0 0 0 0 rgba(34,197,94,0)']
                                                    : 'none',
                                            }}
                                            transition={{ duration: 2, repeat: isCheckedIn ? Infinity : 0 }}
                                        />
                                    </div>

                                    <div className="text-xs sm:text-base font-semibold text-gray-900 w-12 sm:w-16">{item.time}</div>

                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{item.name}</div>
                                        <div className="text-xs text-gray-600">{item.checkIn}</div>
                                    </div>

                                    <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                                        <span className="truncate max-w-20">{item.location}</span>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.2, rotate: 15 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors shrink-0"
                                    >
                                        <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                    </motion.button>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-12 sm:py-16"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-200 border-t-primary rounded-full mb-4"
                        />
                        <p className="text-center text-sm sm:text-base text-gray-500">Real-time monitoring is turned off</p>
                    </motion.div>
                )}

                {/* Footer count */}
                <motion.div
                    className="mt-4 sm:mt-6 text-center p-3 sm:p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl"
                    animate={{
                        boxShadow: realTimeEnabled
                            ? ['0 0 0 0 rgba(147,51,234,0.1)', '0 0 0 10px rgba(147,51,234,0)']
                            : 'none',
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="text-lg sm:text-2xl font-bold text-primary">
                        {realTimeEnabled ? monitoringData.filter((d) => d.isCheckedIn).length : '—'}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">
                        {realTimeEnabled ? 'Employees checked in today' : 'Monitoring disabled'}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};