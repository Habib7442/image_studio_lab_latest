"use client";

import React, { useState, useRef } from "react";
import { Star, Send, CheckCircle2, User, Upload, X } from "lucide-react";
import { submitReview } from "@/lib/actions/submit-review";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

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
  
  // Avatar State
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
      setAvatarPreview(null);
    } else {
      setError(result.error || "An error occurred");
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
        <CheckCircle2 className="h-16 w-16 text-lime-400 mb-4" />
        <h3 className="font-serif text-2xl italic text-foreground">Thank you for your feedback!</h3>
        <p className="mt-2 text-muted max-w-xs">
          Your review has been submitted and is currently pending moderation.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <button 
            onClick={() => setIsSuccess(false)}
            className="text-sm font-bold uppercase tracking-widest text-lime-400 hover:text-lime-300 transition-colors"
          >
            Submit Another
          </button>
          <Link 
            href="/"
            className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-foreground transition-all"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto border border-white/5 bg-[#121215] rounded-2xl p-8 md:p-12 shadow-2xl">
      <div className="mb-10 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-lime-400">
          Feedback
        </span>
        <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-foreground">
          Leave a <em className="italic text-lime-400 font-serif font-normal">Review.</em>
        </h2>
        {packTitle && (
          <p className="mt-2 text-muted italic font-serif">
            Sharing your experience with {packTitle}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Avatar Upload (Optional) */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border border-2 border-dashed border-white/10 bg-[#09090B] flex items-center justify-center transition-all group-hover:border-lime-400/50">
              {avatarPreview ? (
                <Image 
                  src={avatarPreview} 
                  alt="Avatar Preview" 
                  fill 
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-muted/30" />
              )}
            </div>
            
            <button
              type="button"
              onClick={() => avatarPreview ? removeAvatar() : fileInputRef.current?.click()}
              className={cn(
                "absolute -bottom-2 -right-2 p-2 rounded-full border border-white/5 bg-[#121215] shadow-lg transition-all hover:scale-110",
                avatarPreview ? "text-red-400 hover:bg-red-500/10" : "text-lime-400 hover:bg-lime-400/10"
              )}
            >
              {avatarPreview ? <X className="h-4 w-4" /> : <Upload className="h-4 w-4 text-lime-400" />}
            </button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef}
            name="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted/60">
            {avatarPreview ? "Photo Added" : "Add Profile Photo (Optional)"}
          </span>
        </div>

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
                      ? "fill-lime-400 text-lime-400 filter drop-shadow-[0_0_8px_rgba(163,230,53,0.4)]"
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
              className="w-full bg-[#09090B] border border-white/5 rounded-xl px-4 py-4 text-sm text-foreground focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/20 transition-all placeholder:text-muted/30 font-sans"
            />
          </div>

          {/* Verification */}
          <div className="space-y-2 opacity-50 pointer-events-none">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted/60 ml-1">
              Verification
            </label>
            <div className="w-full bg-[#09090B] border border-white/5 rounded-xl px-4 py-4 text-sm text-muted/30 italic font-sans">
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
            className="w-full bg-[#09090B] border border-white/5 rounded-xl px-4 py-4 text-sm text-foreground focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/20 transition-all placeholder:text-muted/30 resize-none font-sans"
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
              ? "bg-white/5 text-muted/40 cursor-not-allowed border border-white/5"
              : "bg-lime-400 text-black hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.25)] active:scale-[0.98]"
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
