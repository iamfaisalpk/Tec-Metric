import Employee from "./Employee";

export default function EmployeeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="mb-4">
                <Employee />
            </div>
            <div>{children}</div>
        </>
    );
}