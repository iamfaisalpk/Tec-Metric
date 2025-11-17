'use client';

import React, { useState, useEffect, FC } from 'react';
import {
    X,
    User,
    Briefcase,
    Shield,
    FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm,  } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { PersonalDetailsTab } from './tabs/PersonalDetailsTab';
import { WorkInfoTab } from './tabs/WorkInfoTab';
import { DeviceAccessTab } from './tabs/DeviceAccessTab';
import { LegalDocumentTab } from './tabs/LegalDocumentTab';



const validatePhone = (value: string) => {
    if (!value) return true;
    const phoneNumber = parsePhoneNumberFromString(value);
    return phoneNumber ? phoneNumber.isValid() : false;
};

const schema = z.object({
    employeeId: z.string().min(1, 'Employee ID'),
    firstName: z.string().min(1, 'First name'),
    lastName: z.string().min(1, 'Last name'),
    gender: z.string().min(1, 'Gender'),
    dateOfBirth: z.string().min(1, 'Date of birth'),
    phone: z.string().refine(validatePhone, 'Invalid phone number'),
    phoneOptional: z.string().optional().refine((v) => !v || validatePhone(v), 'Invalid phone number'),
    email: z.string().email('Invalid email address'),
    nationality: z.string().min(1, 'Nationality'),
    fatherName: z.string().min(1, "Father's name"),
    motherName: z.string().min(1, "Mother's name"),
    qualification: z.string().min(1, 'Qualification'),
    fieldOfStudy: z.string().min(1, 'Field of study'),
    maritalStatus: z.string().min(1, 'Marital status'),
    residentialAddress: z.string().min(1, 'Residential address'),
    branch: z.string().min(1, 'Branch'),
    department: z.string().min(1, 'Department'),
    position: z.string().min(1, 'Position'),
    superior: z.string().min(1, 'Superior'),
    dateOfJoin: z.string().min(1, 'Date of join'),
    salary: z.string().min(1, 'Salary'),
    verifyMode: z.string().min(1, 'Verify mode'),
    cardNo: z.string().optional(),
    enrollDevice: z.string().optional(),
    plmQty: z.string().optional(),
    devicePrivilege: z.string().min(1, 'Device privilege'),
    pin: z.string().optional(),
    fpQty: z.string().optional(),
    faceQty: z.string().optional(),
    documents: z.array(
        z.object({
            name: z.string().min(1, 'Document name'),
            file: z.instanceof(File).nullable().optional(),
            type: z.string().min(1, 'Document type'),
        })
    ).optional(),
});

export type FormData = z.infer<typeof schema>;

interface EmployeeFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: FormData) => void;
    editData?: Partial<FormData>;
    isEdit?: boolean;
}

const EmployeeForm: FC<EmployeeFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    editData,
    isEdit = false,
}) => {
    const [activeTab, setActiveTab] = useState(0);
    const [documents, setDocuments] = useState<
        { name: string; file: File | null; type: string }[]
    >([{ name: '', file: null, type: '' }]);

    const tabs = [
        { label: 'Personal Details', icon: User },
        { label: 'Work Information', icon: Briefcase },
        { label: 'Device Access', icon: Shield },
        { label: 'Legal & Document', icon: FileText },
    ];

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            employeeId: '',
            firstName: '',
            lastName: '',
            gender: '',
            dateOfBirth: '',
            phone: '',
            phoneOptional: '',
            email: '',
            nationality: '',
            fatherName: '',
            motherName: '',
            qualification: '',
            fieldOfStudy: '',
            maritalStatus: '',
            residentialAddress: '',
            branch: '',
            department: '',
            position: '',
            superior: '',
            dateOfJoin: '',
            salary: '',
            verifyMode: '',
            devicePrivilege: '',
        },
    });

    useEffect(() => {
        if (editData && isEdit) {
            Object.entries(editData).forEach(([k, v]) => {
                if (k !== 'documents') {
                    setValue(k as keyof FormData, v ?? '');
                }
            });
            if (Array.isArray(editData.documents)) {
                setDocuments(editData.documents.map(d => ({
                    ...d,
                    file: d.file ?? null,
                })));
            }
        } else {
            reset();
            setDocuments([{ name: '', file: null, type: '' }]);
        }
    }, [editData, isEdit, setValue, reset]);

    const addDocument = () => setDocuments(p => [...p, { name: '', file: null, type: '' }]);
    const removeDocument = (i: number) => setDocuments(p => p.filter((_, idx) => idx !== i));
    const updateDocument = (
        i: number,
        field: 'name' | 'file' | 'type',
        value: string | File | null
    ) => {
        setDocuments(p =>
            p.map((doc, idx) => (idx === i ? { ...doc, [field]: value } : doc))
        );
    };

    const onFormSubmit = (data: FormData) => {
        onSubmit({ ...data, documents });
    };

    const goNext = () => setActiveTab(c => Math.min(c + 1, tabs.length - 1));
    const goBack = () => setActiveTab(c => Math.max(c - 1, 0));

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex gap-2">
                            {tabs.map((tab, i) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setActiveTab(i)}
                                        className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === i
                                                ? 'bg-primary text-white shadow-md'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {Icon && <Icon className="w-4 h-4" />}
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                        <button type="button" onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="p-6">
                        {activeTab === 0 && <PersonalDetailsTab control={control} errors={errors} />}
                        {activeTab === 1 && <WorkInfoTab control={control} errors={errors} />}
                        {activeTab === 2 && <DeviceAccessTab control={control} errors={errors} />}
                        {activeTab === 3 && (
                            <LegalDocumentTab
                                documents={documents}
                                addDocument={addDocument}
                                removeDocument={removeDocument}
                                updateDocument={updateDocument}
                            />
                        )}

                        <div className="flex justify-between mt-8">
                            <button
                                type="button"
                                onClick={goBack}
                                disabled={activeTab === 0}
                                className="px-6 py-2 cursor-pointer bg-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition"
                            >
                                Back
                            </button>
                            {activeTab < tabs.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={goNext}
                                    className="px-6 py-2 cursor-pointer bg-primary text-white rounded-full hover:bg-primary/90 transition"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-primary cursor-pointer text-white rounded-full hover:bg-primary/90 transition"
                                >
                                    {isEdit ? 'Update' : 'Add'}
                                </button>
                            )}
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default EmployeeForm;