"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Packs", href: "/packs" },
  { name: "Reviews", href: "/write-review" },
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
        <Link href="/" className="logo group flex items-center gap-2.5 shrink-0 select-none">
          <div className="relative h-7 w-7">
            <Image 
              src="/logo.png" 
              alt="Image Studio Lab Logo" 
              fill
              sizes="28px"
              className="object-contain"
              priority
            />
          </div>
          <span className="font-serif text-sm tracking-widest font-bold text-foreground group-hover:text-lime-400 transition-colors uppercase">
            imagestudiolab
          </span>
        </Link>

        {/* Right Section: Links + CTA */}
        <div className="flex items-center gap-8">
          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-muted transition-colors hover:text-lime-400"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="hidden text-xs font-bold uppercase tracking-widest text-muted transition-colors hover:text-lime-400 md:inline-block cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="hidden items-center gap-2 rounded-xl bg-lime-400 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-lime-300 md:flex hover:scale-103 active:scale-97 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link
                href="/dashboard"
                className="hidden items-center gap-2 rounded-xl bg-lime-400 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-lime-300 md:flex hover:scale-103 active:scale-97"
              >
                AI Workspace
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <div className="hidden md:block">
                <UserButton />
              </div>
            </Show>

            {/* Mobile Sheet Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className="p-2 text-foreground hover:text-lime-400 transition-colors"
                    aria-label="Toggle menu"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] border-l border-white/5 bg-[#09090B]/95 backdrop-blur-2xl p-0">
                  <SheetHeader className="p-6 border-b border-white/5">
                    <SheetTitle className="text-left font-serif font-bold tracking-widest uppercase text-lime-400 text-sm">
                      imagestudiolab
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-1 p-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="group flex items-center justify-between py-4 text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:text-lime-400 border-b border-white/5"
                      >
                        {link.name}
                        <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                      </Link>
                    ))}
                    
                    <div className="mt-8 flex flex-col gap-3">
                      <Show when="signed-out">
                        <SignInButton mode="modal">
                          <button className="w-full text-center py-3.5 rounded-xl border border-white/10 text-foreground hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-widest cursor-pointer">
                            Sign In
                          </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                          <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-lime-400 py-3.5 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-lime-300 active:scale-97 cursor-pointer">
                            Sign Up
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </SignUpButton>
                      </Show>
                      <Show when="signed-in">
                        <Link
                          href="/dashboard"
                          className="flex items-center justify-center gap-2 rounded-xl bg-lime-400 py-3.5 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-lime-300 active:scale-97 mb-2"
                        >
                          Launch AI Workspace
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <div className="flex justify-center py-1">
                          <UserButton />
                        </div>
                      </Show>
                    </div>
                  </div>
                  
                  {/* Bottom Decorative Element */}
                  <div className="absolute bottom-8 left-0 w-full px-6 opacity-20 pointer-events-none">
                    <p className="font-serif italic text-[40px] leading-none select-none text-lime-400">
                      AI <br /> Studio.
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
