"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";

interface PacksCarouselProps {
  packs: any[];
}

export const PacksCarousel = ({ packs }: PacksCarouselProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!packs || packs.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % packs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [packs]);

  if (!packs || packs.length === 0) return null;

  return (
    <div className="relative h-full w-full bg-black">
      {packs.map((pack, i) => (
        <div 
          key={pack._id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {pack.coverImage && (
            <Image
              src={urlFor(pack.coverImage).width(1200).url()}
              alt={pack.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i === 0}
              className="object-cover"
            />
          )}
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          
          <div className="absolute bottom-12 left-12 right-12 z-20">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Feature Pack</span>
             <h3 className="mt-2 text-3xl font-serif text-white md:text-5xl">{pack.title}</h3>
          </div>
        </div>
      ))}

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-12 flex gap-2 z-30">
        {packs.map((_, i) => (
          <div 
            key={i}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === index ? "w-8 bg-accent" : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
