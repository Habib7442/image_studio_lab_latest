import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-8 pb-24 md:pt-12 md:pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Text Content */}
          <div className="flex flex-col items-center">
            <h1 className="font-serif text-[clamp(32px,8vw,80px)] font-light leading-[1.1] tracking-tight text-foreground">
              <span className="block mb-6 text-xs font-bold uppercase tracking-[0.4em] text-accent">The Problem</span>
              You see beautiful AI images. <br className="hidden md:block" />
              You <em className="italic text-accent">can't</em> write the prompts.
            </h1>

            <div className="my-16 h-[1px] w-32 bg-border" />

            <h2 className="font-serif text-[clamp(32px,8vw,80px)] font-light leading-[1.1] tracking-tight text-foreground">
              <span className="block mb-6 text-xs font-bold uppercase tracking-[0.4em] text-accent">The Solution</span>
              We already <em className="italic text-accent">wrote</em> them. <br className="hidden md:block" />
              Copy, paste, generate.
            </h2>

            <div className="mt-16 flex justify-center">
              <Link
                href="/packs"
                className="flex items-center gap-3 rounded-full bg-foreground px-12 py-5 text-sm font-semibold text-background transition-all hover:bg-accent hover:scale-105 active:scale-95"
              >
                Explore the Packs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-24 flex flex-wrap justify-center gap-x-12 gap-y-6 border-t border-border pt-12">
              <div className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-widest text-muted">
                <div className="h-2 w-2 rounded-full bg-accent" />
                Master Tested
              </div>
              <div className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-widest text-muted">
                <div className="h-2 w-2 rounded-full bg-accent" />
                Copy-Paste Ready
              </div>
              <div className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-widest text-muted">
                <div className="h-2 w-2 rounded-full bg-accent" />
                Zero Engineering
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
