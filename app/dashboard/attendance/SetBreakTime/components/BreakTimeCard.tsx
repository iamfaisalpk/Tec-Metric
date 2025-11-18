'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Calculator } from 'lucide-react';
import { BreakTime } from '../types/breakTimeTypes';

interface BreakTimeCardProps {
    breakTime: BreakTime;
    onEdit: (breakTime: BreakTime) => void;
    onView: (breakTime: BreakTime) => void;
    onDelete: (breakTime: BreakTime) => void;
}

const BreakTimeCard: React.FC<BreakTimeCardProps> = ({
    breakTime,
    onEdit,
    onView,
    onDelete,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-primary/20 p-6 hover:shadow-xl transition-shadow"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-full bg-linear-to-r from-primary to-accent flex items-center justify-center text-white text-lg font-bold shadow-md"
                    >
                        {breakTime.name.slice(0, 2).toUpperCase()}
                    </motion.div>
                    <div>
                        <h3 className="text-lg font-semibold text-text">{breakTime.name}</h3>
                        <p className="text-sm text-gray-600">{breakTime.calculationType}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onEdit(breakTime)}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Edit"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onView(breakTime)}
                        className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                        title="View"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDelete(breakTime)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Delete"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </motion.button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm text-gray-600">Start:</span>
                    <span className="text-sm font-medium text-text">{breakTime.startTime}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm text-gray-600">End:</span>
                    <span className="text-sm font-medium text-text">{breakTime.endTime}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="text-sm font-medium text-text">{breakTime.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="text-sm text-gray-600">With Salary:</span>
                    <span className={`text-sm font-medium ${breakTime.withSalary ? 'text-green-600' : 'text-red-600'}`}>
                        {breakTime.withSalary ? 'Yes' : 'No'}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-600">Calculation:</span>
                <span className="text-sm font-medium text-text">{breakTime.calculationType}</span>
            </div>

            {breakTime.description && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">{breakTime.description}</p>
                </div>
            )}
        </motion.div>
    );
};

export default BreakTimeCard;
