import { Metadata } from "next";

export const PRODUCTION_DOMAIN = "https://www.imagestudiolab.com";

/**
 * Base SEO Configuration for imagestudiolab.com
 */
export const BASE_SEO = {
  title: {
    default: "Image Studio Lab — AI 3D Shoppable Lookbooks & Digital Catalogs",
    template: "%s | Image Studio Lab"
  },
  description: "Create premium digital showrooms featuring hardware-accelerated 3D page turns, interactive hotspots, and integrated purchase buttons. Turn any text brief into a shoppable catalog.",
  applicationName: "Image Studio Lab",
  authors: [{ name: "Image Studio Lab Team", url: PRODUCTION_DOMAIN }],
  creator: "Image Studio Lab",
  publisher: "Image Studio Lab",
  metadataBase: new URL(PRODUCTION_DOMAIN),
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxVideoPreview: -1,
      maxImagePreview: "large" as const,
      maxSnippet: -1
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PRODUCTION_DOMAIN,
    siteName: "Image Studio Lab",
    title: "Image Studio Lab — AI 3D Shoppable Lookbooks",
    description: "Create premium digital showrooms featuring hardware-accelerated 3D page turns, interactive hotspots, and integrated purchase buttons.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Image Studio Lab — AI 3D Shoppable Lookbooks"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Studio Lab — AI 3D Shoppable Lookbooks",
    description: "Create premium digital showrooms featuring hardware-accelerated 3D page turns, interactive hotspots, and integrated purchase buttons.",
    images: ["/og-image.png"],
    creator: "@imagestudiolab"
  },
  verification: {
    google: "google-site-verification-placeholder-code-will-be-injected" // Google Search Console verification meta tag
  }
};

interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Generate fully-optimized Next.js Metadata objects with clean OpenGraph,
 * Twitter cards, canonical tags, and verification meta codes.
 */
export function getMetadata(options: MetadataOptions = {}): Metadata {
  const { title, description, path = "", ogImage, noIndex = false } = options;

  const finalTitle = title ? `${title} | Image Studio Lab` : BASE_SEO.title.default;
  const finalDesc = description || BASE_SEO.description;
  const finalUrl = `${PRODUCTION_DOMAIN}${path.startsWith("/") ? path : `/${path}`}`;
  const finalImage = ogImage || `${PRODUCTION_DOMAIN}/og-image.png`;

  return {
    ...BASE_SEO,
    title: title ? { default: finalTitle, template: BASE_SEO.title.template } : BASE_SEO.title,
    description: finalDesc,
    alternates: {
      canonical: finalUrl
    },
    robots: noIndex
      ? { index: false, follow: false }
      : BASE_SEO.robots,
    openGraph: {
      ...BASE_SEO.openGraph,
      title: finalTitle,
      description: finalDesc,
      url: finalUrl,
      images: [{ url: finalImage, width: 1200, height: 630, alt: title || "Image Studio Lab" }]
    },
    twitter: {
      ...BASE_SEO.twitter,
      title: finalTitle,
      description: finalDesc,
      images: [finalImage]
    }
  };
}

/**
 * JSON-LD Schema.org Structured Data Generators
 */
export const jsonLd = {
  /**
   * Organization Schema
   */
  organization: () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${PRODUCTION_DOMAIN}/#organization`,
    name: "Image Studio Lab",
    url: PRODUCTION_DOMAIN,
    logo: {
      "@type": "ImageObject",
      "@id": `${PRODUCTION_DOMAIN}/#logo`,
      url: `${PRODUCTION_DOMAIN}/logo.png`,
      caption: "Image Studio Lab Logo"
    },
    image: {
      "@id": `${PRODUCTION_DOMAIN}/#logo`
    },
    sameAs: [
      "https://twitter.com/imagestudiolab",
      "https://instagram.com/imagestudiolab",
      "https://pinterest.com/imagestudiolab"
    ]
  }),

  /**
   * WebSite Schema
   */
  website: () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${PRODUCTION_DOMAIN}/#website`,
    name: "Image Studio Lab",
    url: PRODUCTION_DOMAIN,
    publisher: {
      "@id": `${PRODUCTION_DOMAIN}/#organization`
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${PRODUCTION_DOMAIN}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }),

  /**
   * Catalog / CreativeWork Schema (for dynamic lookbooks)
   */
  catalog: (options: { id: string; title: string; subtitle?: string; brandName: string; ogImage?: string; datePublished?: string }) => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${PRODUCTION_DOMAIN}/lookbook/${options.id}/#catalog`,
    url: `${PRODUCTION_DOMAIN}/lookbook/${options.id}`,
    name: `${options.title} Lookbook Catalog`,
    headline: options.title,
    description: options.subtitle || `Interactive 3D digital catalog publication for ${options.brandName}.`,
    image: options.ogImage || `${PRODUCTION_DOMAIN}/og-image.png`,
    datePublished: options.datePublished || new Date().toISOString(),
    genre: "Catalog",
    creativeWorkStatus: "Published",
    author: {
      "@type": "Organization",
      name: options.brandName
    },
    publisher: {
      "@id": `${PRODUCTION_DOMAIN}/#organization`
    }
  })
};
