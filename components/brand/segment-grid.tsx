import React from "react";
import Link from "next/link";
import { SEGMENTS } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export const SegmentGrid = () => {
  return (
    <section className="bg-background py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            02 / Discovery
          </span>
          <h2 className="mt-4 font-serif text-5xl font-light leading-tight tracking-tight text-foreground">
            Built for <em className="italic">every</em> niche.
          </h2>
          <p className="mt-4 text-muted">
            Whether you're scaling an Etsy shop or building a personal brand, 
            our packs are tested for your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-1 border border-border bg-border md:grid-cols-2">
          {SEGMENTS.map((segment, index) => (
            <Link
              key={segment.id}
              href={`/packs?segment=${segment.id}`}
              className="group relative flex flex-col bg-background p-10 transition-colors hover:bg-[#F2EDE5]"
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  0{index + 1} / {segment.id}
                </span>
                <ArrowUpRight className="h-5 w-5 text-border transition-colors group-hover:text-accent" />
              </div>

              <h3 className="font-serif text-3xl font-medium text-foreground">
                {segment.name}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                {segment.desc}
              </p>

              <div className="mt-10 border-t border-border pt-6">
                <ul className="space-y-3">
                  {segment.packs.map((pack) => (
                    <li key={pack.name} className="flex items-center justify-between text-xs font-medium">
                      <span className="text-foreground">{pack.name}</span>
                      <span className="font-mono text-accent">{pack.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
