"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
    { name: "Branch", href: "/employee/branch" },
    { name: "Department", href: "/employee/department" },
    { name: "Position", href: "/employee/position" },
    { name: "Document Type", href: "/employee/documenttype" },
    { name: "Employee", href: "/employee/list" }
];

const Employee = () => {
    const pathname = usePathname();

    return (
        <div className="w-full flex justify-start gap-3 py-4">

            {tabs.map((tab) => {
                const isActive =
                    pathname === tab.href ||
                    (pathname === "/employee" && tab.href === "/employee/branch");

                return (
                    <Link
                        key={tab.name}
                        href={tab.href}
                        className={`px-8 py-3 rounded-2xl font-medium text-sm transition-all 
                        ${isActive
                                ? "bg-primary text-white"
                                : "bg-accent text-black hover:bg-primary hover:text-white"
                            }`}
                    >
                        {tab.name}
                    </Link>
                );
            })}
        </div>
    );
};

export default Employee;
