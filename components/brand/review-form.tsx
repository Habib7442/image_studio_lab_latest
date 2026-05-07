"use client";

import React, { useState } from "react";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { submitReview } from "@/lib/actions/submit-review";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  packId?: string;
  packTitle?: string;
}

export function ReviewForm({ packId, packTitle }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("rating", rating.toString());
    if (packId) formData.append("packId", packId);

    const result = await submitReview(formData);

    if (result.success) {
      setIsSuccess(true);
      setRating(0);
    } else {
      setError(result.error || "An error occurred");
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
        <CheckCircle2 className="h-16 w-16 text-accent mb-4" />
        <h3 className="font-serif text-2xl italic text-foreground">Thank you for your feedback!</h3>
        <p className="mt-2 text-muted max-w-xs">
          Your review has been submitted and is currently pending moderation.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-8 text-sm font-semibold uppercase tracking-widest text-accent hover:text-foreground transition-colors"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto border border-border/50 bg-background/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-2xl">
      <div className="mb-10 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
          Feedback
        </span>
        <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-foreground">
          Leave a <em className="italic text-accent">Review.</em>
        </h2>
        {packTitle && (
          <p className="mt-2 text-muted italic font-serif">
            Sharing your experience with {packTitle}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Star Rating */}
        <div className="flex flex-col items-center gap-4">
          <label className="text-xs font-bold uppercase tracking-widest text-muted/60">
            Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="group p-1 transition-transform hover:scale-110 active:scale-90"
              >
                <Star
                  className={cn(
                    "h-8 w-8 transition-all duration-300",
                    (hover || rating) >= star
                      ? "fill-accent text-accent filter drop-shadow-[0_0_8px_rgba(229,181,103,0.4)]"
                      : "text-muted/20"
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-muted/60 ml-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="e.g. Julian Kane"
              className="w-full bg-white/5 border border-border/50 rounded-xl px-4 py-4 text-sm text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-muted/30"
            />
          </div>

          {/* Email (Hidden or shown, let's keep it simple with just Name) */}
          <div className="space-y-2 opacity-50 pointer-events-none">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted/60 ml-1">
              Verification
            </label>
            <div className="w-full bg-white/5 border border-border/50 rounded-xl px-4 py-4 text-sm text-muted/30 italic">
              Verified Purchase
            </div>
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <label htmlFor="comment" className="text-[10px] font-bold uppercase tracking-widest text-muted/60 ml-1">
            Review Details
          </label>
          <textarea
            id="comment"
            name="comment"
            required
            rows={4}
            placeholder="Share your experience with these prompts..."
            className="w-full bg-white/5 border border-border/50 rounded-xl px-4 py-4 text-sm text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-muted/30 resize-none"
          />
        </div>

        {error && (
          <p className="text-red-400 text-xs italic text-center animate-pulse">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className={cn(
            "group relative w-full flex items-center justify-center gap-3 rounded-xl px-8 py-5 text-sm font-bold uppercase tracking-widest transition-all overflow-hidden",
            isSubmitting || rating === 0
              ? "bg-muted/10 text-muted/40 cursor-not-allowed"
              : "bg-foreground text-background hover:bg-accent hover:shadow-[0_0_30px_rgba(229,181,103,0.3)] active:scale-[0.98]"
          )}
        >
          <span className="relative z-10 flex items-center gap-3">
            {isSubmitting ? "Submitting..." : "Post Review"}
            {!isSubmitting && <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
          </span>
        </button>
      </form>
    </div>
  );
}
