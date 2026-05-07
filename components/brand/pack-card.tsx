import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/client";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface PackCardProps {
  pack: any;
}

export const PackCard = ({ pack }: PackCardProps) => {
  return (
    <Link 
      href={`/packs/${pack.slug.current}`}
      className="group relative flex flex-col overflow-hidden rounded-[4px] border border-border bg-background transition-all hover:shadow-xl hover:border-accent/20"
    >
      {/* Cover Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {pack.coverImage && (
          <Image
            src={urlFor(pack.coverImage).width(800).url()}
            alt={pack.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
      <div className="p-6">
        <div className="mb-4">
          <Badge className="bg-accent/10 text-accent hover:bg-accent/10 border-none uppercase text-[9px] tracking-widest font-bold">
            {pack.segment}
          </Badge>
        </div>
        
        <h3 className="font-serif text-xl font-medium leading-tight text-foreground transition-colors group-hover:text-accent">
          {pack.title}
        </h3>
        
        <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted transition-colors group-hover:text-foreground">
          Explore Contents
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  );
};
