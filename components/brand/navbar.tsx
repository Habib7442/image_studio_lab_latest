"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Packs", href: "/packs" },
  { name: "About", href: "/about" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav sticky top-0 z-50 w-full border-b border-border bg-background/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo: Extreme Left */}
        <Link href="/" className="logo group relative flex items-center h-10 w-40">
          <Image 
            src="/logo.png" 
            alt="Image Studio Lab" 
            fill
            sizes="160px"
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Right Section: Links + CTA */}
        <div className="flex items-center gap-8">
          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-accent"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/packs"
              className="hidden items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:bg-accent md:flex"
            >
              Browse
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Mobile Toggle */}
            <button
              className="p-2 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full w-full border-b border-border bg-background px-6 py-8 shadow-xl md:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/packs"
              className="flex items-center justify-center gap-2 rounded-full bg-foreground py-4 text-background"
              onClick={() => setIsOpen(false)}
            >
              Browse Packs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
