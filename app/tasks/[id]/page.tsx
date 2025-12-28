import TaskDetail from "@/components/TaskDetail";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await (params);
    return <TaskDetail id={id} />;
}
