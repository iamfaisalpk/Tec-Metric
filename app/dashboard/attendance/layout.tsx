import Attendence from "./Attendance";

export default function AttendenceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="mb-4">
                <Attendence />
            </div>
            <div>{children}</div>
        </>
    );
}