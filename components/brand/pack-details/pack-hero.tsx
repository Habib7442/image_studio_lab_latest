"use client";

import React, { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShoppingCart, Copy, Check } from "lucide-react";

export const PackHero = ({ pack }: { pack: any }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!pack.masterPrompt) return;
    navigator.clipboard.writeText(pack.masterPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-background pt-12 pb-12 md:pt-24 md:pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_1.2fr]">
          {/* Visual Area */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] border border-border bg-muted shadow-2xl">
            {pack.coverImage && (
              <Image
                src={urlFor(pack.coverImage).width(1000).url()}
                alt={pack.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute left-8 top-8">
              <Badge className="bg-background/90 text-foreground backdrop-blur-md uppercase text-[10px] tracking-widest font-bold border-none px-4 py-2">
                {pack.segment}
              </Badge>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex flex-col">
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted">
              <span className="hover:text-accent cursor-pointer shrink-0">Packs</span>
              <ArrowRight className="h-3 w-3 shrink-0" />
              <span className="text-foreground break-words">{pack.title}</span>
            </nav>

            <h1 className="font-serif text-[clamp(32px,8vw,72px)] font-light leading-[1.05] tracking-tight text-foreground break-words">
              {pack.title.split(' ').map((word: string, i: number) => (
                <span key={i} className="inline-block">
                  {i === 1 ? <em className="italic">{word}&nbsp;</em> : `${word} `}
                </span>
              ))}
            </h1>

            <p className="mt-8 max-w-xl font-serif text-xl font-light italic leading-relaxed text-muted md:text-2xl">
              {pack.description || "Transform your AI generations with our master-tested prompt collection."}
            </p>

            <div className="mt-12 flex flex-col gap-10 border-y border-border py-10">
              {pack.masterPrompt && (
                <div className="group relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <h6 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Master Director Instructions</h6>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Copy and paste into ChatGPT/Gemini before using prompts</p>
                    </div>
                    <button 
                      onClick={handleCopy}
                      className="flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-accent transition-all hover:bg-accent hover:text-white"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copy Prompt
                        </>
                      )}
                    </button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto rounded-sm bg-accent/5 p-8 font-mono text-xs leading-relaxed text-foreground border-l-2 border-accent/40 selection:bg-accent/20 custom-scrollbar">
                    <div className="whitespace-pre-wrap">
                      {pack.masterPrompt}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap items-center gap-10">
                {pack.segment !== 'free' && (
                  <a
                    href={pack.gumroadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-full bg-foreground px-10 py-5 text-sm font-semibold text-background transition-all hover:bg-accent shrink-0"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Get the Pack
                  </a>
                )}

                <div className="flex flex-col gap-1">
                  <h6 className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/40">Compatibility</h6>
                  <p className="text-sm font-medium text-foreground whitespace-nowrap">ChatGPT, Gemini</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
