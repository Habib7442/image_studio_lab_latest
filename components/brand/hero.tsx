import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[1.4fr_1fr]">
          {/* Text Content */}
          <div className="flex flex-col">
            <div className="mb-8 flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                The Prompt Studio
              </span>
              <div className="h-[1px] w-12 bg-border" />
            </div>

            <h1 className="font-serif text-[clamp(48px,8vw,110px)] font-light leading-[0.95] tracking-tight text-foreground">
              Master <em className="italic">prompts.</em> <br />
              Beautiful AI <em className="italic">images.</em>
            </h1>

            <p className="mt-8 max-w-lg font-serif text-xl font-light italic leading-relaxed text-muted md:text-2xl">
              Curated, copy-paste prompt packs for ChatGPT and Gemini. 
              Professional results without the prompt engineering.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/packs"
                className="flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-all hover:bg-accent"
              >
                Explore Packs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/vault"
                className="flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-medium text-foreground transition-all hover:bg-foreground hover:text-background"
              >
                Studio Vault
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 flex flex-wrap gap-8 border-t border-border pt-12">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                Master Tested
              </div>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                Copy-Paste Ready
              </div>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                Zero Engineering
              </div>
            </div>
          </div>

          {/* Visual Box */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-gradient-to-br from-[#2B1F18] via-[#5A3A28] to-[#E8B86F] shadow-2xl">
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
            
            {/* Label */}
            <div className="absolute left-6 top-6 text-[10px] uppercase tracking-[0.2em] text-white/70">
              01 / Studio Sample
            </div>

            {/* Visual Text */}
            <div className="absolute bottom-10 left-10 right-10">
              <h2 className="font-serif text-3xl font-light italic leading-tight text-white/95">
                "Cinematic lighting, Hasselblad X2D, 80mm f/1.9..."
              </h2>
            </div>

            {/* Meta */}
            <div className="absolute bottom-6 right-6 text-right text-[10px] uppercase tracking-widest text-white/80">
              Output: Gemini Pro
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
