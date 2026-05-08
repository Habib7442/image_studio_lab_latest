"use client";

import React, { useState, useEffect } from "react";
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

  // Check localStorage on mount to "remember" the upvote
  useEffect(() => {
    const upvotedPacks = JSON.parse(localStorage.getItem("upvoted_packs") || "[]");
    if (upvotedPacks.includes(packId)) {
      setIsUpvoted(true);
    }
  }, [packId]);

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isUpvoted) return;

    // Optimistic Update
    setIsUpvoted(true);
    setUpvotes(prev => prev + 1);
    setIsAnimating(true);
    
    // Save to localStorage
    const upvotedPacks = JSON.parse(localStorage.getItem("upvoted_packs") || "[]");
    localStorage.setItem("upvoted_packs", JSON.stringify([...upvotedPacks, packId]));

    const result = await upvotePack(packId);
    
    if (!result.success) {
      // Revert if failed
      setIsUpvoted(false);
      setUpvotes(prev => prev - 1);
      const updatedPacks = JSON.parse(localStorage.getItem("upvoted_packs") || "[]").filter((id: string) => id !== packId);
      localStorage.setItem("upvoted_packs", JSON.stringify(updatedPacks));
    }

    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={isUpvoted}
      className={cn(
        "group/vote relative flex flex-col items-center gap-1 transition-all",
        isUpvoted ? "text-[#FF3040]" : "text-muted hover:text-accent/60",
        className
      )}
    >
      <div className="relative">
        <Heart
          className={cn(
            "h-5 w-5 transition-all duration-500 ease-out",
            isUpvoted 
              ? "fill-[#FF3040] stroke-[#FF3040] filter drop-shadow-[0_0_15px_rgba(255,48,64,0.6)] scale-110" 
              : "stroke-current fill-transparent group-hover/vote:scale-110",
            isAnimating && "scale-150"
          )}
        />
        {isAnimating && (
          <div className="absolute inset-0 animate-ping opacity-75">
            <Heart className="h-5 w-5 fill-[#FF3040] stroke-[#FF3040]" />
          </div>
        )}
      </div>
      <span className={cn(
        "text-[10px] font-bold tracking-tighter transition-colors",
        isUpvoted ? "text-[#FF3040]" : "text-muted"
      )}>
        {upvotes > 0 ? upvotes : "VOTE"}
      </span>
    </button>
  );
}
