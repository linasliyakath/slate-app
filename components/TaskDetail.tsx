"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { useRouter } from "next/navigation";
import { deleteTask, updateTask, getTask } from "@/lib/actions";

export default function TaskDetail({ id }: { id: string }) {
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editCompleted, setEditCompleted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        const fetchTask = async () => {
            try {
                const found = await getTask(id);

                if (!found) {
                    throw new Error("Task not found");
                }

                setTask(found);
                setEditTitle(found.title);
                setEditDescription(found.description || "");
                setEditCompleted(found.completed);
            } catch (e: any) {
                console.error("Error in fetchTask:", e);
                setError(e.message || "Could not load task details.");
                setTask(null);
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    if (loading) return (
        <div className="flex items-center justify-center p-20 animate-pulse text-zinc-500 font-light tracking-widest uppercase text-sm">
            Loading...
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center p-20 text-red-500 gap-4">
            <p className="font-light tracking-widest uppercase text-sm">{error}</p>
            <button onClick={() => router.push('/')} className="text-xs border-b border-red-500 hover:text-white transition-colors pb-1">Return to Dashboard</button>
        </div>
    );

    if (!task) return null;

    const handleUpdate = async () => {
        try {
            await updateTask(task._id, {
                title: editTitle,
                description: editDescription,
                completed: editCompleted
            });

            setTask({ ...task, title: editTitle, description: editDescription, completed: editCompleted });
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update task", error);
        }
    };

    const handleDelete = async () => {
        try {
            if (!confirm("Are you sure you want to delete this task?")) return;
            await deleteTask(task._id);
            router.push("/");
        } catch (error) {
            console.error("Failed to delete task", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto pt-10">
            {isEditing ? (
                <div className="space-y-8 animate-in fade-in duration-300">
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-[0.2em]">Title</label>
                        <input
                            className="w-full bg-zinc-900/50 border border-zinc-800 p-4 text-2xl font-light focus:border-white focus:outline-none transition-all text-white placeholder-zinc-700"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Task Title"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-[0.2em]">Description</label>
                        <textarea
                            className="w-full bg-zinc-900/50 border border-zinc-800 p-4 text-lg font-light focus:border-white focus:outline-none h-48 resize-none transition-all text-white placeholder-zinc-700 leading-relaxed"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Add a detailed description..."
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-[0.2em]">Status</label>
                        <div className="flex items-center gap-3 pt-2 group cursor-pointer" onClick={() => setEditCompleted(!editCompleted)}>
                            <div className={`w-6 h-6 border transition-all flex items-center justify-center ${editCompleted ? 'bg-white border-white' : 'border-zinc-700 group-hover:border-zinc-500'}`}>
                                {editCompleted && <div className="w-3 h-3 bg-black" />}
                            </div>
                            <span className="text-lg font-light text-zinc-300 group-hover:text-white transition-colors">Mark as Completed</span>
                        </div>
                    </div>
                    <div className="flex gap-4 pt-8 border-t border-zinc-900">
                        <button
                            onClick={handleUpdate}
                            className="bg-white hover:bg-zinc-200 text-black px-8 py-3 rounded-none transition-all active:scale-95 font-bold tracking-widest text-xs uppercase"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="text-zinc-500 hover:text-white px-6 py-3 transition-colors uppercase text-xs font-bold tracking-widest"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in duration-500">
                    <div className="flex justify-between items-start mb-12 border-b border-zinc-900 pb-10">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <h1 className={`text-4xl md:text-5xl font-light tracking-tighter text-white ${task.completed ? "line-through text-zinc-600" : ""}`}>{task.title}</h1>
                                {task.completed && <span className="text-[10px] bg-emerald-900/30 text-emerald-500 border border-emerald-900/50 px-3 py-1 uppercase tracking-[0.2em] font-bold">Done</span>}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-zinc-400 border border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-zinc-700 px-6 py-2 text-[10px] transition-all uppercase tracking-[0.2em] font-bold"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="text-rose-900 border border-rose-900/20 hover:border-rose-900 hover:bg-rose-950/30 hover:text-rose-500 px-6 py-2 text-[10px] transition-all uppercase tracking-[0.2em] font-bold"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className="prose max-w-none">
                        <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-6">Description</h3>
                        <div className="bg-zinc-900/20 border border-zinc-900/50 p-8 min-h-[12rem]">
                            <p className="whitespace-pre-wrap text-lg text-zinc-300 leading-relaxed font-light">{task.description || <span className="text-zinc-700 italic">No description provided.</span>}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
