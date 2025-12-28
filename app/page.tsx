import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <SignedIn>
        <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">
          select a task or add a new task
        </p>
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-lg font-light tracking-wide italic text-gray-400">
            Welcome. Please sign in to manage your tasks.
          </p>
        </div>
      </SignedOut>
    </div>
  );
}
