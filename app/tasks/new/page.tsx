"use client";

import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";

export default function NewTaskPage() {
    const router = useRouter();

    return (
        <div className="w-full pt-4 md:pt-10">
            <TaskForm
                onClose={() => router.back()}
                onSuccess={(task) => {
                    if (task?._id) {
                        router.push(`/tasks/${task._id}`);
                    } else {
                        router.push('/');
                    }
                }}
            />
        </div>
    );
}
