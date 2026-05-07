import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-background pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
          {/* Brand Info */}
          <div className="max-w-sm">
            <Link href="/" className="relative block h-10 w-40 mb-6">
              <Image 
                src="/logo.png" 
                alt="Image Studio Lab" 
                fill
                sizes="160px"
                className="object-contain object-left"
              />
            </Link>
            <p className="text-base leading-relaxed text-foreground/60 font-serif italic">
              Bridging the gap between creative vision <br className="hidden md:block" />
              and technical AI execution.
            </p>
          </div>

          <div className="flex gap-16 md:gap-32">
            {/* Quick Links */}
            <div>
              <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                Discovery
              </h4>
              <ul className="space-y-3 text-sm font-medium text-foreground/50">
                <li><Link href="/packs" className="hover:text-foreground transition-colors">All Packs</Link></li>
                <li><Link href="/about" className="hover:text-foreground transition-colors">Our Vision</Link></li>
              </ul>
            </div>

            {/* Legal / Social */}
            <div>
              <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                Legal & Social
              </h4>
              <ul className="space-y-3 text-sm font-medium text-foreground/50">
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
                <li>
                  <a 
                    href="https://instagram.com/designnai.official" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-foreground transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden w-full select-none pointer-events-none -mb-4">
        <h2 className="text-[clamp(40px,10vw,200px)] font-serif font-bold text-foreground/[0.03] leading-none text-center whitespace-nowrap tracking-tighter">
          IMAGE STUDIO LAB
        </h2>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="border-t border-white/5 pt-10 pb-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20">
          <p>© {new Date().getFullYear()} Image Studio Lab.</p>
          <p className="italic">A @designnai.official production.</p>
        </div>
      </div>
    </footer>
  );
};
