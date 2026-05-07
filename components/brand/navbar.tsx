"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Packs", href: "/packs" },
  { name: "About", href: "/about" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "nav fixed top-0 left-0 z-50 w-full transition-all duration-500",
        isScrolled 
          ? "border-b border-border bg-background/80 backdrop-blur-xl py-3" 
          : "border-b border-transparent bg-transparent py-6"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
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
              className="hidden items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:bg-accent md:flex hover:scale-105 active:scale-95"
            >
              Browse
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Mobile Sheet Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className="p-2 text-foreground hover:text-accent transition-colors"
                    aria-label="Toggle menu"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] border-l border-border bg-background/95 backdrop-blur-2xl p-0">
                  <SheetHeader className="p-6 border-b border-border">
                    <SheetTitle className="text-left font-serif italic text-accent">
                      Image Studio Lab
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-1 p-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="group flex items-center justify-between py-4 text-lg font-medium text-foreground transition-all hover:text-accent border-b border-border/50"
                      >
                        {link.name}
                        <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                      </Link>
                    ))}
                    
                    <div className="mt-8">
                      <Link
                        href="/packs"
                        className="flex items-center justify-center gap-2 rounded-full bg-foreground py-4 text-sm font-semibold text-background transition-all hover:bg-accent active:scale-95"
                      >
                        Browse All Packs
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Bottom Decorative Element */}
                  <div className="absolute bottom-8 left-0 w-full px-6 opacity-20 pointer-events-none">
                    <p className="font-serif italic text-[40px] leading-none select-none">
                      Master <br /> Prompts.
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
