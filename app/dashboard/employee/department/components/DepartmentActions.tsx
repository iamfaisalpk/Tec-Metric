import React from 'react';

interface Department {
    _id: string;
    name: string;
    code: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

interface DepartmentActionsProps {
    department: Department;
    onEdit: (department: Department) => void;
    onDelete: (department: Department) => void;
}

const DepartmentActions: React.FC<DepartmentActionsProps> = ({ department, onEdit, onDelete }) => {
    return (
        <div className="flex space-x-2">
            <button
                onClick={() => onEdit(department)}
                className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Edit
            </button>
            <button
                onClick={() => onDelete(department)}
                className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                Delete
            </button>
        </div>
    );
};

export default DepartmentActions;
