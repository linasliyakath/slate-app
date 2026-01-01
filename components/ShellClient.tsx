"use client";

import { useMobileMenu } from "@/contexts/MobileMenuContext";

export default function ShellClient({ children, sidebar }: { children: React.ReactNode, sidebar: React.ReactNode }) {
    const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu();

    return (
        <div className="flex min-h-screen relative">
            {/* Mobile Menu Button - Only show when menu is closed */}
            {!isMobileMenuOpen && (
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="md:hidden fixed top-2 left-2 z-50 p-2.5 bg-black text-white border border-zinc-800 rounded shadow-lg hover:bg-zinc-900 transition-colors"
                    aria-label="Open menu"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            )}

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar with mobile slide-in */}
            <div className={`
                fixed md:static inset-y-0 left-0 z-40
                transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {sidebar}
            </div>

            <main className="flex-1 pl-4 md:pl-0 pr-4 md:pr-0 pt-16 md:pt-6 pb-4 md:pb-6 bg-black relative">
                <div className="transition-opacity w-full flex flex-col">
                    <div className="w-full max-w-3xl mx-auto px-6">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
