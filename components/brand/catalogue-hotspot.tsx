"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HotspotProps {
  x: string; // e.g. "45%"
  y: string; // e.g. "35%"
  title: string;
  description: string;
  price?: string;
  link?: string;
  linkText?: string;
}

export const CatalogueHotspot: React.FC<HotspotProps> = ({
  x,
  y,
  title,
  description,
  price,
  link,
  linkText = "View Prompts",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="absolute z-30 group"
      style={{ top: y, left: x }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Pulsing Radar Ring */}
      <span className="absolute -left-3 -top-3 flex h-6 w-6 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/50 opacity-75"></span>
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_8px_var(--color-gold)]"></span>
      </span>

      {/* Popover Card */}
      <div
        className={cn(
          "absolute left-1/2 bottom-5 -translate-x-1/2 w-64 p-4 rounded-xl border border-white/10 bg-card/90 backdrop-blur-md shadow-2xl transition-all duration-300 pointer-events-none scale-90 opacity-0 origin-bottom z-40",
          isOpen && "pointer-events-auto scale-100 opacity-100 -translate-y-1"
        )}
      >
        {/* Subtle top indicator triangle */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-card/90" />

        <div className="flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-serif text-sm font-semibold tracking-tight text-foreground text-glow leading-snug">
              {title}
            </h4>
            {price && (
              <span className="text-xs font-semibold text-gold font-sans whitespace-nowrap bg-gold/10 px-2 py-0.5 rounded-full">
                {price}
              </span>
            )}
          </div>
          <p className="text-[11px] leading-relaxed text-muted font-sans font-medium">
            {description}
          </p>

          {link && (
            <Link
              href={link}
              className="mt-2 flex items-center justify-between rounded-lg bg-gold/10 hover:bg-gold/25 px-2.5 py-1.5 text-[10px] font-semibold text-gold tracking-wide uppercase transition-all duration-200"
            >
              <span className="flex items-center gap-1.5">
                <ShoppingBag className="h-3 w-3" />
                {linkText}
              </span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
