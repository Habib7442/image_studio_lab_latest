import React from "react";
import Image from "next/image";
import { ConvertKitForm } from "@/components/brand/convertkit-form";
import { ShieldCheck, Zap, Download } from "lucide-react";

export default function TryFreePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Abstract Background Element */}
        <div className="absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
        
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            
            {/* Left: Content */}
            <div className="flex flex-col">
              <div className="mb-8 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Download className="h-3 w-3" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                  Free Laboratory Access
                </span>
              </div>

              <h1 className="font-serif text-[clamp(40px,5vw,80px)] font-light leading-[0.95] tracking-tight text-foreground">
                Master the <em className="italic text-accent">light.</em> <br />
                For free.
              </h1>

              <p className="mt-8 max-w-lg font-serif text-xl font-light italic leading-relaxed text-muted md:text-2xl">
                Get a mini-collection of 5 master-tested prompts and our Master Director system guide. Zero cost. Instant access.
              </p>

              <div className="mt-12">
                <ConvertKitForm />
              </div>

              <div className="mt-16 flex items-center gap-8 border-t border-border pt-12">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                  <Zap className="h-4 w-4 text-accent" />
                  Instant Download
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  No Credit Card
                </div>
              </div>
            </div>

            {/* Right: Mockup / Visual */}
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[4px] border border-border bg-background shadow-2xl transition-transform hover:scale-[1.02] lg:ml-auto">
               <div className="absolute inset-0 bg-gradient-to-br from-[#15110D] to-[#2B1F18]" />
               
               {/* Editorial Label Overlay */}
               <div className="absolute inset-0 p-12 flex flex-col justify-between text-white">
                  <div>
                    <h2 className="font-serif text-5xl font-light leading-none tracking-tight">
                      Free <br /> <em className="italic">Samples.</em>
                    </h2>
                    <div className="mt-6 h-[1px] w-12 bg-white/30" />
                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-white/50">
                      Vol. 01 / Basic Studio
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/70">
                      <div className="h-1 w-1 rounded-full bg-accent" />
                      Master Director V1.0
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/70">
                      <div className="h-1 w-1 rounded-full bg-accent" />
                      5 Cinematic Prompts
                    </div>
                  </div>
               </div>

               {/* Decorative Element */}
               <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/20 blur-[80px]" />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
