"use client";

import React, { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";
import { 
  Drawer, 
  DrawerContent, 
  DrawerTrigger, 
  DrawerTitle, 
  DrawerDescription 
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Maximize2 } from "lucide-react";
import { ImageComparison } from "./image-comparison";

interface PromptCardProps {
  prompt: any;
}

export const PromptCard = ({ prompt }: PromptCardProps) => {
  const [copied, setCopied] = useState<string | null>(null);
  const isComparison = prompt.layout === "comparison";
  const displayImage = isComparison ? prompt.afterImage : prompt.mainImage;

  const handleCopy = (text: string, type: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!displayImage) return null;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="group relative cursor-pointer overflow-hidden rounded-[4px] border border-border bg-background transition-all hover:shadow-xl">
          {/* Image */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
            <Image
              src={urlFor(displayImage).width(800).url()}
              alt={prompt.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="p-6">
                <p className="font-serif text-lg font-light italic text-white/90">
                  {prompt.mood}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                    Quick View
                  </div>
                </div>
              </div>
            </div>
            
            {/* Badge */}
            <div className="absolute left-4 top-4">
              <Badge className="bg-background/80 text-foreground backdrop-blur-md hover:bg-background/90 uppercase text-[9px] tracking-widest font-bold border-none">
                {prompt.segment || "Studio"}
              </Badge>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <h4 className="font-serif text-base font-medium text-foreground">
              {prompt.title}
            </h4>
          </div>
        </div>
      </DrawerTrigger>

      <DrawerContent className="w-full sm:max-w-2xl border-none bg-background p-0 shadow-2xl">
        <div className="flex h-full flex-col overflow-y-auto">
          {/* Visual Area */}
          <div className="relative w-full shrink-0">
            {isComparison && prompt.beforeImage ? (
              <ImageComparison 
                beforeImage={urlFor(prompt.beforeImage).width(1200).url()}
                afterImage={urlFor(prompt.afterImage).width(1200).url()}
                className="aspect-[3/4]"
              />
            ) : (
              <div className="relative aspect-[3/4] bg-muted w-full">
                <Image
                  src={urlFor(displayImage).width(1200).url()}
                  alt={prompt.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="flex flex-col p-8 md:p-12">
            <DrawerTitle className="sr-only">{prompt.title}</DrawerTitle>
            <DrawerDescription className="sr-only">{prompt.mood}</DrawerDescription>

            <Badge className="w-fit bg-accent/10 text-accent hover:bg-accent/10 border-none mb-6 uppercase text-[10px] tracking-widest font-bold">
              {prompt.segment || "Prompt Pack"}
            </Badge>
            
            <h3 className="font-serif text-4xl font-light leading-tight text-foreground">
              {prompt.title}
            </h3>
            
            <p className="mt-4 font-serif text-xl italic text-muted">
              {prompt.mood}
            </p>

            <div className="mt-12 space-y-8">
              {/* Main Prompt Section */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                    AI Generation Prompt
                  </h5>
                  <button 
                    onClick={() => handleCopy(prompt.chatGPTVersion, "prompt")}
                    className="text-accent hover:text-accent-deep transition-colors"
                  >
                    {copied === "prompt" ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <div className="rounded-sm bg-accent/5 p-5 font-mono text-xs leading-relaxed text-foreground border-l-2 border-accent/20">
                  {prompt.chatGPTVersion || "Full prompt available in the paid pack."}
                </div>
              </div>
            </div>

          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
