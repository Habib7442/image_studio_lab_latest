import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-16 md:pt-48 md:pb-32 min-h-[80vh] flex items-center">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_bg.png"
          alt="Studio Background"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Shaders / Blobs */}
      <div className="shader-blob top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-accent/10 opacity-50" />
      <div className="shader-blob bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-gold/5" style={{ animationDelay: '-5s', animationDuration: '25s' }} />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Text Content */}
          <div className="flex flex-col items-center">
            <h1 className="font-serif text-[clamp(40px,8vw,90px)] font-light leading-[1.05] tracking-tight text-foreground">
              Master prompts. <br />
              <span className="italic text-accent">Zero engineering.</span>
            </h1>
            
            <p className="mt-8 max-w-xl text-lg text-muted md:text-xl font-serif italic">
              Stop guessing. Start generating. We've already tested the code—you just copy, paste, and create.
            </p>

            <div className="mt-12 flex justify-center">
              <Link
                href="/packs"
                className="group relative flex items-center gap-3 rounded-full bg-foreground px-12 py-5 text-sm font-semibold text-background transition-all hover:bg-accent hover:shadow-[0_0_40px_rgba(229,181,103,0.3)] hover:scale-[1.02] active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore the Packs
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 border-t border-border pt-8">
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                Master Tested
              </div>
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                Copy-Paste Ready
              </div>
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                Zero Engineering
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
