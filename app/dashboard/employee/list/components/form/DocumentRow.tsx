import React from 'react';
import { Trash2 } from 'lucide-react';
import { FormField } from './FormField';
import CommonSelect from '@/app/dashboard/common/components/CommonSelect';

interface Doc {
    name: string;
    file: File | null;
    type: string;
}

interface DocumentRowProps {
    doc: Doc;
    idx: number;
    update: (i: number, field: 'name' | 'file' | 'type', value: string | File | null) => void;
    remove: (i: number) => void;
}

export const DocumentRow: React.FC<DocumentRowProps> = ({
    doc,
    idx,
    update,
    remove,
}) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 items-start">
        <FormField label="Document Name">
            <input
                value={doc.name}
                onChange={e => update(idx, 'name', e.target.value)}
                placeholder="Enter document name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </FormField>

        <FormField label="Document File">
            <div className="flex items-center gap-2">
                <input
                    type="file"
                    onChange={e => update(idx, 'file', e.target.files?.[0] ?? null)}
                    className="flex-1 cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-white"
                />
                {doc.file && <span className="text-sm text-gray-600 cursor-pointer">{doc.file.name}</span>}
            </div>
        </FormField>

        <FormField label="Document Type">
            <CommonSelect
                options={[
                    { value: 'aadhar', label: 'Aadhaar' },
                    { value: 'pan', label: 'PAN' },
                ]}
                value={doc.type}
                onChange={v => update(idx, 'type', v)}
                placeholder="Select type"
            />
        </FormField>

        <div className="flex items-center justify-end md:col-span-2">
            <button
                type="button"
                onClick={() => remove(idx)}
                className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-full hover:bg-red-600 transition flex items-center gap-1"
            >
                <Trash2 className="w-4 h-4" />
                Remove
            </button>
        </div>
    </div>
);