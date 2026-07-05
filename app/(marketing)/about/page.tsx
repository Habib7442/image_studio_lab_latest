import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { AboutSlideshow } from "./about-slideshow";
import { client, urlFor } from "@/lib/sanity/client";

export const metadata: Metadata = {
  title: "Our Vision — The Art of Digital Showrooms | imagestudiolab",
  description: "Learn about the philosophy behind imagestudiolab and our approach to compiling editorial 3D shopeable catalogs and digital lookbooks.",
};

/**
 * Fetch a mixed list of covers/images from packs and catalogs inside Sanity Content Lake database.
 */
async function getMixedSanityImages() {
  try {
    const packsQuery = `*[_type == "pack" && defined(coverImage)] {
      _id,
      title,
      coverImage
    }`;
    
    const catalogsQuery = `*[_type == "catalog"] {
      _id,
      title,
      pagesJson
    }`;

    const [packs, catalogs] = await Promise.all([
      client.fetch(packsQuery, {}, { next: { revalidate: 10 } }),
      client.fetch(catalogsQuery, {}, { next: { revalidate: 10 } })
    ]);

    const slides: { src: string; title: string; type: string }[] = [];

    // 1. Process catalogs page images
    catalogs.forEach((cat: any) => {
      try {
        if (cat.pagesJson) {
          const parsed = JSON.parse(cat.pagesJson);
          const firstImg = parsed.find((p: any) => p.type === "image" && (p.src || (p.images && p.images[0])));
          if (firstImg) {
            slides.push({
              src: firstImg.src || firstImg.images[0],
              title: cat.title || "Untitled Catalog",
              type: "3D Showroom"
            });
          }
        }
      } catch (_) {}
    });

    // 2. Process packs cover images
    packs.forEach((pack: any) => {
      if (pack.coverImage) {
        try {
          const imgUrl = urlFor(pack.coverImage).width(1000).url();
          slides.push({
            src: imgUrl,
            title: pack.title || "Prompt Collection",
            type: "Aesthetic Pack"
          });
        } catch (_) {}
      }
    });

    // Shuffle slides to get a nice organic mix of both formats
    return slides.sort(() => Math.random() - 0.5);
  } catch (err) {
    console.error("Error fetching mixed sanity images for about page:", err);
    return [];
  }
}

export default async function AboutPage() {
  const slides = await getMixedSanityImages();

  return (
    <div className="flex min-h-screen flex-col bg-[#09090B] text-[#FAF7F2] font-sans pt-24 overflow-x-hidden relative">
      {/* Decorative Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(163,230,53,0.04)_0%,transparent_60%)] pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-12 md:pt-24 md:pb-20 z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-8 text-5xl font-serif font-light tracking-tight md:text-7xl lg:text-8xl">
            The art of <br />
            <span className="text-lime-400 italic font-serif font-normal">Digital Showrooms.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs md:text-sm leading-relaxed text-muted font-sans font-medium">
            We believe that premium brand storytelling shouldn't require complex web developers or outdated PDF viewers. 
            imagestudiolab bridges the gap between static product catalogs and interactive 3D shoppable publications.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-[#121215]/50 border-y border-white/5 py-24 md:py-32 z-10 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Fixed height container h-[450px] md:h-[600px] ensures Next Image fill scales correctly without warnings */}
            <div className="relative h-[450px] md:h-[600px] overflow-hidden rounded-3xl bg-[#09090B] border border-white/5 shadow-2xl">
               <AboutSlideshow slides={slides} />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-serif font-light mb-2 md:text-4xl">Our Philosophy</h2>
              <div className="space-y-6 text-xs md:text-sm text-muted leading-relaxed font-sans font-medium">
                <p>
                  Traditional digital catalogs wrap static PDFs in clunky viewer frames that search engines cannot crawl and mobile visitors struggle to navigate. 
                  We believe in publishing native, high-performance HTML documents.
                </p>
                <p>
                  Every lookbook compiled with imagestudiolab features hardware-accelerated 3D page turns, fluid mobile swiping, custom brand palette coloring, and interactive shoppable hotspots that bind products directly to inventory.
                </p>
                <div className="pt-4">
                   <Link href="/" className="inline-flex items-center gap-2 border-b border-lime-400 pb-1 text-lime-400 hover:text-lime-300 transition-colors uppercase tracking-widest text-[10px] font-bold">
                     View featured showrooms <ArrowRight className="h-3.5 w-3.5" />
                   </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-24 z-10 relative">
        <div className="mx-auto max-w-7xl text-center">
           <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime-400 mb-16 font-sans">The Standards</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                {
                  title: "3D Page-Turns",
                  desc: "Hardware-accelerated CSS 3D transforms mimic the luxury feel of a physical catalog, optimized for sub-1s load speeds on mobile browsers."
                },
                {
                  title: "Shoppable Hotspots",
                  desc: "Drop tags directly onto pages linking products to your online store, allowing visitors to purchase directly from the lookbook."
                },
                {
                  title: "AI-Assisted Layouts",
                  desc: "Bypass complex design suites. Generate validated publication grids from simple briefs or start designing page sheets manually with ease."
                }
              ].map((val) => (
                <div key={val.title} className="group p-8 border border-white/5 bg-[#121215] rounded-2xl hover:border-lime-400/30 transition-all duration-300">
                  <h4 className="text-xl font-serif font-light mb-4 text-[#FAF7F2]">{val.title}</h4>
                  <p className="text-xs text-muted leading-relaxed font-sans font-medium">{val.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
