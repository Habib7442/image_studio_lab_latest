"use client";

import React, { useState, useEffect } from "react";
import { client } from "@/lib/sanity/client";
import { allPacksQuery } from "@/lib/sanity/queries";
import { PackCard } from "./pack-card";

export const FeaturedPacks = () => {
  const [packs, setPacks] = useState<any[]>([]);
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

  if (!loading && packs.length === 0) return null;

  return (
    <section className="bg-background py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            03 / Collections
          </span>
          <h2 className="mt-4 font-serif text-[clamp(40px,5vw,64px)] font-light leading-tight tracking-tight text-foreground">
            Master <em className="italic text-accent">Packs.</em>
          </h2>
          <p className="mt-6 max-w-xl text-muted font-serif italic text-lg">
            Curated collections of production-tested prompts. Each pack is a complete toolkit for your niche.
          </p>
        </div>

        {loading ? (
          <div className="grid h-64 w-full place-items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {packs.map((pack) => (
              <PackCard key={pack._id} pack={pack} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
