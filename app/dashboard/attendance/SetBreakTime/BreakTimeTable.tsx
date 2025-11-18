'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { BreakTime } from './types/breakTimeTypes';

interface BreakTimeTableProps {
    breakTimes: BreakTime[];
    loading: boolean;
    pagination: { page: number; limit: number; total: number };
    onEdit: (breakTime: BreakTime) => void;
    onView: (breakTime: BreakTime) => void;
    onDelete: (breakTime: BreakTime) => void;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

const BreakTimeTable: React.FC<BreakTimeTableProps> = ({
    breakTimes,
    loading,
    pagination,
    onEdit,
    onView,
    onDelete,
    onPageChange,
    onLimitChange,
}) => {
    const totalPages = Math.ceil(pagination.total / pagination.limit);

    return (
        <div className="relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border-2 border-primary/20 overflow-hidden"
            >
                {/* ---------- Table ---------- */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-formbg">
                            <tr>
                                {[
                                    'No.',
                                    'Name',
                                    'Start Time',
                                    'End Time',
                                    'Duration',
                                    'With Salary',
                                    'Calculation Type',
                                    'Created Date',
                                    'Updated Date',
                                    'Action',
                                ].map((h, idx) => (
                                    <th
                                        key={h}
                                        className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            {h}
                                        </motion.div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={10} className="text-center py-12">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.5, 1, 0.5]
                                            }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                            className="text-text font-medium"
                                        >
                                            Loading...
                                        </motion.div>
                                    </td>
                                </tr>
                            ) : breakTimes.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="text-center py-12 text-gray-500">
                                        No break times found.
                                    </td>
                                </tr>
                            ) : (
                                breakTimes.map((breakTime, idx) => (
                                    <motion.tr
                                        key={breakTime._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ x: 4 }}
                                        className="border-b border-gray-100 hover:bg-blue-50/40 transition-colors"
                                    >
                                        <td className="px-4 py-4 text-text font-medium">
                                            {String(idx + 1 + (pagination.page - 1) * pagination.limit).padStart(2, '0')}
                                        </td>
                                        <td className="px-4 py-4 text-text font-medium">{breakTime.name}</td>
                                        <td className="px-4 py-4 text-text">{breakTime.startTime}</td>
                                        <td className="px-4 py-4 text-text">{breakTime.endTime}</td>
                                        <td className="px-4 py-4 text-text">{breakTime.duration}</td>
                                        <td className="px-4 py-4">
                                            {breakTime.withSalary ? (
                                                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <XCircleIcon className="w-5 h-5 text-red-500" />
                                            )}
                                        </td>
                                        <td className="px-4 py-4 text-text">{breakTime.calculationType}</td>
                                        <td className="px-4 py-4 text-gray-600">
                                            {new Date(breakTime.createdAt).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className="px-4 py-4 text-gray-600">
                                            {breakTime.updatedAt ? new Date(breakTime.updatedAt).toLocaleDateString('en-GB') : 'N/A'}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => onEdit(breakTime)}
                                                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                                                    title="Edit"
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => onView(breakTime)}
                                                    className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors cursor-pointer"
                                                    title="View"
                                                >
                                                    <EyeIcon className="w-4 h-4" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => onDelete(breakTime)}
                                                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                                                    title="Delete"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ---------- Pagination ---------- */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-end"
                >
                    <div className="flex items-center gap-3">
                        <select
                            value={pagination.limit}
                            onChange={(e) => onLimitChange(Number(e.target.value))}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                        >
                            {[5, 10, 20].map((v) => (
                                <option key={v} value={v}>
                                    {v}
                                </option>
                            ))}
                        </select>

                        <span className="text-sm text-text font-medium">
                            Page {pagination.page} of {totalPages || 1}
                        </span>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onPageChange(pagination.page - 1)}
                            disabled={pagination.page === 1}
                            className="px-4 py-2 cursor-pointer text-sm font-medium border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-formbg transition-colors"
                        >
                            Previous
                        </motion.button>

                        <div className="flex gap-1">
                            {Array.from({ length: Math.min(5, totalPages || 1) }, (_, i) => i + 1).map((p) => (
                                <motion.button
                                    key={p}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onPageChange(p)}
                                    className={`w-10 h-10 cursor-pointer rounded-lg text-sm font-semibold transition-all ${p === pagination.page
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'border border-gray-300 hover:bg-formbg text-text'
                                        }`}
                                >
                                    {p}
                                </motion.button>
                            ))}
                        </div>

                        {totalPages > 5 && <span className="px-2 text-sm text-gray-500">...</span>}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onPageChange(pagination.page + 1)}
                            disabled={pagination.page === totalPages}
                            className="px-4 py-2 cursor-pointer text-sm font-medium border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-formbg transition-colors"
                        >
                            Next
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default BreakTimeTable;
