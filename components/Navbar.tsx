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
        <header className="fixed top-0 right-0 p-4 z-50">
            <ClerkLoaded>
                <SignedOut>
                    <div className="flex gap-2">
                        <SignInButton mode="modal">
                            <button className="px-5 py-2 border border-white text-white transition-all rounded-full text-sm font-bold tracking-tight shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="px-5 py-2 border border-white text-white transition-all rounded-full text-sm font-bold tracking-tight shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </div>
                </SignedOut>
                <SignedIn>
                    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-1 pr-4 rounded-full border border-white/10">
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-8 h-8 border border-white/20"
                                }
                            }}
                        />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">Authenticated</span>
                    </div>
                </SignedIn>
            </ClerkLoaded>
        </header>
    );
}
