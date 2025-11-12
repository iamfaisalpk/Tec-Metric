import "../../globals.css";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-formbg flex items-center justify-center min-h-screen">
            <Toaster position="top-right" />

            <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
                {children}
            </div>
        </div>
    );
}
