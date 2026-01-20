"use client";

import Link from "next/link";
import { useState } from "react";
import { Keyboard, Menu, X, Play } from "lucide-react";

const navLinks = [
  { href: "/lessons", label: "Lessons" },
  { href: "/games", label: "Games" },
  { href: "/test", label: "Test" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#5BE49B] to-[#00A76F] rounded-xl flex items-center justify-center">
                <Keyboard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#5BE49B] to-[#00A76F] bg-clip-text text-transparent">
                Typing Master Kids
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#6B7280] hover:text-[#00A76F] font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/lessons/1"
              className="bg-gradient-to-r from-[#5BE49B] to-[#00A76F] text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Learning
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#6B7280] hover:text-[#12372A]"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-[#6B7280] hover:text-[#00A76F] hover:bg-[#F8FFFB] rounded-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/lessons/1"
              className="block px-3 py-2 bg-gradient-to-r from-[#5BE49B] to-[#00A76F] text-white rounded-xl font-semibold text-center flex items-center justify-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Play className="w-4 h-4" />
              Start Learning
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
