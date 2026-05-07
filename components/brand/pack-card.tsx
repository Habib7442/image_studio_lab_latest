import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/client";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

import { UpvoteButton } from "./upvote-button";

interface PackCardProps {
  pack: any;
  priority?: boolean;
}

export const PackCard = ({ pack, priority = false }: PackCardProps) => {
  return (
    <div className="group relative">
      <Link 
        href={`/packs/${pack.slug.current}`}
        className="relative flex flex-col overflow-hidden rounded-[4px] border border-border bg-background transition-all hover:shadow-xl hover:border-accent/20"
      >
        {/* Cover Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {pack.coverImage && (
            <Image
              src={urlFor(pack.coverImage).width(800).url()}
              alt={pack.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          
          {/* Hover Label */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
             <div className="rounded-full bg-white/90 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-black backdrop-blur-md">
               View Pack
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          <div className="mb-4">
            <Badge className="bg-accent/5 text-accent hover:bg-accent/10 border border-accent/10 uppercase text-[9px] tracking-widest font-bold backdrop-blur-sm transition-colors">
              {pack.segment}
            </Badge>
          </div>
          
          <h3 className="font-serif text-xl font-medium leading-tight text-foreground transition-all duration-300 group-hover:text-accent group-hover:translate-x-1">
            {pack.title}
          </h3>
          
          <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted transition-all duration-300 group-hover:text-foreground group-hover:gap-3">
            Explore Contents
            <ArrowRight className="h-3 w-3 transition-transform group-hover:scale-110" />
          </div>
        </div>
      </Link>

      {/* Upvote Button Overlay */}
      <div className="absolute top-4 right-4 z-20">
        <UpvoteButton 
          packId={pack._id} 
          initialUpvotes={pack.upvotes} 
          className="bg-black/40 backdrop-blur-md p-2 rounded-lg border border-white/10"
        />
      </div>
    </div>
  );
};
