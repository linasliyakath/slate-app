"use server";

import { connectDB } from "@/lib/db";
import { Task } from "@/models/Task";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function createTask(formData: { title: string; description: string }) {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    await connectDB();
    const task = await Task.create({
        title: formData.title,
        description: formData.description,
        userId,
    });

    revalidatePath("/", "layout");
    return JSON.parse(JSON.stringify(task));
}

export async function deleteTask(id: string) {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    await connectDB();
    await Task.findOneAndDelete({ _id: id, userId });

    revalidatePath("/", "layout");
}

export async function updateTask(id: string, data: { title: string; description: string; completed: boolean }) {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    await connectDB();
    await Task.findOneAndUpdate({ _id: id, userId }, data);

    revalidatePath("/", "layout");
}

export async function getTask(id: string) {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    await connectDB();
    const task = await Task.findOne({ _id: id, userId });

    if (!task) return null;
    return JSON.parse(JSON.stringify(task));
}
