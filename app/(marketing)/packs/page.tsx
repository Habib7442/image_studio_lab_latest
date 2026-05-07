"use client";

import React, { useState, useEffect } from "react";
import { client } from "@/lib/sanity/client";
import { allPacksQuery } from "@/lib/sanity/queries";
import { GalleryFilters } from "@/components/brand/gallery-filters";
import { PackCard } from "@/components/brand/pack-card";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PacksContent() {
  const [packs, setPacks] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const initialSegment = searchParams.get("segment") || "all";
  const [activeSegment, setActiveSegment] = useState(initialSegment);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPacks = async () => {
      setLoading(true);
      try {
        const data = await client.fetch(allPacksQuery);
        setPacks(data);
      } catch (error) {
        console.error("Error fetching packs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPacks();
  }, []);

  const filteredPacks = activeSegment === "all" 
    ? packs 
    : packs.filter(p => p.segment === activeSegment);

  return (
    <div className="mx-auto max-w-7xl px-6">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
          The Collection
        </span>
        <h1 className="mt-4 font-serif text-[clamp(48px,6vw,80px)] font-light leading-tight tracking-tight text-foreground">
          Master <em className="italic text-accent">Packs.</em>
        </h1>
        <p className="mt-6 mx-auto max-w-xl text-muted font-serif italic text-lg">
          Browse our master-tested prompt collections for ChatGPT and Gemini. 
          Find your niche and start generating.
        </p>
      </div>

      {/* Filters */}
      <GalleryFilters 
        activeSegment={activeSegment} 
        onSegmentChange={setActiveSegment} 
      />

      {/* Grid */}
      <div className="mt-12">
        {loading ? (
          <div className="grid h-64 w-full place-items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPacks.map((pack, index) => (
              <PackCard key={pack._id} pack={pack} priority={index < 2} />
            ))}
          </div>
        )}

        {!loading && filteredPacks.length === 0 && (
          <div className="py-32 text-center border border-dashed border-border rounded-lg">
            <p className="font-serif text-xl italic text-muted">
              No packs found in this segment. More coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PacksPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-16 pb-24 md:pt-20 md:pb-32">
        <Suspense fallback={
          <div className="mx-auto max-w-7xl px-6 py-32 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent mx-auto" />
          </div>
        }>
          <PacksContent />
        </Suspense>
      </section>
    </div>
  );
}
