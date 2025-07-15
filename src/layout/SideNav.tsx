"use client";

import Image from "next/image";
import SideNavIcon from "./SideNavIcon";
import SideNavSectionTitle from "./SideNavSectionTitle";
import {
  Clock5,
  LayoutGrid,
  LayoutList,
  Rocket,
  SatelliteDish,
} from "lucide-react";
import { useSideNav } from "./useSideNav";

interface NavItem {
  icon?: React.ReactNode;
  label?: string;
  section?: string;
}

export default function SideNav() {
  const { open, closeNav } = useSideNav();
  const navItems: NavItem[] = [
    { icon: <SatelliteDish strokeWidth={2} />, label: "Home" },
    { icon: <Rocket strokeWidth={2} />, label: "Discover" },
    { section: "YOUR STUFF" },
    { icon: <LayoutList strokeWidth={2} />, label: "My Queue" },
    { icon: <LayoutGrid strokeWidth={2} />, label: "My Podcasts" },
    { icon: <Clock5 strokeWidth={2} />, label: "Recents" },
  ];

  // Mobile: show overlay if open, hide if closed. Desktop: always show.
  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity duration-200 ${
          open ? "block" : "hidden"
        }`}
        onClick={closeNav}
        aria-label="Close navigation menu"
      />
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-[#151623] shadow-2xl flex flex-col justify-between p-4 border border-[#23243a] z-50 transition-transform duration-200 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:block`}
        style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
      >
        {/* Logo */}
        <div className="flex flex-col gap-8">
          <div className="px-3">
            <Image src="/logo.svg" alt="Logo" width={56} height={56} />
          </div>
          <nav className="flex flex-col gap-2 w-full">
            {navItems.map((item, idx) =>
              item.section ? (
                <SideNavSectionTitle key={item.section + idx}>
                  {item.section}
                </SideNavSectionTitle>
              ) : item.label && item.icon ? (
                <SideNavIcon
                  key={item.label + idx}
                  icon={item.icon}
                  label={item.label}
                />
              ) : null
            )}
          </nav>
        </div>
        {/* Footer */}
        <div className="text-xs text-[#7a7b8c] flex flex-col gap-1 items-start absolute bottom-4">
          <span>Podbay v2.9.6 by Fancy Soups.</span>
          <div className="flex gap-2">
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              All Podcasts
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
