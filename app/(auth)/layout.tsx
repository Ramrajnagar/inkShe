export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen grid places-items-center bg-soft-gradient p-4">
            {children}
        </div>
    )
}
