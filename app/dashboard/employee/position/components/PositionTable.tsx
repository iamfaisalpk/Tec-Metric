'use client';

import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Briefcase } from 'lucide-react';
import PositionActions from './PositionActions';
import { Position } from '../hooks/usePositionCRUD';

interface PositionTableProps {
    positions: Position[];
    departments: { _id: string; name: string; code: string }[];
    loading: boolean;
    search: string;
    pagination: { page: number; limit: number; total: number };
    onSearch: (search: string) => void;
    onAdd: () => void;
    onEdit: (position: Position) => void;
    onDelete: (position: Position) => void;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

const PositionTable: React.FC<PositionTableProps> = ({
    positions,
    departments,
    loading,
    search,
    pagination,
    onSearch,
    onAdd,
    onEdit,
    onDelete,
    onPageChange,
    onLimitChange,
}) => {
    // Memoized: Department lookup map
    const departmentMap = useMemo(() => {
        const map = new Map<string, string>();
        departments.forEach(d => map.set(d._id, d.name));
        return map;
    }, [departments]);

    const getDepartmentName = useCallback((departmentId: string) => {
        return departmentMap.get(departmentId) || 'Unknown Department';
    }, [departmentMap]);

    // Memoized: Formatted positions with dates
    const formattedPositions = useMemo(() => {
        return positions.map((pos, idx) => ({
            ...pos,
            displayIndex: idx + 1 + (pagination.page - 1) * pagination.limit,
            formattedCreatedAt: new Date(pos.createdAt).toLocaleDateString('en-GB'),
            formattedUpdatedAt: pos.updatedAt
                ? new Date(pos.updatedAt).toLocaleDateString('en-GB')
                : 'N/A',
            initials: pos.name.slice(0, 2).toUpperCase(),
            departmentName: getDepartmentName(pos.departmentId),
        }));
    }, [positions, pagination.page, pagination.limit, getDepartmentName]);

    // Memoized: Pagination
    const totalPages = Math.ceil(pagination.total / pagination.limit);
    const pageNumbers = useMemo(() => {
        const pages: number[] = [];
        const maxVisible = 5;
        const start = Math.max(1, pagination.page - Math.floor(maxVisible / 2));
        const end = Math.min(totalPages, start + maxVisible - 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }, [pagination.page, totalPages]);

    // Debounced search
    const handleSearch = useCallback((value: string) => {
        onSearch(value);
    }, [onSearch]);

    return (
        <div className="relative">
            {/* Add Button */}
            <div className="flex justify-end mb-3">
                <div className="flex flex-col items-center">
                    <button
                        onClick={onAdd}
                        className="flex flex-col cursor-pointer items-center gap-1 px-4 py-5 bg-primary text-white rounded-3xl font-medium hover:bg-blue-700 transition-colors shadow-lg"
                        title="Add Position"
                    >
                        <Briefcase className="w-8 h-8" />
                    </button>
                    <span className="text-primary font-bold">Add Position</span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border-2 border-primary/20 overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
                    <h3 className="text-xl font-medium text-text">Position List</h3>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 w-64 border border-gray-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary transition"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-formbg">
                            <tr>
                                {['No.', 'Position Name', 'Position Code', 'Department Name', 'Created Date', 'Updated Date', 'Action'].map((h, idx) => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
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
                                    <td colSpan={7} className="text-center py-12">
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                            className="text-text font-medium"
                                        >
                                            Loading...
                                        </motion.div>
                                    </td>
                                </tr>
                            ) : formattedPositions.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12 text-gray-500">
                                        No positions found.
                                    </td>
                                </tr>
                            ) : (
                                formattedPositions.map((pos, idx) => (
                                    <motion.tr
                                        key={pos._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        // whileHover={{ backgroundColor: 'rgba(211, 226, 255, 0.1)', x: 4 }}
                                        className="border-b border-gray-100"
                                    >
                                        <td className="px-4 py-4 text-text font-medium">
                                            {String(pos.displayIndex).padStart(2, '0')}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <motion.div
                                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                                    className="w-10 h-10 rounded-full bg-linear-to-r from-primary to-accent flex items-center justify-center text-white text-sm font-bold shadow-md"
                                                >
                                                    {pos.initials}
                                                </motion.div>
                                                <span className="font-medium text-text">{pos.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-text">{pos.code}</td>
                                        <td className="px-4 py-4 text-text">{pos.departmentName}</td>
                                        <td className="px-4 py-4 text-gray-600">{pos.formattedCreatedAt}</td>
                                        <td className="px-4 py-4 text-gray-600">{pos.formattedUpdatedAt}</td>
                                        <td className="px-4 py-4">
                                            <PositionActions position={pos} onEdit={onEdit} onDelete={onDelete} />
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-end">
                    <div className="flex items-center gap-3">
                        <select
                            value={pagination.limit}
                            onChange={(e) => onLimitChange(Number(e.target.value))}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                        >
                            {[5, 10, 20].map(v => (
                                <option key={v} value={v}>{v}</option>
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
                            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-formbg transition-colors"
                        >
                            Previous
                        </motion.button>

                        <div className="flex gap-1">
                            {pageNumbers.map(p => (
                                <motion.button
                                    key={p}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onPageChange(p)}
                                    className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                                        p === pagination.page
                                            ? 'bg-primary text-white shadow-lg'
                                            : 'border border-gray-300 hover:bg-formbg text-text'
                                    }`}
                                >
                                    {p}
                                </motion.button>
                            ))}
                        </div>

                        {totalPages > 5 && pagination.page < totalPages - 2 && (
                            <span className="px-2 text-sm text-gray-500">...</span>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onPageChange(pagination.page + 1)}
                            disabled={pagination.page === totalPages}
                            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-formbg transition-colors"
                        >
                            Next
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PositionTable;