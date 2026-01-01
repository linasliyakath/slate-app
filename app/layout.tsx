import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ShellClient from "@/components/ShellClient";
import { ClerkProvider } from "@clerk/nextjs";
import { MobileMenuProvider } from "@/contexts/MobileMenuContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slate",
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
          <MobileMenuProvider>
            <Navbar />
            <ShellClient sidebar={<Sidebar />}>
              {children}
            </ShellClient>
          </MobileMenuProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
