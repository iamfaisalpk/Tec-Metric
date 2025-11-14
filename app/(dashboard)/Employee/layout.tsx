"use client";

import Employee from "./Employee";

export default function EmployeeLayout({ children }) {
    return (
        <>
            {/* Employee Tabs only */}
            <div className="mb-4">
                <Employee />
            </div>

            {/* The main page content (sidebar from dashboard layout will stay) */}
            <div>
                {children}
            </div>
        </>
    );
}
