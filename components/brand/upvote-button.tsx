"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { upvotePack } from "@/lib/actions/upvote-pack";
import { cn } from "@/lib/utils";

interface UpvoteButtonProps {
  packId: string;
  initialUpvotes?: number;
  className?: string;
}

export function UpvoteButton({ packId, initialUpvotes = 0, className }: UpvoteButtonProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();

    if (isUpvoted) return;

    setIsUpvoted(true);
    setUpvotes(prev => prev + 1);
    setIsAnimating(true);
    
    const result = await upvotePack(packId);
    
    if (!result.success) {
      // Revert if failed
      setIsUpvoted(false);
      setUpvotes(prev => prev - 1);
    }

    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <button
      onClick={handleUpvote}
      className={cn(
        "group/vote relative flex flex-col items-center gap-1 transition-all",
        isUpvoted ? "text-accent" : "text-muted hover:text-accent/60",
        className
      )}
    >
      <div className="relative">
        <Heart
          className={cn(
            "h-5 w-5 transition-all duration-300",
            isUpvoted ? "fill-accent stroke-accent" : "stroke-current fill-transparent",
            isAnimating && "scale-125"
          )}
        />
        {isAnimating && (
          <div className="absolute inset-0 animate-ping opacity-75">
            <Heart className="h-5 w-5 fill-accent stroke-accent" />
          </div>
        )}
      </div>
      <span className="text-[10px] font-bold tracking-tighter">
        {upvotes > 0 ? upvotes : "VOTE"}
      </span>
    </button>
  );
}
