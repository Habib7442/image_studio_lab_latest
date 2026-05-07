import React from "react";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import { singlePackQuery } from "@/lib/sanity/queries";
import { PackHero } from "@/components/brand/pack-details/pack-hero";
import { PromptCard } from "@/components/brand/prompt-card";

interface PageProps {
  params: Promise<{ slug: string }>;
}

import { ReviewForm } from "@/components/brand/review-form";

export default async function PackPage({ params }: PageProps) {
  const { slug } = await params;
  const pack = await client.fetch(singlePackQuery, { slug });

  if (!pack) {
    notFound();
  }

  return (
    <div className="bg-background pb-20 md:pb-0">
      <PackHero pack={pack} />
      
      {/* Pack Contents Gallery */}
      <section className="bg-background pt-12 pb-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
              <em className="italic">Generations.</em>
            </h2>
            <p className="mt-4 text-muted">Actual outputs from the prompts in this pack.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pack.prompts && pack.prompts.length > 0 ? (
              pack.prompts.map((prompt: any) => (
                <PromptCard key={prompt._id} prompt={{ ...prompt, segment: pack.segment }} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center border border-dashed border-border rounded-lg">
                <p className="text-muted font-serif italic text-lg">No generations added to this pack yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="bg-background py-24 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <ReviewForm packId={pack._id} packTitle={pack.title} />
        </div>
      </section>

      {/* Sticky Bottom CTA for Mobile - Hidden for Free Packs */}
      {pack.segment !== 'free' && (
        <div className="sticky bottom-0 z-40 border-t border-border bg-background/80 p-4 backdrop-blur-lg md:hidden">
          <a
            href={pack.gumroadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-full bg-foreground py-4 text-sm font-semibold text-background"
          >
            Get Master Pack
          </a>
        </div>
      )}
    </div>
  );
}
