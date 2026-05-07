"use client";

import React, { useEffect, useState } from "react";
import { client, urlFor } from "@/lib/sanity/client";
import { approvedReviewsQuery } from "@/lib/sanity/queries";
import { Star, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await client.fetch(approvedReviewsQuery, {}, {
          cache: 'no-store'
        });
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  if (!loading && reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted font-serif italic">No reviews yet. Be the first to share your experience!</p>
        <Link 
          href="/write-review"
          className="mt-6 inline-block rounded-full border border-accent/20 px-8 py-3 text-xs font-bold uppercase tracking-widest text-accent transition-all hover:bg-accent hover:text-background"
        >
          Write a Review
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 md:space-y-16">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-xl text-center md:text-left">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            Wall of Love
          </span>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight tracking-tight text-foreground md:text-6xl">
            Real feedback from <em className="italic text-accent">real creators.</em>
          </h2>
        </div>
        <Link 
          href="/write-review"
          className="group flex items-center gap-4 rounded-full border border-border bg-card/50 px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-foreground transition-all hover:border-accent/30 hover:bg-card"
        >
          Write a Review
          <div className="h-px w-8 bg-border transition-all group-hover:w-12 group-hover:bg-accent" />
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      ) : (
        <div className="relative">
          {/* Horizontal Scroll Container on Mobile, Grid on Desktop */}
          <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
            {reviews.map((review) => (
              <div 
                key={review._id}
                className="min-w-[85vw] md:min-w-0 snap-center group relative flex flex-col justify-between rounded-xl border border-border bg-card/30 p-8 transition-all hover:border-accent/20 hover:bg-card/50"
              >
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-3 w-3",
                            i < review.rating ? "fill-accent stroke-accent" : "stroke-muted/30 fill-transparent"
                          )} 
                        />
                      ))}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-tighter text-muted/40">
                      Verified
                    </div>
                  </div>
                  <p className="font-serif italic text-lg leading-relaxed text-foreground/90">
                    "{review.comment}"
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-border/50 flex items-center gap-4">
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-border bg-background flex items-center justify-center">
                    {review.avatar ? (
                      <Image 
                        src={urlFor(review.avatar).width(100).height(100).url()} 
                        alt={review.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-muted/20" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{review.name}</span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-accent/60 font-bold">Creator</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Scroll Indicator */}
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            {reviews.map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-accent/20" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
