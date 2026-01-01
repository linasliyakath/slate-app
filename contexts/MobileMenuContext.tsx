"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MobileMenuContextType {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (value: boolean) => void;
    closeMobileMenu: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined);

export function MobileMenuProvider({ children }: { children: ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <MobileMenuContext.Provider value={{ isMobileMenuOpen, setIsMobileMenuOpen, closeMobileMenu }}>
            {children}
        </MobileMenuContext.Provider>
    );
}

export function useMobileMenu() {
    const context = useContext(MobileMenuContext);
    if (context === undefined) {
        throw new Error("useMobileMenu must be used within a MobileMenuProvider");
    }
    return context;
}
