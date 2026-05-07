"use client";

import React, { useState, useEffect } from "react";
import { GalleryFilters } from "./gallery-filters";
import { PromptCard } from "./prompt-card";
import { client } from "@/lib/sanity/client";
import { allPromptsQuery, promptsBySegmentQuery } from "@/lib/sanity/queries";

export const EditorialGallery = () => {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [activeSegment, setActiveSegment] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true);
      try {
        const query = activeSegment === "all" ? allPromptsQuery : promptsBySegmentQuery;
        const data = await client.fetch(query, { segment: activeSegment });
        setPrompts(data);
      } catch (error) {
        console.error("Error fetching prompts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, [activeSegment]);

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            02 / Discovery
          </span>
          <h2 className="mt-4 font-serif text-[clamp(40px,6vw,80px)] font-light leading-tight tracking-tight text-foreground">
            The Editorial <em className="italic">Collection.</em>
          </h2>
        </div>

        {/* Filters */}
        <GalleryFilters 
          activeSegment={activeSegment} 
          onSegmentChange={setActiveSegment} 
        />

        {/* Masonry Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="grid h-96 w-full place-items-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            </div>
          ) : (
            <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3 xl:columns-4">
              {prompts.map((prompt) => (
                <div key={prompt._id} className="break-inside-avoid">
                  <PromptCard prompt={prompt} />
                </div>
              ))}
            </div>
          )}

          {!loading && prompts.length === 0 && (
            <div className="py-32 text-center">
              <p className="font-serif text-xl italic text-muted">
                No prompts found in this collection yet. Check back soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
