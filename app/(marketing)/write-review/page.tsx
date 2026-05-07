import React from "react";
import { ReviewForm } from "@/components/brand/review-form";

export default function WriteReviewPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            Feedback
          </span>
          <h1 className="mt-4 font-serif text-5xl font-light leading-tight tracking-tight text-foreground md:text-7xl">
            Share Your <em className="italic text-accent">Experience.</em>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-muted font-serif italic text-lg">
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
