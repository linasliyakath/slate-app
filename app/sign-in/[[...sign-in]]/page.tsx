import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="flex items-center justify-center min-h-[90vh] ">
            <SignIn
                routing="path"
                path="/sign-in"
                signUpUrl="/sign-up"
                afterSignInUrl="/"
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
