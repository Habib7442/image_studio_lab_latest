"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";

const bgImages = [
  "/hero_bg.png",
  "/hero_bg_2.png"
];

export const Hero = () => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 6000); // 6 seconds for a slower, more cinematic fade
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-16 md:pt-48 md:pb-32 min-h-[85vh] flex items-center">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        {bgImages.map((src, i) => (
          <div 
            key={src}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ${
              i === bgIndex ? "opacity-60" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt="Studio Background"
              fill
              priority={i === 0}
              quality={85}
              sizes="100vw"
              className="object-cover object-[75%_center] md:object-center"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-background/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10" />
      </div>

      {/* Shaders / Blobs */}
      <div className="shader-blob top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-accent/10 opacity-50" />
      <div className="shader-blob bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-gold/5" style={{ animationDelay: '-5s', animationDuration: '25s' }} />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Text Content */}
          <div className="flex flex-col items-center">
            <h1 className="font-serif text-[clamp(32px,7vw,72px)] font-light leading-[1.1] tracking-tight text-foreground">
              You see beautiful AI images. <br className="hidden md:block" />
              You can't write the prompts. <br className="hidden md:block" />
              <span className="italic text-accent">We already wrote them.</span> <br />
              Copy. Paste. Generate.
            </h1>
            
            <p className="mt-8 max-w-2xl text-lg text-muted md:text-xl font-serif italic">
              Master-tested prompt packs optimized specifically for <span className="text-foreground not-italic font-sans font-bold tracking-tighter">ChatGPT</span> and <span className="text-foreground not-italic font-sans font-bold tracking-tighter">Gemini</span>.
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
