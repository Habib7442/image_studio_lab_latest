const API_KEY = process.env.GEMINI_API_KEY || "";

// Curated pool of high-quality, editorial Unsplash photography IDs to ensure premium aesthetics.
// These are selected to look gorgeous in full-bleed magazine spreads.
export const EDITORIAL_IMAGES = {
  fashion: [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80", // Couture Yellow Dress
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80", // Premium Blazer
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80", // Elegant Drapes
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80", // Saffron / White Silk
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"  // Luxury Silhouette
  ],
  pottery: [
    "https://images.unsplash.com/photo-1581781870027-04212e231e96?auto=format&fit=crop&w=800&q=80", // Clay Ceramic Vases
    "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80", // Handcrafted Candles
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80", // Stoneware plates on rock tray
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80", // Natural linen textile
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"  // Warm minimalist studio
  ],
  jewelry: [
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80", // Gold rings on marble
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80", // Pearl earrings on velvet
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80", // Luxury perfume spray
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80", // Solid gold neck chains
    "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80"  // Premium handcrafted jewelry
  ]
};

// Fallback presets in case API key is missing or request fails
export const FALLBACK_CATALOGS: Record<string, any> = {
  "earthy-sage": {
    title: "Ochre & Sage Pottery Studio",
    subtitle: "STYLISH STONEWARE VOL. II",
    brandName: "Ochre Pottery",
    pages: [
      {
        type: "image",
        src: EDITORIAL_IMAGES.pottery[0],
        title: "Earth & Hands",
        subtitle: "FOUNDING SERIES",
        hotspots: [
          { x: "50%", y: "45%", title: "Stoneware Clay Vase", price: "$145", description: "Volumetric clay thrown by hand and wood-fired.", linkText: "View Vessel" }
        ]
      },
      {
        type: "editorial",
        title: "The Craft.",
        subtitle: "ANCIENT CLAY MODERN FORMS",
        content: "Every Ochre vessel is crafted from raw iron-rich stoneware, hand-thrown in our secluded forest studio. We seek the perfect imperfection—the tiny cracks, iron bursts, and asymmetric silhouettes that make organic design feel alive. Guided by warm stone textures and earthy forest tones, our collection is curated to ground modern spaces.",
        quote: "Beauty of style and harmony and grace and good rhythm depend on simplicity.",
        quoteAuthor: "Plato"
      },
      {
        type: "image",
        src: EDITORIAL_IMAGES.pottery[1],
        title: "Scented Atmosphere",
        subtitle: "COSY RITUALS",
        hotspots: [
          { x: "35%", y: "60%", title: "Forest Sage Soy Candle", price: "$38", description: "Hand-poured coconut wax infused with oakmoss and raw cedar wood.", linkText: "Buy Candle" }
        ]
      },
      {
        type: "image",
        src: EDITORIAL_IMAGES.pottery[2],
        title: "Stoneware Plate Settings",
        subtitle: "ORGANIC DINING",
        hotspots: [
          { x: "40%", y: "45%", title: "Raw Rim Dinner Plates", price: "$85", description: "Coarse clay clay bodies left bare with clean satin glaze interiors.", linkText: "View Dinnerware" },
          { x: "70%", y: "55%", title: "Stone Pouring Carafe", price: "$120", description: "Textured pouring jar designed with wide grip and drip-free rim.", linkText: "View Carafe" }
        ]
      },
      {
        type: "image",
        src: EDITORIAL_IMAGES.pottery[3],
        title: "Linen Backing Elements",
        subtitle: "SOFT TOUCHES",
        hotspots: [
          { x: "50%", y: "50%", title: "Washed Sage Throw", price: "$180", description: "French linen spun with raw hemp and stonewashed for soft density.", linkText: "View Throw" }
        ]
      },
      {
        type: "image",
        src: EDITORIAL_IMAGES.pottery[4],
        title: "The Epilogue",
        subtitle: "OCHRE & SAGE STUDIO",
        hotspots: [
          { x: "50%", y: "20%", title: "Reserve Workshop Slot", price: "From $90", description: "Join our master potters for a one-on-one custom throwing experience.", linkText: "Book Class" }
        ]
      }
    ]
  },
  "midnight-velvet": {
    title: "Midnight Atelier Couture",
    subtitle: "EVENING COUTURE FORUM",
    brandName: "Midnight Atelier",
    pages: [
      {
        type: "image",
        src: EDITORIAL_IMAGES.fashion[1],
        title: "Midnight Silhouette",
        subtitle: "ACT I — INTRO",
        hotspots: [
          { x: "50%", y: "40%", title: "Charcoal Velvet Blazer", price: "$750", description: "Structured double-breasted velvet blazer featuring fine silk lapels.", linkText: "Explore Blazer" }
        ]
      },
      {
        type: "editorial",
        title: "The Moonlight.",
        subtitle: "TAILORED IN INK SHADOWS",
        content: "Midnight Atelier represents the collision of sharp, structured silhouettes and liquid textures. Designed to capture and reflect light under dim amber dinner tables and moonlit streets, this collection relies on Italian-woven velvet, pure mulberry silk, and solid sterling buttons. No compromises. Pure luxury.",
        quote: "One is never over-dressed or under-dressed with a Little Black Dress.",
        quoteAuthor: "Karl Lagerfeld"
      },
      {
        type: "image",
        src: EDITORIAL_IMAGES.fashion[2],
        title: "Draped Elements",
        subtitle: "LIQUID SATIN SILK",
        hotspots: [
          { x: "45%", y: "50%", title: "Satin Draped Dress", price: "$980", description: "Open-back slip dress engineered with heavy dynamic drapes.", linkText: "Buy Slip" }
        ]
      },
      {
        type: "image",
        src: EDITORIAL_IMAGES.fashion[4],
        title: "Shadow Staging",
        subtitle: "MYSTERIOUS FORM",
        hotspots: [
          { x: "60%", y: "35%", title: "Ink Cashmere Trench", price: "$1,450", description: "Water-repellent wool-cashmere blend with structured padded shoulders.", linkText: "View Trench" }
        ]
      },
      {
        type: "image",
        src: EDITORIAL_IMAGES.jewelry[1],
        title: "Gleaming Metal",
        subtitle: "STERLING ORNAMENT",
        hotspots: [
          { x: "50%", y: "45%", title: "Baroque Pearl Drops", price: "$290", description: "Irregular freshwater pearls hung on solid sterling drop studs.", linkText: "View Pearls" }
        ]
      },
      {
        type: "image",
        src: EDITORIAL_IMAGES.jewelry[0],
        title: "The Epilogue",
        subtitle: "MIDNIGHT ATELIER × IMAGINATION",
        hotspots: [
          { x: "50%", y: "20%", title: "Request Private Fitting", price: "Free", description: "Schedule an exclusive custom tailoring session at our showroom.", linkText: "Request Fitting" }
        ]
      }
    ]
  },
  "crimson-rose": {
    title: "Saffron Rose Couture",
    subtitle: "REDEFINING LUXURY COUTURE",
    brandName: "Saffron Rose",
    pages: [
      {
        type: "image",
        src: EDITORIAL_IMAGES.fashion[0],
        title: "Couture Lookbook",
        subtitle: "SAFFRON ROSE — VOL I",
        hotspots: [
          { x: "50%", y: "85%", title: "The Couture Gown", price: "$1,200", description: "High-end saffron silk gown captured in warm volumetric light.", linkText: "Explore Gown" }
        ]
      },
      {
        type: "editorial",
        title: "The Vision.",
        subtitle: "REDEFINING DIGITAL STYLING",
        content: "Saffron Rose combines highly saturated accent pigments with luxurious cream drapery to curate a bold, statement-making presence. Our creative brief maps warm studio lighting, rich fabric textures, and organic structures to evoke deep, historical emotions in modern luxury wardrobes.",
        quote: "Simplicity is the keynote of all true elegance.",
        quoteAuthor: "Coco Chanel"
      },
      {
        type: "image",
        src: EDITORIAL_IMAGES.fashion[3],
        title: "Contemporary Staging",
        subtitle: "STUDIO DRAUGHTS",
        hotspots: [
          { x: "50%", y: "45%", title: "Saffron Lounge Gown", price: "$560", description: "Premium neutral saffron tone silk dress, captured with directional gold hour lighting.", linkText: "Buy Gown" }
        ]
      },
      {
        type: "image",
        src: EDITORIAL_IMAGES.fashion[1],
        title: "Tailored Focus",
        subtitle: "CRIMSON EMBLEMS",
        hotspots: [
          { x: "30%", y: "35%", title: "Warm Studio Blazer", price: "$320", description: "Tailored fit blazer styled with warm volumetric lighting prompts.", linkText: "View Blazer" }
        ]
      },
      {
        type: "image",
        src: EDITORIAL_IMAGES.jewelry[2],
        title: "Aromatic Additions",
        subtitle: "SIGNATURE MIST",
        hotspots: [
          { x: "45%", y: "40%", title: "Amber Mist Perfume", price: "$190", description: "Volcanic musk and absolute rose petal extracts crafted in Grasse.", linkText: "View Mist" }
        ]
      },
      {
        type: "image",
        src: EDITORIAL_IMAGES.jewelry[4],
        title: "The Epilogue",
        subtitle: "SAFFRON ROSE LUXE",
        hotspots: [
          { x: "50%", y: "15%", title: "Order Custom Catalog", price: "Free Consultation", description: "Request an interactive digital showcase tailor-made for your fashion brand.", linkText: "Get Started" }
        ]
      }
    ]
  }
};

// Response schema for Google Gemini API structured output
// Response schema for Google Gemini API structured output dynamically built per target page count
function getCatalogResponseSchema(targetPageCount: number) {
  return {
    type: "OBJECT",
    properties: {
      title: {
        type: "STRING",
        description: "The primary headline/title of the publication catalog. Max 6 words.",
      },
      subtitle: {
        type: "STRING",
        description: "A luxury editorial, magazine-style subtitle. Max 8 words.",
      },
      brandName: {
        type: "STRING",
        description: "The name of the business/brand generating this catalog.",
      },
      pages: {
        type: "ARRAY",
        minItems: targetPageCount,
        maxItems: targetPageCount,
        description: `A list of pages in the catalog. Must contain EXACTLY ${targetPageCount} pages. Page 1 is always the Cover (image layout), Page 2 is always the Editorial Introduction (editorial layout), Pages 3 to ${targetPageCount - 1} are Image Showcases (image layout), and Page ${targetPageCount} is always the Epilogue/Back Cover (image layout).`,
        items: {
          type: "OBJECT",
          properties: {
            type: {
              type: "STRING",
              enum: ["image", "editorial"],
              description: "The page layout style.",
            },
            src: {
              type: "STRING",
              description: "An absolute Unsplash image URL. Pick from the curated pool in the prompt depending on the brand category (e.g. fashion, pottery, or jewelry). Pick a unique image for each page.",
            },
            title: {
              type: "STRING",
              description: "The title of this page. Max 4 words.",
            },
            subtitle: {
              type: "STRING",
              description: "The subtitle or label of this page. Max 5 words.",
            },
            content: {
              type: "STRING",
              description: "Detailed editorial paragraph. REQUIRED only if type is 'editorial'. Make it sound extremely professional, luxurious, and slow-crafted. Max 80 words.",
            },
            quote: {
              type: "STRING",
              description: "A beautiful, inspirational quote on beauty, art, design, or simplicity. Only applicable if type is 'editorial'.",
            },
            quoteAuthor: {
              type: "STRING",
              description: "The author of the quote.",
            },
            hotspots: {
              type: "ARRAY",
              description: "List of product hotspots placed on the catalog page. Only applicable if type is 'image'. Max 2 hotspots per page.",
              items: {
                type: "OBJECT",
                properties: {
                  x: {
                    type: "STRING",
                    description: "Percentage X-coordinate from left (e.g. '30%', '55%', '65%'). Keep away from edges.",
                  },
                  y: {
                    type: "STRING",
                    description: "Percentage Y-coordinate from top (e.g. '25%', '40%', '70%').",
                  },
                  title: {
                    type: "STRING",
                    description: "The product item name. Max 3 words.",
                  },
                  description: {
                    type: "STRING",
                    description: "An elegant description emphasizing quality, craftsmanship, and materials. Max 15 words.",
                  },
                  price: {
                    type: "STRING",
                    description: "Product price (e.g., '$85', '$240', '$450').",
                  },
                  linkText: {
                    type: "STRING",
                    description: "Action CTA label (e.g. 'View Product', 'Explore Pack').",
                  },
                },
                required: ["x", "y", "title", "description", "price", "linkText"],
              },
            },
          },
          required: ["type", "title", "subtitle"],
        },
      },
    },
    required: ["title", "subtitle", "brandName", "pages"],
  };
}

/**
 * Generates an interactive editorial catalog using the Google Gemini 1.5 Flash API
 * with strict structured JSON output. Falls back to pre-designed catalogs on error.
 */
export async function generateCatalogLayout(
  brief: string,
  palettePreset: string,
  imageUrls?: string[],
  excludeText?: boolean,
  sanityImageUrls?: string[],
  youtubeUrl?: string,
  actionLink?: string,
  actionLinkText?: string
): Promise<any> {
  const apiKey = process.env.GEMINI_API_KEY || "";
  // If API key is missing, return fallback preset instantly
  if (!apiKey) {
    console.warn("Gemini API key missing from process.env. Serving highly curated fallback preset catalog.");
    return FALLBACK_CATALOGS[palettePreset] || FALLBACK_CATALOGS["earthy-sage"];
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

    // Map presets to image pools to feed in the system instructions
    let category = "fashion";
    if (palettePreset === "earthy-sage") category = "pottery";
    else if (palettePreset === "crimson-rose") category = "fashion";
    else if (palettePreset === "midnight-velvet") category = "jewelry";

    const numImages = sanityImageUrls?.length || 0;
    let targetPageCount = 6;
    if (numImages > 0 && numImages <= 4) {
      targetPageCount = 4;
    } else if (numImages > 4) {
      targetPageCount = 6;
    }

    let imagePool = [...(EDITORIAL_IMAGES[category as keyof typeof EDITORIAL_IMAGES] || EDITORIAL_IMAGES.fashion)];
    if (sanityImageUrls && sanityImageUrls.length > 0) {
      imagePool = sanityImageUrls; // ONLY use uploaded images, no stock photos added to end
    }

    const pageStructureRules = excludeText
      ? `
      CRITICAL PAGE STRUCTURE RULES (MINIMAL / NO-TEXT MODE):
      - The catalog MUST contain EXACTLY ${targetPageCount} pages. No more, no less.
      - All pages must be visual image pages (type: "image"). NEVER use type "editorial".
      - Page 1: Cover Page. Must be type 'image'. Pick the first image (index 0) from the image pool below.
      - Pages 2 to ${targetPageCount - 1}: Visual Showcases. Must be type 'image'. Pick subsequent images from the image pool.
      - Page ${targetPageCount}: Epilogue/Back Cover. Must be type 'image'. Pick the final image from the pool.
      - DO NOT generate 'content', 'quote', or 'quoteAuthor' for any page. Keep them null or omitted.
      `
      : `
      CRITICAL PAGE STRUCTURE RULES (EDITORIAL MODE):
      - The catalog MUST contain EXACTLY ${targetPageCount} pages. No more, no less.
      - Page 1: Renders the book COVER. Must be type 'image'. Pick the first image (index 0) from the image pool below.
      - Page 2: Renders an 'EDITORIAL' layout introduction. Must be type 'editorial'. Must contain 'content', 'quote', and 'quoteAuthor'. Do NOT provide hotspots or src.
      - Pages 3 to ${targetPageCount - 1}: Renders 'image' type. Pick subsequent images from the image pool. Must contain 1-2 shoppable hotspots.
      - Page ${targetPageCount}: Renders the EPILOGUE/BACK COVER. Must be type 'image'. Pick the final image from the image pool. Must contain 1 hotspot.
      `;

    const systemInstruction = `
      You are a master, world-class catalog maker and expert catalog designer.
      Your task is to take a creative brief (and optional reference image context) and generate a structured JSON catalog layout for a 3D physical book showroom.
      
      ${pageStructureRules}

      IMAGE POOL FOR THIS BRAND CATEGORY:
      ${JSON.stringify(imagePool, null, 2)}
      
      Pick ONLY from the absolute URLs listed above. Ensure every image is used uniquely per page in order (e.g. index 0 for page 1, index 1 for page 3, index 2 for page 4, index 3 for page 5, index 4 for page 6).
      
      Hotspot Placement Rules:
      - Coordinate 'x' must be a percentage between '15%' and '85%'.
      - Coordinate 'y' must be a percentage between '15%' and '85%'.
      
      Copywriting Tone:
      - Editorial, premium, high-contrast, artistic.
      - Never use generic words like "leverage", "elevate", "unlock", or "game-changer".
      - Rely on evocative, sensory language ("directional shadows", "French spun linen", "hand-fired").
      
      FACTUAL COPY & REAL NEWS REQUIREMENTS:
      - Do NOT write generic, filler, or placeholder/dummy copy (e.g. avoid repeating the same abstract design words).
      - If the creative brief or reference images mention or depict a real-world public figure, brand, or topic (such as Deepika Padukone, Lionel Messi, Kriti Sanon), you must search your training knowledge and write real, factual editorial content.
      - Include actual news milestones, career achievements, official brand associations (such as her skincare brand 82°E, Cartier and Louis Vuitton ambassadorships, recent film milestones like Kalki 2898 AD, Fighter, Pathaan), and realistic quotes matching their public persona.
      
      VISION INSTRUCTIONS:
      - Multiple reference images may be uploaded. Analyze their styles, tones, subjects, and color palettes. Use them as direct creative context to customize the catalog copywriting and design aesthetic.
    `;

    const prompt = `
      CREATIVE BRIEF FOR CATALOG:
      "${brief}"
      
      PALETTE PRESET STYLING CONTEXT:
      "${palettePreset}"
      
      ${excludeText ? "NOTE: Exclude all descriptive text paragraphs and quotes. Generate an image-only showcase layout." : ""}
      
      Generate a complete, structured JSON catalog strictly adhering to the schema.
    `;

    // Process multiple image base64 files if available for multi-modal Vision payload
    const parts: any[] = [{ text: prompt }];
    if (imageUrls && imageUrls.length > 0) {
      for (const base64Url of imageUrls) {
        if (base64Url.startsWith("data:")) {
          const commaIdx = base64Url.indexOf(",");
          if (commaIdx !== -1) {
            const mimeMatch = base64Url.substring(0, commaIdx).match(/data:([^;]+);base64/);
            if (mimeMatch) {
              const mimeType = mimeMatch[1];
              const base64Data = base64Url.substring(commaIdx + 1);
              parts.push({
                inlineData: {
                  mimeType: mimeType,
                  data: base64Data
                }
              });
            }
          }
        }
      }
    }

    const payload = {
      contents: [
        {
          role: "user",
          parts: parts
        }
      ],
      systemInstruction: {
        parts: [
          {
            text: systemInstruction
          }
        ]
      },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: getCatalogResponseSchema(targetPageCount),
        temperature: 0.7
      }
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini API returned status ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const jsonString = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!jsonString) {
      throw new Error("Received empty response or missing text in candidates list from Gemini REST API");
    }

    const parsedCatalog = JSON.parse(jsonString);

    // Hybrid AI Pattern: Post-process page image references, split layout mapping, and external links
    if (parsedCatalog && Array.isArray(parsedCatalog.pages)) {
      // Find the first inner image page index (excluding Cover page index 0)
      const firstInnerImageIdx = parsedCatalog.pages.findIndex(
        (p: any, idx: number) => p.type === "image" && idx > 0
      );

      // First, set up video and CTA parameters where applicable (targeted to exactly one page to prevent duplication)
      for (let i = 0; i < parsedCatalog.pages.length; i++) {
        const page = parsedCatalog.pages[i];
        if (page.type === "image") {
          // Inject optional YouTube Video URL on the target inner page only
          if (youtubeUrl && i === firstInnerImageIdx) {
            page.videoUrl = youtubeUrl;
          }

          // Inject optional Action Link CTA button on the target inner page only by default
          if (actionLink && i === firstInnerImageIdx) {
            page.link = actionLink;
            page.linkText = actionLinkText || "Shop Now";
          }
        }
      }

      // Filter out which pages are active image pages (type === 'image' and no videoUrl)
      const activeImagePageIndices = parsedCatalog.pages
        .map((p: any, idx: number) => (p.type === "image" && !p.videoUrl ? idx : -1))
        .filter((idx: number) => idx !== -1);

      if (activeImagePageIndices.length > 0) {
        // First image in pool goes to the cover page (index activeImagePageIndices[0])
        const coverIdx = activeImagePageIndices[0];
        parsedCatalog.pages[coverIdx].src = imagePool[0];
        parsedCatalog.pages[coverIdx].images = [imagePool[0]];

        // Distribute the remaining images among remaining active image pages
        const remainingImages = imagePool.slice(1);
        const remainingPageIndices = activeImagePageIndices.slice(1);

        let imgIdx = 0;
        for (let k = 0; k < remainingPageIndices.length; k++) {
          const pageIdx = remainingPageIndices[k];
          const pagesLeft = remainingPageIndices.length - k;
          const imgsLeft = remainingImages.length - imgIdx;

          if (imgsLeft > pagesLeft && imgsLeft >= 2) {
            // We have more images than remaining slots, so split layout maps 2 images to this sheet!
            const imgA = remainingImages[imgIdx];
            const imgB = remainingImages[imgIdx + 1];
            parsedCatalog.pages[pageIdx].src = imgA; // Fallback
            parsedCatalog.pages[pageIdx].images = [imgA, imgB];
            imgIdx += 2;
          } else if (imgsLeft > 0) {
            // Assign single image to this sheet
            const img = remainingImages[imgIdx];
            parsedCatalog.pages[pageIdx].src = img;
            parsedCatalog.pages[pageIdx].images = [img];
            imgIdx += 1;
          }
        }
      }
    }

    console.log("Successfully generated structured catalog via Gemini 3.5 Flash REST API:", parsedCatalog.title);
    return parsedCatalog;

  } catch (error) {
    console.error("Failed to generate catalog via Gemini REST API. Falling back to preset:", error);
    return FALLBACK_CATALOGS[palettePreset] || FALLBACK_CATALOGS["earthy-sage"];
  }
}
