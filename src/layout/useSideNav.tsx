"use client";
import React, { createContext, useContext, useState } from "react";

interface SideNavContextType {
  open: boolean;
  openNav: () => void;
  closeNav: () => void;
  toggleNav: () => void;
}

const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

export const SideNavProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const openNav = () => setOpen(true);
  const closeNav = () => setOpen(false);
  const toggleNav = () => setOpen((v) => !v);

  return (
    <SideNavContext.Provider value={{ open, openNav, closeNav, toggleNav }}>
      {children}
    </SideNavContext.Provider>
  );
};

export function useSideNav() {
  const context = useContext(SideNavContext);
  if (!context) {
    throw new Error("useSideNav must be used within a SideNavProvider");
  }
  return context;
}
