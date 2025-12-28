export default function ShellClient({ children, sidebar }: { children: React.ReactNode, sidebar: React.ReactNode }) {
    return (
        <div className="flex min-h-screen relative">
            {sidebar}
            <main className="flex-1 ml-64 p-8 bg-black relative">
                <div className="transition-opacity">
                    {children}
                </div>
            </main>
        </div>
    );
}
