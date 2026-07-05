import React from "react";
import { ReviewForm } from "@/components/brand/review-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Write a Review — Share Your Experience | Image Studio Lab",
  description: "Your reviews help us improve Image Studio Lab and help other creators discover the power of master-tested prompts.",
};

export default function WriteReviewPage() {
  return (
    <div className="bg-[#09090B] text-[#FAF7F2] min-h-screen pt-32 pb-24 relative overflow-x-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(163,230,53,0.04)_0%,transparent_60%)] pointer-events-none z-0" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="mb-16 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime-400">
            Feedback
          </span>
          <h1 className="mt-4 font-serif text-5xl font-light leading-tight tracking-tight text-foreground md:text-7xl">
            Share Your <em className="italic text-lime-400 font-serif font-normal">Experience.</em>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-xs md:text-sm text-muted font-sans leading-relaxed font-medium">
            Your reviews help us improve Image Studio Lab and help other creators discover the power of master-tested prompts.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <ReviewForm />
        </div>
      </div>
    </div>
  );
}
