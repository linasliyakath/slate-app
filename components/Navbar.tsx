"use client";

import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
    ClerkLoaded
} from "@clerk/nextjs";

export default function Navbar() {
    return (
        <header className="fixed top-0 right-0 p-2 md:p-4 z-50">
            <ClerkLoaded>
                <SignedOut>
                    <div className="hidden md:flex gap-2">
                        <SignInButton mode="modal">
                            <button className="px-3 md:px-5 py-1.5 md:py-2 border border-white text-white transition-all rounded-full text-xs md:text-sm font-bold tracking-tight shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="px-3 md:px-5 py-1.5 md:py-2 border border-white text-white transition-all rounded-full text-xs md:text-sm font-bold tracking-tight shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </div>
                </SignedOut>
                <SignedIn>
                    <div className="flex items-center gap-2 md:gap-4 bg-black/40 backdrop-blur-md p-1 pr-2 md:pr-4 rounded-full border border-white/10">
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-7 h-7 md:w-8 md:h-8 border border-white/20"
                                }
                            }}
                        />
                        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-gray-500 hidden sm:inline">Authenticated</span>
                    </div>
                </SignedIn>
            </ClerkLoaded>
        </header>
    );
}
