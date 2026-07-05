import React from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity/client";
import { Zap, ChevronRight, BookOpen, Calendar, Layers } from "lucide-react";

interface PublicCatalog {
  _id: string;
  title: string;
  subtitle?: string;
  brandName?: string;
  palettePreset?: string;
  pageCount: number;
  coverImage: string;
  createdAt: string;
}

/**
 * Fetch all public lookbooks from Sanity Content Lake database.
 * Formats pages and covers to display dynamically.
 */
async function getPublicCatalogs(): Promise<PublicCatalog[]> {
  try {
    const query = `*[_type == "catalog" && isPublic == true] | order(_createdAt desc) {
      _id,
      title,
      subtitle,
      brandName,
      palettePreset,
      pagesJson,
      _createdAt
    }`;
    
    const result = await client.fetch(query, {}, { next: { revalidate: 10 } }); // Cache revalidation every 10s
    
    return result.map((doc: any) => {
      let pageCount = 0;
      let coverImage = "";
      try {
        if (doc.pagesJson) {
          const parsed = JSON.parse(doc.pagesJson);
          pageCount = parsed.length;
          const firstImg = parsed.find((p: any) => p.type === "image" && (p.src || (p.images && p.images[0])));
          if (firstImg) {
            coverImage = firstImg.src || firstImg.images[0];
          }
        }
      } catch (_) {}
      
      return {
        _id: doc._id,
        title: doc.title,
        subtitle: doc.subtitle,
        brandName: doc.brandName,
        palettePreset: doc.palettePreset,
        pageCount,
        coverImage: coverImage || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        createdAt: doc._createdAt,
      };
    });
  } catch (err) {
    console.error("Error fetching public catalogs:", err);
    return [];
  }
}

import { jsonLd } from "@/lib/seo";

export default async function HomePage() {
  const catalogs = await getPublicCatalogs();
  
  const orgSchema = jsonLd.organization();
  const websiteSchema = jsonLd.website();

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAF7F2] font-sans pt-24 pb-20 overflow-x-hidden relative">
      {/* Schema.org Structured Data for Google Search Console */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c") }}
      />

      {/* Decorative Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(163,230,53,0.06)_0%,transparent_60%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(163,230,53,0.03)_0%,transparent_50%)] pointer-events-none z-0" />

      {/* HERO SECTION */}
      <header className="relative w-full text-center py-16 md:py-24 z-10 px-6 max-w-5xl mx-auto">
        <div className="flex justify-center gap-2 mb-6">
          <span className="flex items-center gap-1.5 rounded-full bg-lime-400/10 px-4 py-1.5 text-[10px] font-bold text-lime-400 tracking-widest uppercase border border-lime-400/25">
            <Zap className="h-3.5 w-3.5 text-lime-400" />
            The AI-Native Publishing Studio
          </span>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight mb-8 max-w-4xl mx-auto">
          Turn Any Brief Into a <br />
          <em className="italic font-normal text-lime-400 font-serif">Shoppable 3D Catalog</em> Instantly.
        </h1>

        <p className="text-xs md:text-sm text-muted max-w-xl mx-auto mb-10 leading-relaxed font-sans font-medium">
          Create premium digital showrooms featuring hardware-accelerated 3D page turns, interactive hotspots, and integrated conversion funnels.
        </p>

        <div className="flex justify-center items-center gap-4">
          <Link
            href="/dashboard"
            className="group flex items-center justify-center gap-2.5 rounded-xl bg-lime-400 text-black font-bold tracking-widest text-xs px-8 py-4.5 uppercase transition-all duration-300 hover:bg-lime-300 active:scale-98 cursor-pointer shadow-lg shadow-lime-400/15"
          >
            Launch Studio Workspace
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </header>

      {/* GALLERY GRID SHOWCASE SECTION */}
      <main className="mx-auto max-w-7xl px-4 md:px-6 py-6 relative z-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 border-b border-white/5 pb-4 mb-6">
            <h2 className="text-sm font-bold text-foreground tracking-widest uppercase flex items-center gap-2 font-sans">
              <BookOpen className="h-4 w-4 text-lime-400" />
              Featured Showrooms Gallery
            </h2>
            <p className="text-[11px] text-muted font-medium font-sans">Browse live publication lookbooks designed by our creators</p>
          </div>

          {catalogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catalogs.map((item) => (
                <div
                  key={item._id}
                  className="group rounded-2xl border border-white/5 bg-[#121215] overflow-hidden flex flex-col hover:border-lime-400/30 transition-all duration-300 shadow-2xl relative"
                >
                  {/* Card Cover Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1A1A22] border-b border-white/5">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-80" />
                    
                    <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[9px] font-bold text-white tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/5 flex items-center gap-1 font-sans">
                      <Layers className="h-3 w-3 text-lime-400" />
                      {item.pageCount} Pages
                    </span>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                    <div className="flex flex-col gap-1.5">
                      {item.brandName && item.brandName.toUpperCase() !== "FOLIO" && (
                        <span className="text-[9px] font-bold text-lime-400 uppercase tracking-widest font-sans">
                          {item.brandName}
                        </span>
                      )}
                      <h3 className="font-serif text-lg font-light text-foreground group-hover:text-lime-400 transition-colors leading-snug line-clamp-1">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-[10px] text-muted font-medium leading-relaxed line-clamp-2 font-sans">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/5 mt-2">
                      <span className="text-[9px] text-muted/65 flex items-center gap-1 font-sans font-medium">
                        <Calendar className="h-3.5 w-3.5 text-lime-400" />
                        {new Date(item.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>

                      <Link
                        href={`/lookbook/${item._id}`}
                        className="flex items-center gap-1 text-[10px] font-bold text-lime-400 hover:text-lime-300 transition-colors cursor-pointer uppercase tracking-wider font-sans"
                      >
                        View 3D Live
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/5 rounded-2xl bg-[#121215]/40 max-w-lg mx-auto w-full">
              <BookOpen className="h-8 w-8 text-muted/60 mb-3" />
              <p className="text-xs text-muted font-sans font-medium">No public lookbooks created yet.</p>
              <Link
                href="/dashboard"
                className="text-[10px] font-bold text-lime-400 hover:underline mt-2 uppercase tracking-wider font-sans"
              >
                Create the first publication →
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
