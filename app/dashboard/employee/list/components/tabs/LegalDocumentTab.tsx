import React from 'react';
import { Plus } from 'lucide-react';
import { DocumentRow } from '../form/DocumentRow';

interface Doc {
    name: string;
    file: File | null;
    type: string;
}

interface Props {
    documents: Doc[];
    addDocument: () => void;
    removeDocument: (i: number) => void;
    updateDocument: (i: number, field: 'name' | 'file' | 'type', value: string | File | null) => void;
}

export const LegalDocumentTab: React.FC<Props> = ({
    documents,
    addDocument,
    removeDocument,
    updateDocument,
}) => (
    <div className="space-y-6">
        {documents.map((doc, i) => (
            <DocumentRow
                key={i}
                doc={doc}
                idx={i}
                update={updateDocument}
                remove={removeDocument}
            />
        ))}

        <div className="flex justify-center">
            <button
                type="button"
                onClick={addDocument}
                className="px-6 py-2 cursor-pointer bg-green-500 text-white rounded-full hover:bg-green-600 transition flex items-center gap-2"
            >
                <Plus className="w-4 h-4" />
                Add Document
            </button>
        </div>
    </div>
);