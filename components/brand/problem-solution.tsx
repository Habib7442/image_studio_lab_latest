import React from "react";
import { X, Check } from "lucide-react";

export const ProblemSolution = () => {
  return (
    <section className="bg-background py-24 border-y border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-border">
          
          {/* Problem */}
          <div className="flex flex-col pr-0 lg:pr-16">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                <X className="h-3 w-3" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500/80">
                The Problem
              </span>
            </div>
            <h3 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
              You see beautiful AI images. <br />
              You <em className="italic">can't</em> write the prompts.
            </h3>
            <p className="mt-6 text-muted max-w-md leading-relaxed">
              Prompt engineering is exhausting. You spend hours fighting the AI, only to get distorted faces and generic lighting.
            </p>
          </div>

          {/* Solution */}
          <div className="flex flex-col pl-0 lg:pl-16">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                The Solution
              </span>
            </div>
            <h3 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
              We already <em className="italic">wrote</em> them. <br />
              Copy, paste, generate.
            </h3>
            <p className="mt-6 text-muted max-w-md leading-relaxed">
              Master-tested prompt guides that work every time. Professionally crafted lighting, framing, and style for immediate results.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
