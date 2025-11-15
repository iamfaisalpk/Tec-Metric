
'use client';

import { motion } from 'framer-motion';
import { Search, Building2 } from 'lucide-react';
import BranchActions from './BranchActions';

import { Branch } from '../hooks/useBranchCRUD';

interface BranchTableProps {
    branches: Branch[];
    loading: boolean;
    search: string;
    pagination: { page: number; limit: number; total: number };
    onSearch: (search: string) => void;
    onAdd: () => void;
    onEdit: (branch: Branch) => void;
    onDelete: (branch: Branch) => void;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

const BranchTable: React.FC<BranchTableProps> = ({
    branches,
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
    const totalPages = Math.ceil(pagination.total / pagination.limit);

    return (
        <div className="relative">
            {/* Add Branch Button - Top Right Corner */}
            <div className="flex flex-col items-end mb-3">
                <div className="flex flex-col items-center">
                    <button
                        onClick={onAdd}
                        className="flex flex-col items-center gap-1 px-4 py-5 cursor-pointer bg-primary text-white rounded-3xl font-medium hover:bg-blue-700 transition-colors shadow-lg"
                        title="Add Branch"
                    >
                        <Building2 className="w-8 h-8" />
                    </button>
                    <span className="text-primary font-bold text-center">Add Branch</span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border-2 border-primary/20 overflow-hidden"
            >
                {/* ---------- Header: Title + Search ---------- */}
                <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
                    <motion.h3
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        className="text-xl font-medium text-text"
                    >
                        Branch List
                    </motion.h3>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => onSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 w-64 border border-gray-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                        />
                    </div>
                </div>

                {/* ---------- Table ---------- */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-formbg">
                            <tr>
                                {[
                                    'No.',
                                    'Branch',
                                    'Branch Code',
                                    'Phone No',
                                    'State',
                                    'City',
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
                                    <td colSpan={9} className="text-center py-12">
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
                            ) : branches.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="text-center py-12 text-gray-500">
                                        No branches found.
                                    </td>
                                </tr>
                            ) : (
                                branches.map((branch, idx) => (
                                    <motion.tr
                                        key={branch._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{
                                            backgroundColor: 'rgba(211, 226, 255, 0.1)',
                                            x: 4
                                        }}
                                        className="border-b border-gray-100 transition-all"
                                    >
                                        <td className="px-4 py-4 text-text font-medium">
                                            {String(idx + 1 + (pagination.page - 1) * pagination.limit).padStart(2, '0')}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <motion.div
                                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                                    className="w-10 h-10 rounded-full bg-linear-to-r from-primary to-accent flex items-center justify-center text-white text-sm font-bold shadow-md"
                                                >
                                                    {branch.name.slice(0, 2).toUpperCase()}
                                                </motion.div>
                                                <span className="font-medium text-text">
                                                    {branch.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-text">{branch.code}</td>
                                        <td className="px-4 py-4 text-text">{branch.phone}</td>
                                        <td className="px-4 py-4 text-text">{branch.state}</td>
                                        <td className="px-4 py-4 text-text">{branch.city}</td>
                                        <td className="px-4 py-4 text-gray-600">
                                            {new Date(branch.createdAt).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className="px-4 py-4 text-gray-600">
                                            {branch.updatedAt ? new Date(branch.updatedAt).toLocaleDateString('en-GB') : 'N/A'}
                                        </td>
                                        <td className="px-4 py-4">
                                            <BranchActions branch={branch} onEdit={onEdit} onDelete={onDelete} />
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
                            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-formbg transition-colors"
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
                                    className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${p === pagination.page
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
                            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-formbg transition-colors"
                        >
                            Next
                        </motion.button>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default BranchTable;