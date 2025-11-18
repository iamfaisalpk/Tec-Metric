'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Device } from '../types/deviceTypes';

interface DeviceCardProps {
    device: Device;
    onEdit: (device: Device) => void;
    onView: (device: Device) => void;
    onDelete: (device: Device) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onEdit, onView, onDelete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-primary/20 p-6 hover:shadow-xl transition-shadow"
        >
            <div className="flex items-center gap-4 mb-4">
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 rounded-full bg-linear-to-r from-primary to-accent flex items-center justify-center text-white text-lg font-bold shadow-md"
                >
                    {device.deviceName.slice(0, 2).toUpperCase()}
                </motion.div>
                <div>
                    <h3 className="text-lg font-semibold text-text">{device.deviceName}</h3>
                    <p className="text-sm text-gray-600">Serial: {device.serialNo}</p>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <p className="text-sm"><span className="font-medium">IP:</span> {device.deviceIP}</p>
                <p className="text-sm"><span className="font-medium">Attendance:</span> {device.attendanceDevice}</p>
                <p className="text-sm"><span className="font-medium">State:</span> {device.state || 'N/A'}</p>
                <p className="text-sm"><span className="font-medium">City:</span> {device.city || 'N/A'}</p>
            </div>

            <div className="flex gap-2">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onView(device)}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                    View
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onEdit(device)}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Edit
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDelete(device)}
                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                >
                    Delete
                </motion.button>
            </div>
        </motion.div>
    );
};

export default DeviceCard;
