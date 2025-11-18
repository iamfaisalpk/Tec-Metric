'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ServerCog } from 'lucide-react';

interface DeviceActionsProps {
    onAdd: () => void;
}

const DeviceActions: React.FC<DeviceActionsProps> = ({ onAdd }) => {
    return (
        <div className="flex justify-end mb-6">
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAdd}
                className="flex flex-col items-center gap-2 group cursor-pointer"
            >
                {/* Lucide-react Device Icon */}
                <div className="bg-blue-600 w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                    <ServerCog size={36} strokeWidth={2} color="white" />
                </div>

                <span className="text-blue-600 font-semibold text-sm">
                    Add Device
                </span>
            </motion.button>
        </div>
    );
};

export default DeviceActions;
