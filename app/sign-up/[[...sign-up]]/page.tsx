import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="flex items-center justify-center min-h-[90vh]">
            <SignUp
                routing="path"
                path="/sign-up"
                signInUrl="/sign-in"
                afterSignUpUrl="/"
                appearance={{
                    elements: {
                        formButtonPrimary: "bg-black text-white border border-white hover:!bg-black hover:!text-white transition-none shadow-none font-bold tracking-tight",
                        footerActionLink: "text-zinc-400 hover:text-white"
                    }
                }}
            />
        </div>
    );
}
