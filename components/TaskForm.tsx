"use client";

import { useState } from "react";
import { createTask } from "@/lib/actions";

interface TaskFormProps {
    onClose: () => void;
    onSuccess?: (task?: any) => void;
}

export default function TaskForm({ onClose, onSuccess }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsSubmitting(true);
        try {
            const newTask = await createTask({ title, description });
            setTitle("");
            setDescription("");
            if (onSuccess) onSuccess(newTask);
            onClose();
        } catch (error) {
            console.error("Failed to create task:", error);
            alert("Error creating task. Please check the console.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full space-y-6 md:space-y-8 animate-in fade-in duration-300">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6 md:mb-8">New Task</h2>

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-[0.2em]">Title</label>
                    <input
                        type="text"
                        className="w-full bg-zinc-900/50 border border-zinc-800 p-3 md:p-4 text-xl md:text-2xl font-light focus:border-white focus:outline-none transition-all text-white placeholder-zinc-700"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        autoFocus
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-[0.2em]">Description</label>
                    <textarea
                        className="w-full bg-zinc-900/50 border border-zinc-800 p-3 md:p-4 text-base md:text-lg font-light focus:border-white focus:outline-none h-40 md:h-48 resize-none transition-all text-white placeholder-zinc-700 leading-relaxed"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add a detailed description..."
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-6 md:pt-8 border-t border-zinc-900">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-white hover:bg-zinc-200 text-black px-6 md:px-8 py-3 rounded-none transition-all active:scale-95 font-bold tracking-widest text-xs uppercase disabled:opacity-50"
                    >
                        {isSubmitting ? "SAVING..." : "SAVE TASK"}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-zinc-500 hover:text-white px-6 py-3 transition-colors uppercase text-xs font-bold tracking-widest"
                    >
                        CANCEL
                    </button>
                </div>
            </form>
        </div>
    );
}
