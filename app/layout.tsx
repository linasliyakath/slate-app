import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ShellClient from "@/components/ShellClient";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Minimalist Black & White Task Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} bg-black text-white`} suppressHydrationWarning>
          <Navbar />
          <ShellClient sidebar={<Sidebar />}>
            {children}
          </ShellClient>
        </body>
      </html>
    </ClerkProvider>
  );
}
