import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { client } from "@/lib/sanity/client";
import { allPacksQuery } from "@/lib/sanity/queries";
import { PacksCarousel } from "@/components/brand/packs-carousel";

export default async function AboutPage() {
  const packs = await client.fetch(allPacksQuery);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-8 text-5xl font-serif tracking-tight md:text-7xl lg:text-8xl">
            The art of <br />
            <span className="text-accent italic">Zero Engineering.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            We believe that high-end AI art shouldn't require a computer science degree. 
            Image Studio Lab was built to bridge the gap between creative vision and technical execution.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-black text-foreground py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            <div className="relative min-h-[500px] md:min-h-[700px] overflow-hidden rounded-3xl bg-black shadow-2xl">
               <PacksCarousel packs={packs} />
            </div>
            <div>
              <h2 className="text-4xl font-serif mb-8 md:text-5xl">Our Philosophy</h2>
              <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
                <p>
                  Most AI prompts you find online are cluttered with "garbage text"—meaningless 
                  keywords that add noise instead of nuance. At Image Studio Lab, we follow 
                  a minimalist approach.
                </p>
                <p>
                  Every pack we release is the result of thousands of test generations. We strip 
                  away the fluff to provide you with the "Master Code"—the precise set of 
                  instructions that guarantees an editorial-grade result every time.
                </p>
                <div className="pt-8">
                   <Link href="/packs" className="inline-flex items-center gap-2 border-b border-accent pb-1 text-accent hover:text-accent/80 transition-colors">
                     Browse the collections <ArrowRight className="h-4 w-4" />
                   </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-7xl text-center">
           <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-16">The Standards</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              {[
                {
                  title: "Editorial First",
                  desc: "We don't do 'random'. Every prompt is designed to produce images that look like they belong in a high-end fashion magazine or an architectural digest."
                },
                {
                  title: "Model Agnostic",
                  desc: "While we optimize for ChatGPT and Gemini, our logic is rooted in cinematic principles that translate across DALL-E, Stable Diffusion, and beyond."
                },
                {
                  title: "Human Centric",
                  desc: "Technology should serve the creator. We provide the tools so you can focus on the direction, not the syntax."
                }
              ].map((val) => (
                <div key={val.title} className="group p-8 border border-border/50 rounded-2xl hover:bg-foreground/5 transition-colors">
                  <h4 className="text-2xl font-serif mb-4">{val.title}</h4>
                  <p className="text-muted leading-relaxed">{val.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
