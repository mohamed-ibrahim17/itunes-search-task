"use client";

import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Menu,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useITunesSearch } from "@/hooks/useITunesSearch";
import { useSideNav } from "./useSideNav";

const MENU_ITEMS = [
  "Settings",
  "About Podbay",
  "What's New",
  "Podcaster FAQ",
  "Privacy",
  "Terms",
  "Contact & Feedback",
  "Clear Data...",
];

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { toggleNav } = useSideNav();
  const { searchTerm, setSearchTerm } = useITunesSearch();

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="w-full flex items-center justify-between px-6 py-3 shadow-md">
      {/* Hamburger icon for mobile */}
      <button
        className="block md:hidden p-2 mr-2 rounded-full text-gray-300 hover:text-white focus:outline-none"
        onClick={toggleNav}
        aria-label="Toggle navigation menu"
      >
        <Menu strokeWidth={2} />
      </button>

      <div className="items-center gap-2 hidden md:flex">
        {/* Back/Forward buttons (hidden on mobile) */}
        <button className="hidden md:inline text-xl text-gray-300 hover:text-white focus:outline-none">
          <span className="material-symbols-outlined">
            <ChevronLeft strokeWidth={2} />
          </span>
        </button>
        <button className="hidden md:inline text-xl text-gray-300 hover:text-white focus:outline-none">
          <span className="material-symbols-outlined">
            <ChevronRight strokeWidth={2} />
          </span>
        </button>
      </div>
      {/* Center: Search */}
      <div className="flex-1 md:mx-6" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search through over 70 million podcasts and episodes..."
          className="w-full rounded-lg px-5 py-2 bg-[#232136] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Right: Auth & Menu */}
      <div className="flex items-center gap-3 relative">
        <button className="hidden md:inline px-4 py-1 rounded bg-transparent border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition">
          Log in
        </button>
        <button className="hidden md:inline px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition">
          Sign up
        </button>
        {/* Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="ml-2 p-2 rounded-full cursor-pointer hover:bg-[#232136] focus:outline-none"
            aria-label="Open menu"
          >
            <EllipsisVertical strokeWidth={2} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-gradient-to-r from-[#2d2a4a] to-[#3a2d5a] border border-gray-700 rounded-lg shadow-lg z-50 py-2">
              {MENU_ITEMS.map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-5 py-2 text-gray-200 hover:bg-[#2d2a4a] hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
