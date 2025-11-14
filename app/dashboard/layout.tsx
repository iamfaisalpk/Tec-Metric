'use client';

// import ProtectedWrapper from "../layout/ProtectedWrapper";
import Navbar from "./navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        // <ProtectedWrapper>
        <div className="flex min-h-screen">
            {/* Sidebar – sticky inside scrolling parent */}
            <Sidebar />

            {/* Main content area – this will scroll */}
            <div className="flex-1 flex flex-col min-h-screen">
                <Navbar />

                {/* This is the scrolling container */}
                <motion.main className="flex-1 p-6 overflow-y-auto bg-gray-50">
                    {children}
                </motion.main>
            </div>
        </div>
        // </ProtectedWrapper>
    );
}