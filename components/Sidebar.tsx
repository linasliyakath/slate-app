import Image from "next/image";
import SidebarClient from "./SidebarClient";
import { Task } from "@/models/Task";
import { connectDB } from "@/lib/db";


// Force dynamic rendering so it fetches fresh data on refresh
export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";

async function getTasks() {
    try {
        const authObj = await auth();
        let userId = authObj.userId;

        if (!userId) return [];

        await connectDB();
        const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(tasks));
    } catch (e) {
        console.error("Failed to fetch tasks:", e);
        return [];
    }
}

export default async function Sidebar() {
    const tasks = await getTasks();

    return (
        <aside className="w-64 bg-black text-white min-h-screen flex flex-col fixed left-0 top-0 overflow-y-auto border-r border-gray-900">
            <div className="p-6 flex items-center gap-4">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={204}
                    height={132}
                    className="w-16 h-auto opacity-90"
                />
                <h1 className="text-2xl font-bold tracking-tight">Slate</h1>
            </div>

            <div className="px-4 flex flex-col gap-2">
                <SidebarClient tasks={tasks} />
            </div>


        </aside>
    );
}
