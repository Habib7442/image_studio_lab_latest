import { client, writeClient } from "@/lib/sanity/client";
import { Flipbook } from "@/components/brand/flipbook";
import { CatalogueBooking } from "@/components/brand/catalogue-booking";
import { notFound } from "next/navigation";
import { Sparkles, BookOpen } from "lucide-react";
import { getMetadata, jsonLd } from "@/lib/seo";

interface LookbookPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate metadata dynamically based on the persisted lookbook schema in Sanity.
 */
export async function generateMetadata({ params }: LookbookPageProps) {
  const { id } = await params;
  try {
    const catalog = await client.fetch(`*[_type == "catalog" && _id == $id][0]`, { id });
    if (!catalog) {
      return { title: "Lookbook Not Found | Image Studio Lab" };
    }

    let ogImage = "";
    try {
      if (catalog.pagesJson) {
        const parsedPages = JSON.parse(catalog.pagesJson);
        const firstImgPage = parsedPages.find((p: any) => p.type === "image" && (p.src || (p.images && p.images[0])));
        if (firstImgPage) {
          ogImage = firstImgPage.src || firstImgPage.images[0];
        }
      }
    } catch (_) {}

    const pageTitle = catalog.brandName && catalog.brandName.toUpperCase() !== "FOLIO"
      ? `${catalog.title} — ${catalog.brandName} Catalog`
      : catalog.title;
      
    const pageDesc = catalog.subtitle || `Interactive 3D digital catalog publication. Powered by Image Studio Lab.`;

    return getMetadata({
      title: pageTitle,
      description: pageDesc,
      path: `/lookbook/${id}`,
      ogImage: ogImage || undefined
    });
  } catch (err) {
    return { title: "Digital Lookbook Showcase | Image Studio Lab" };
  }
}

/**
 * Public hosted Lookbook Page viewer. Displays saved AI lookbooks to visitors (e.g. from Pinterest).
 */
export default async function LookbookPage({ params }: LookbookPageProps) {
  const { id } = await params;
  
  let catalog: any = null;
  try {
    catalog = await client.fetch(`*[_type == "catalog" && _id == $id][0]`, { id });
  } catch (err) {
    console.error("Sanity read error on dynamic lookbook route:", err);
  }

  if (!catalog) {
    notFound();
  }

  // Background analytics increment (non-blocking)
  writeClient
    .patch(id)
    .setIfMissing({ views: 0 })
    .inc({ views: 1 })
    .commit({ autoGenerateArrayKeys: true, visibility: "async" })
    .catch((err) => console.error(`[Sanity Analytics] Failed to increment views for ${id}:`, err));

  let pages: any[] = [];
  try {
    pages = JSON.parse(catalog.pagesJson);
  } catch (err) {
    console.error("Failed to parse lookbook sheets JSON:", err);
    notFound();
  }

  let ogImage = "https://imagestudiolab.com/og-image.png";
  const firstImgPage = pages.find((p: any) => p.type === "image" && (p.src || (p.images && p.images[0])));
  if (firstImgPage) {
    ogImage = firstImgPage.src || firstImgPage.images[0];
  }

  const catalogJsonLd = jsonLd.catalog({
    id,
    title: catalog.title,
    subtitle: catalog.subtitle || undefined,
    brandName: catalog.brandName || "Image Studio Lab",
    ogImage,
    datePublished: catalog._createdAt
  });

  return (
    <div className="min-h-screen bg-[#15110D] text-[#FAF7F2] font-sans pt-28 pb-16 overflow-x-hidden relative">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd).replace(/</g, "\\u003c") }}
      />
      {/* Dynamic light accent matching preset styling */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(184,137,62,0.06)_0%,transparent_60%)] pointer-events-none z-0" />

      <header className="relative w-full z-10 px-6 max-w-7xl mx-auto mb-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-gold/10 px-3.5 py-1 text-[10px] font-bold text-gold tracking-widest uppercase border border-gold/15">
            <BookOpen className="h-3 w-3" />
            Interactive Lookbook
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-foreground max-w-3xl leading-tight">
            {catalog.title}
          </h1>
          {catalog.brandName && catalog.brandName.toUpperCase() !== "FOLIO" && (
            <p className="text-xs md:text-sm text-muted font-medium tracking-wide uppercase mt-1">
              Curated by <span className="text-foreground font-semibold">{catalog.brandName}</span>
            </p>
          )}
        </div>
      </header>

      {/* Presentation flipbook section */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 relative z-10 mb-16">
        <div className="w-full flex items-center justify-center">
          <Flipbook pages={pages} brandName={catalog.brandName} />
        </div>
      </section>

      {/* Corporate Booking Form / Lead generation funnel */}
      <section id="inquiry-stage" className="mx-auto max-w-7xl px-4 md:px-6 relative z-10 border-t border-white/5 bg-[#1C1814]/30 rounded-3xl overflow-hidden">
        <CatalogueBooking businessName={catalog.brandName ? catalog.brandName.toLowerCase().replace(/\s+/g, "-") : "image-studio-lab"} />
      </section>
    </div>
  );
}
