'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers2Icon } from 'lucide-react';

interface DocumentTypeActionsProps {
    onAdd: () => void;
}

const DocumentTypeActions: React.FC<DocumentTypeActionsProps> = ({ onAdd }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-end mb-3"
        >
            {/* Card Button */}
            <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={onAdd}
                className="flex flex-col items-center gap-2"
            >
                {/* Blue Rounded Icon Box */}
                <div className="bg-blue-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center shadow-md">
                    <Layers2Icon className="w-8 h-8" />
                </div>

                {/* Text */}
                <span className="text-blue-600 font-semibold text-sm">
                    Add Document
                </span>
            </motion.button>
        </motion.div>
    );
};

export default DocumentTypeActions;
