"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Task } from "@/types/task";
import { useMobileMenu } from "@/contexts/MobileMenuContext";

import { SignedIn, SignedOut, SignInButton, SignUpButton, ClerkLoaded } from "@clerk/nextjs";

export default function SidebarClient({ tasks }: { tasks: Task[] }) {
    const pathname = usePathname();
    const { closeMobileMenu } = useMobileMenu();

    return (
        <>
            <ClerkLoaded>
                <SignedOut>
                    <div className="flex flex-col gap-2 mb-6 md:hidden">
                        <SignInButton mode="modal">
                            <button onClick={closeMobileMenu} className="w-full px-4 py-2 border border-white text-white transition-all rounded-full text-xs font-bold tracking-tight text-center">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button onClick={closeMobileMenu} className="w-full px-4 py-2 border border-white text-white transition-all rounded-full text-xs font-bold tracking-tight text-center">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </div>
                </SignedOut>
            </ClerkLoaded>
            <SignedIn>
                <Link
                    href="/tasks/new"
                    onClick={closeMobileMenu}
                    className="block w-full bg-white text-black border border-white hover:bg-gray-200 text-center py-2 px-4 rounded-full mb-6 font-bold transition-all uppercase tracking-widest text-[10px] active:scale-95"
                >
                    {"+ New Task"}
                </Link>

                <h2 className="text-gray-500 text-[10px] font-black mb-2 uppercase tracking-[0.3em] px-2">Task List</h2>
                <ul className="space-y-1">
                    {tasks.map((task) => {
                        const isActive = pathname === `/tasks/${task._id}`;
                        return (
                            <li key={task._id} className="mb-1">
                                <Link
                                    href={`/tasks/${task._id}`}
                                    onClick={closeMobileMenu}
                                    className={`block px-3 py-2 rounded truncate transition-all border ${isActive
                                        ? "border-white bg-white text-black font-bold"
                                        : "border-gray-800 hover:border-gray-600 text-gray-300"
                                        } ${task.completed ? "line-through opacity-50" : ""}`}
                                >
                                    {task.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </SignedIn>
        </>
    );
}
