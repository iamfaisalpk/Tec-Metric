import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Position {
    _id: string;
    name: string;
    code: string;
    departmentId: string;
    createdAt: string;
    updatedAt?: string;
}

interface PositionActionsProps {
    position: Position;
    onEdit: (position: Position) => void;
    onDelete: (position: Position) => void;
}

const PositionActions: React.FC<PositionActionsProps> = ({ position, onEdit, onDelete }) => {
    return (
        <div className="flex items-center gap-2">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEdit(position)}
                className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                title="Edit"
            >
                <PencilIcon className="w-4 h-4" />
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(position)}
                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                title="Delete"
            >
                <TrashIcon className="w-4 h-4" />
            </motion.button>
        </div>
    );
};

export default PositionActions;
