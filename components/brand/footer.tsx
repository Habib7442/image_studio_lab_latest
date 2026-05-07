import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="relative block h-8 w-32 mb-4">
              <Image 
                src="/logo.png" 
                alt="Image Studio Lab" 
                fill
                sizes="128px"
                className="object-contain object-left"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Master prompts. Beautiful AI images. <br />
              Zero prompt engineering.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-foreground">
              Explore
            </h4>
            <ul className="space-y-4 text-sm font-medium text-muted">
              <li><Link href="/packs" className="hover:text-accent">Prompt Packs</Link></li>
            </ul>
          </div>

          {/* Legal / Social */}
          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-foreground">
              Studio
            </h4>
            <ul className="space-y-4 text-sm font-medium text-muted">
              <li><Link href="/about" className="hover:text-accent">About</Link></li>
              <li><Link href="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-accent">Terms of Service</Link></li>
              <li>
                <a 
                  href="https://instagram.com/designnai.official" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-accent"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 text-center md:flex md:items-center md:justify-between md:text-left">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Image Studio Lab. All rights reserved.
          </p>
          <p className="mt-4 text-xs italic text-muted-foreground md:mt-0">
            A @designnai.official production.
          </p>
        </div>
      </div>
    </footer>
  );
};
