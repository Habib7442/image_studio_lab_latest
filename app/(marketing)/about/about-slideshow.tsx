"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const CURATED_LOOKBOOK_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    title: "Editorial Page #1",
    type: "Creative Showroom"
  },
  {
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    title: "Editorial Page #2",
    type: "Creative Showroom"
  },
  {
    src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    title: "Editorial Page #3",
    type: "Creative Showroom"
  },
  {
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
    title: "Editorial Page #4",
    type: "Creative Showroom"
  }
];

interface AboutSlideshowProps {
  slides?: { src: string; title: string; type: string }[];
}

export function AboutSlideshow({ slides = [] }: AboutSlideshowProps) {
  const [index, setIndex] = useState(0);

  const activeSlides = slides.length > 0 ? slides : CURATED_LOOKBOOK_IMAGES;

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % activeSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [activeSlides]);

  return (
    <div className="relative h-full w-full bg-black">
      {activeSlides.map((slide, i) => (
        <div 
          key={slide.src + "-" + i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={`${slide.type} - ${slide.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={i === 0}
            className="object-cover"
          />
          {/* Subtle overlay shading */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-black/30" />
          
          <div className="absolute bottom-12 left-12 right-12 z-20">
             <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-lime-400 font-sans">{slide.type}</span>
             <h3 className="mt-1 text-2xl font-serif text-white md:text-3xl line-clamp-1">{slide.title}</h3>
          </div>
        </div>
      ))}

      {/* Progress Indicators */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-8 left-12 flex gap-2 z-30">
          {activeSlides.map((_, i) => (
            <div 
              key={i}
              className={`h-1 transition-all duration-500 rounded-full ${
                i === index ? "w-8 bg-lime-400" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
