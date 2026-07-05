import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Flipbook } from "@/components/brand/flipbook";
import { CatalogueBooking } from "@/components/brand/catalogue-booking";
import { Sparkles, Info, BookOpen } from "lucide-react";

interface PageProps {
  params: Promise<{ businessName: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { businessName } = await params;
  const formattedName = businessName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const pageTitle = `${formattedName} × Image Studio Lab — Premium Lookbook`;
  const pageDesc = `Immerse in the interactive 3D digital catalogue for ${formattedName}. Powered by high-end AI product photography prompts from Image Studio Lab.`;
  const pageImage = "https://imagestudiolab.com/catalogues/new-fashion/1.png";

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: {
      canonical: `/catalogues/${businessName}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      type: "article",
      url: `/catalogues/${businessName}`,
      siteName: "Image Studio Lab",
      images: [{ url: pageImage, width: 1200, height: 630, alt: formattedName }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
      images: [pageImage],
    },
  };
}

export default async function CataloguePage({ params }: PageProps) {
  const { businessName } = await params;

  // Validate or normalize business name
  if (!businessName) {
    notFound();
  }

  const formattedName = businessName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // Define premium catalogue pages for the brand
  const cataloguePages = [
    // Page 1: Cover (Image 1)
    {
      type: "image" as const,
      src: "/catalogues/new-fashion/1.png",
      title: "Couture Lookbook",
      subtitle: `${formattedName.toUpperCase()} — VOL I`,
      hotspots: [
        {
          x: "50%",
          y: "85%",
          title: "The Editorial Collection",
          description: "A showcase of high-end fashion design prompts.",
          link: "/packs",
          linkText: "Explore Packs",
        }
      ]
    },
    // Page 2: Editorial Text Spread (Minimalist luxury typography)
    {
      type: "editorial" as const,
      title: "The Vision.",
      subtitle: "REDEFINING DIGITAL STYLING",
      content: `Welcome to the interactive digital showroom of ${formattedName}. In collaboration with Image Studio Lab, we present a collaborative lookbook designed entirely via advanced generative prompt systems. By mapping volumetric soft studio lighting, soft neutral shadows, and intricate fabric textures, we establish a new paradigm in digital cataloguing.`,
      quote: "Simplicity is the keynote of all true elegance.",
      quoteAuthor: "Coco Chanel"
    },
    // Page 3: Spread 1 Right (Image 2)
    {
      type: "image" as const,
      src: "/catalogues/new-fashion/2.png",
      title: "Minimalist Drapes",
      subtitle: "THE HAUTE COLLECTION",
      hotspots: [
        {
          x: "30%",
          y: "35%",
          title: "Warm Studio Blazer",
          description: "Tailored fit blazer styled with warm volumetric lighting prompts.",
          price: "$320",
          link: "/packs/product-photoshoot",
          linkText: "View Prompt Pack"
        },
        {
          x: "65%",
          y: "65%",
          title: "Luxe Linen Trousers",
          description: "Relaxed silhouette captured with soft shadow diffusion techniques.",
          price: "$240",
          link: "/packs/product-photoshoot",
          linkText: "View Prompt Pack"
        }
      ]
    },
    // Page 4: Spread 2 Left (Image 3)
    {
      type: "image" as const,
      src: "/catalogues/new-fashion/3.png",
      title: "Prismatic Details",
      subtitle: "TEXTURE & VOLUME",
      hotspots: [
        {
          x: "45%",
          y: "40%",
          title: "Minimal Silk Drape",
          description: "Fine silk thread textures engineered with high-contrast prompt matrices.",
          price: "$480",
          link: "/packs/cinematic-lighting",
          linkText: "View Prompt Pack"
        }
      ]
    },
    // Page 5: Spread 2 Right (Image 5 - Newly Generated!)
    {
      type: "image" as const,
      src: "/catalogues/new-fashion/5.png",
      title: "Contemporary Staging",
      subtitle: "STUDIO COUTURE",
      hotspots: [
        {
          x: "50%",
          y: "45%",
          title: "Saffron Lounge Gown",
          description: "Premium neutral saffron tone silk dress, captured with directional gold hour lighting.",
          price: "$560",
          link: "/packs/product-photoshoot",
          linkText: "View Prompt Pack"
        }
      ]
    },
    // Page 6: Back Cover (Image 4)
    {
      type: "image" as const,
      src: "/catalogues/new-fashion/4.png",
      title: "The Epilogue",
      subtitle: `${formattedName.toUpperCase()} × IMAGE STUDIO LAB`,
      hotspots: [
        {
          x: "50%",
          y: "15%",
          title: "Order Custom Shoot",
          description: "Request a custom AI-generated catalog spread for your brand's products.",
          link: "#booking-form",
          linkText: "Get Started"
        }
      ]
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": `${formattedName} × Image Studio Lab — Premium Lookbook`,
    "headline": `${formattedName} Catalogue Showcase`,
    "description": `Immerse in the interactive 3D digital catalogue for ${formattedName}. Powered by high-end AI product photography prompts from Image Studio Lab.`,
    "image": "https://imagestudiolab.com/catalogues/new-fashion/1.png",
    "author": {
      "@type": "Organization",
      "name": formattedName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Image Studio Lab",
      "logo": {
        "@type": "ImageObject",
        "url": "https://imagestudiolab.com/logo.png"
      }
    },
    "datePublished": "2026-03-24T00:00:00.000Z",
    "genre": "Catalog",
    "creativeWorkStatus": "Published"
  };

  return (
    <div className="min-h-screen bg-[#15110D] text-[#FAF7F2] font-sans overflow-x-hidden pt-20 relative">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      {/* Showroom Header */}
      <header className="relative py-12 md:py-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,137,62,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="mx-auto max-w-4xl px-6 relative z-10">
          <div className="flex justify-center gap-2 mb-4">
            <span className="flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-[10px] font-bold text-gold tracking-widest uppercase">
              <Sparkles className="h-3 w-3" />
              Interactive Showroom
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
            {formattedName} <br />
            <em className="italic font-normal font-serif text-gold">Couture Lookbook</em>
          </h1>
          <p className="mt-4 mx-auto max-w-xl text-xs md:text-sm text-[#6B5F52] leading-relaxed font-medium">
            Experience realistic 3D page transitions, dynamic shadows, and interactive pulsing product hotspots.
          </p>
        </div>
      </header>

      {/* The 3D Flipbook Core Container */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#15110D] via-[#201B15] to-[#15110D] rounded-3xl opacity-40 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          <Flipbook pages={cataloguePages} brandName={formattedName} />
        </div>
      </section>

      {/* Immersive User Guide Section */}
      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/5 bg-card/25 p-4 backdrop-blur-xl text-left max-w-xl">
          <Info className="h-5 w-5 text-gold shrink-0 mt-0.5" />
          <p className="text-xs text-muted font-sans font-medium leading-relaxed">
            <strong className="text-foreground">Tactile Experience:</strong> Click the outer edges of the book to flip pages. Toggle the sound speaker to hear realistic paper friction. Hover or click product hotspots inside the images to view prompt specifications.
          </p>
        </div>
      </section>

      {/* Corporate Booking Form */}
      <div id="booking-form">
        <CatalogueBooking businessName={businessName} />
      </div>
    </div>
  );
}
