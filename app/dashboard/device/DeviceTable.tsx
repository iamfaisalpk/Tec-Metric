'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PencilIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Search as SearchIcon } from 'lucide-react';
import { Device } from './types/deviceTypes';

interface Pagination {
    page: number;
    limit: number;
    total: number;
}

interface DeviceTableProps {
    devices: Device[];
    loading: boolean;
    pagination: Pagination;
    searchQuery: string;
    onSearch: (query: string) => void;
    onEdit: (device: Device) => void;
    onView: (device: Device) => void;
    onDelete: (device: Device) => void;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

const DeviceTable: React.FC<DeviceTableProps> = ({
    devices,
    loading,
    pagination,
    searchQuery,
    onSearch,
    onEdit,
    onView,
    onDelete,
    onPageChange,
}) => {
    const totalPages = Math.ceil(pagination.total / pagination.limit) || 1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
        >
            {/* Header: Device List + Search */}
            <div className="px-6 py-5 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Device List</h2>

                <div className="relative max-w-md w-full">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                        placeholder="Search devices..."
                        className="pl-12 pr-5 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                        <tr>
                            {['No.', 'Device', 'Serial No.', 'Attendance Device', 'State', 'City', 'Created Date', 'Updated Date', 'Action'].map((header) => (
                                <th key={header} className="px-6 py-4 text-left font-semibold">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan={9} className="text-center py-20">
                                    <motion.div
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="text-gray-500 font-medium"
                                    >
                                        Loading devices...
                                    </motion.div>
                                </td>
                            </tr>
                        ) : devices.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="text-center py-20 text-gray-500">
                                    No devices found.
                                </td>
                            </tr>
                        ) : (
                            devices.map((device, idx) => {
                                const rowNum = idx + 1 + (pagination.page - 1) * pagination.limit;

                                return (
                                    <motion.tr
                                        key={device._id}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ backgroundColor: '#f0f7ff' }}
                                        className="transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900">{String(rowNum).padStart(2, '0')}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">{device.deviceName}</td>
                                        <td className="px-6 py-4 text-gray-700">{device.serialNo}</td>
                                        <td className="px-6 py-4 text-gray-700">{device.attendanceDevice || '+44 20 7946 0123'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => onEdit(device)}
                                                    className="text-blue-600 hover:bg-blue-100 p-2.5 rounded-lg transition">
                                                    <PencilIcon className="w-4 h-4" />
                                                </motion.button>
                                                <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => onView(device)}
                                                    className="text-blue-600 hover:bg-blue-100 p-2.5 rounded-lg transition">
                                                    <EyeIcon className="w-4 h-4" />
                                                </motion.button>
                                                <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => onDelete(device)}
                                                    className="text-red-600 hover:bg-red-100 p-2.5 rounded-lg transition">
                                                    <TrashIcon className="w-4 h-4" />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 bg-gray-50 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
                <span className="text-gray-600">
                    Showing {devices.length} of {pagination.total} results
                </span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-100 transition"
                    >
                        Previous
                    </button>
                    <div className="flex gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
                            <motion.button
                                key={p}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onPageChange(p)}
                                className={`w-10 h-10 rounded-lg font-medium transition ${p === pagination.page
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'border border-gray-300 hover:bg-gray-100'
                                    }`}
                            >
                                {p}
                            </motion.button>
                        ))}
                    </div>
                    <button
                        onClick={() => onPageChange(pagination.page + 1)}
                        disabled={pagination.page >= totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-100 transition"
                    >
                        Next
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default DeviceTable;