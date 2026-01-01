import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center w-full absolute left-0 right-0 md:relative md:left-auto md:right-auto md:-mx-6">
      <SignedIn>
        <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">
          select a task or add a new task
        </p>
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="md:hidden flex items-center mb-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={204}
              height={132}
              className="w-16 h-auto opacity-90"
            />
            <h1 className="text-2xl font-bold tracking-tight -ml-1">Slate</h1>
          </div>
          <p className="text-sm md:text-lg font-light tracking-wide italic text-gray-400 px-4">
            Welcome. Please sign in to manage your tasks.
          </p>
        </div>
      </SignedOut>
    </div>
  );
}
