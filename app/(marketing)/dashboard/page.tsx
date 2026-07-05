"use client";

import React, { useState, useEffect, useTransition, useRef } from "react";
import { generateCatalogAction } from "@/lib/actions/generate-catalog";
import { saveCatalogAction } from "@/lib/actions/save-catalog";
import { getUserCatalogsAction } from "@/lib/actions/get-user-catalogs";
import { deleteCatalogAction } from "@/lib/actions/delete-catalog";
import { Flipbook } from "@/components/brand/flipbook";
import { CatalogueBooking } from "@/components/brand/catalogue-booking";
import { FALLBACK_CATALOGS } from "@/lib/gemini";
import { Sparkles, Send, Palette, FileText, Zap, Info, LayoutDashboard, Upload, X, Image as ImageIcon, Video, Link as LinkIcon, Edit3, Cloud, Copy, ExternalLink, Check, BookOpen, Search } from "lucide-react";
import { cn, getYoutubeEmbedUrl } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

const PRESET_STYLES = [
  {
    id: "earthy-sage",
    name: "Earthy Sage",
    desc: "Cream background, Sage accents, Charcoal text.",
    colors: ["#FAF7F2", "#4B5340", "#252525"],
  },
  {
    id: "midnight-velvet",
    name: "Midnight Velvet",
    desc: "Ink Black background, Silver borders, Maroon accents.",
    colors: ["#0B0B0C", "#E2E8F0", "#7B2D26"],
  },
  {
    id: "crimson-rose",
    name: "Crimson Rose",
    desc: "Saffron Rose background, Red-Orange accents, Gold.",
    colors: ["#FAF7F2", "#FF4D2D", "#B8893E"],
  },
  {
    id: "royal-indigo",
    name: "Royal Indigo",
    desc: "Navy background, Gold accents, Silver borders.",
    colors: ["#0D1321", "#C49A45", "#E2E8F0"],
  },
  {
    id: "monochrome-silk",
    name: "Monochrome Silk",
    desc: "Alabaster background, Obsidian text, Gold borders.",
    colors: ["#FAF9F6", "#1A1A1A", "#B8893E"],
  },
];

const LOADING_STEPS = [
  "Google Gemini 3.5 Flash parsing brief & images...",
  "Creating multi-page editorial design tokens...",
  "Injecting shoppable hotspots from inventory...",
  "Hydrating 3D flipbook page models...",
];

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [searchQuery, setSearchQuery] = useState("");

  const [brief, setBrief] = useState(
    "A 6-page catalog for actress Deepika Padukone. Write real editorial news and milestones about Deepika Padukone (such as 82°E, Louis Vuitton, Cartier, her recent films Kalki 2898 AD)."
  );
  const [palettePreset, setPalettePreset] = useState("midnight-velvet");
  const [catalog, setCatalog] = useState<any>(FALLBACK_CATALOGS["midnight-velvet"]);
  const [isPending, startTransition] = useTransition();
  const [loadingStep, setLoadingStep] = useState(0);
  
  // Image Upload and Vision States
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [excludeText, setExcludeText] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Video and CTA Outbound Link States
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [actionLink, setActionLink] = useState("");
  const [actionLinkText, setActionLinkText] = useState("Shop Collection");

  // Tab Control in Console Column
  const [activeTab, setActiveTab] = useState<"console" | "editor" | "creatives">("console");
  const [selectedEditPage, setSelectedEditPage] = useState(0); // 0 to 5

  // Saved Creatives list states
  const [userCatalogs, setUserCatalogs] = useState<any[]>([]);
  const [isLoadingCatalogs, setIsLoadingCatalogs] = useState(false);

  const fetchUserCatalogs = async () => {
    setIsLoadingCatalogs(true);
    try {
      const response = await getUserCatalogsAction();
      if (response.success && response.data) {
        setUserCatalogs(response.data);
      }
    } catch (err) {
      console.error("Error loading user publications:", err);
    } finally {
      setIsLoadingCatalogs(false);
    }
  };

  useEffect(() => {
    fetchUserCatalogs();
  }, []);

  const [activeCatalogId, setActiveCatalogId] = useState<string | null>(null);

  // Cloud Saving States
  const [isSaving, setIsSaving] = useState(false);
  const [shareableLink, setShareableLink] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Rotate loading steps during Server Action execution
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPending) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 3500); // 3.5 seconds per step
    }
    return () => clearInterval(interval);
  }, [isPending]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (file.size > 4 * 1024 * 1024) {
        alert(`File "${file.name}" is larger than 4MB and will be skipped.`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setUploadedImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeUploadedImage = (indexToRemove: number) => {
    setUploadedImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleGenerateCatalog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brief.trim() || isPending) return;

    // Reset saving states on new generation
    setShareableLink(null);
    setCopiedLink(false);
    setActiveCatalogId(null);

    startTransition(async () => {
      let sanityUrls: string[] = [];

      // Pre-upload Base64 images via API route handler to bypass React Server Component serialization limits
      if (uploadedImages.length > 0) {
        try {
          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageUrls: uploadedImages }),
          });

          if (!uploadRes.ok) {
            throw new Error(`Upload API returned HTTP status ${uploadRes.status}`);
          }

          const uploadData = await uploadRes.json();
          if (uploadData.success && Array.isArray(uploadData.urls)) {
            sanityUrls = uploadData.urls;
          } else {
            alert("Image upload failed: " + (uploadData.error || "Unknown server error"));
            return;
          }
        } catch (uploadErr: any) {
          console.error("Client-side Base64 API upload error:", uploadErr);
          alert("Image upload failed: " + uploadErr.message);
          return;
        }
      }

      const response = await generateCatalogAction(
        brief,
        palettePreset,
        undefined, // Bypasses RSC serialization limits
        excludeText,
        youtubeUrl || undefined,
        actionLink || undefined,
        actionLinkText || undefined,
        sanityUrls.length > 0 ? sanityUrls : undefined
      );
      if (response.success && response.data) {
        setCatalog(response.data);
        if (response.error) {
          alert(response.error);
        }
      } else {
        alert(response.error || "An error occurred during generation. Falling back to preset.");
        setCatalog(FALLBACK_CATALOGS[palettePreset] || FALLBACK_CATALOGS["earthy-sage"]);
      }
    });
  };

  // Real-Time Sheet Editing Callbacks
  const handlePageFieldChange = (pageIdx: number, field: string, value: any) => {
    setCatalog((prev: any) => {
      if (!prev || !prev.pages) return prev;
      const updatedPages = [...prev.pages];
      updatedPages[pageIdx] = {
        ...updatedPages[pageIdx],
        [field]: value,
      };
      return {
        ...prev,
        pages: updatedPages,
      };
    });
  };

  const handleHotspotChange = (pageIdx: number, hotspotIdx: number, field: string, value: any) => {
    setCatalog((prev: any) => {
      if (!prev || !prev.pages) return prev;
      const updatedPages = [...prev.pages];
      const page = updatedPages[pageIdx];
      if (!page.hotspots) return prev;

      const updatedHotspots = [...page.hotspots];
      updatedHotspots[hotspotIdx] = {
        ...updatedHotspots[hotspotIdx],
        [field]: value,
      };

      updatedPages[pageIdx] = {
        ...page,
        hotspots: updatedHotspots,
      };
      return {
        ...prev,
        pages: updatedPages,
      };
    });
  };

  const handleAddHotspot = (pageIdx: number) => {
    setCatalog((prev: any) => {
      if (!prev || !prev.pages) return prev;
      const updatedPages = [...prev.pages];
      const page = { ...updatedPages[pageIdx] };
      const hotspots = page.hotspots ? [...page.hotspots] : [];
      hotspots.push({
        x: "50%",
        y: "50%",
        title: "New Product",
        price: "$0",
        description: "Product description...",
        linkText: "Shop Product"
      });
      page.hotspots = hotspots;
      updatedPages[pageIdx] = page;
      return { ...prev, pages: updatedPages };
    });
  };

  const handleDeleteHotspot = (pageIdx: number, hotspotIdx: number) => {
    setCatalog((prev: any) => {
      if (!prev || !prev.pages) return prev;
      const updatedPages = [...prev.pages];
      const page = { ...updatedPages[pageIdx] };
      if (!page.hotspots) return prev;
      const hotspots = page.hotspots.filter((_: any, idx: number) => idx !== hotspotIdx);
      page.hotspots = hotspots;
      updatedPages[pageIdx] = page;
      return { ...prev, pages: updatedPages };
    });
  };

  const handleDeletePage = (pageIdx: number) => {
    if (!catalog || !catalog.pages) return;
    if (catalog.pages.length <= 2) {
      alert("A publication must have at least 2 pages (Cover and Back).");
      return;
    }

    if (confirm(`Are you sure you want to delete Page ${pageIdx + 1}?`)) {
      setCatalog((prev: any) => {
        const updatedPages = prev.pages.filter((_: any, idx: number) => idx !== pageIdx);
        return {
          ...prev,
          pages: updatedPages,
        };
      });
      setSelectedEditPage(0);
    }
  };

  // Cloud Saving Handler
  const handleSaveCatalog = async () => {
    if (!catalog || isSaving) return;
    setIsSaving(true);
    setCopiedLink(false);
    
    try {
      const response = await saveCatalogAction({
        title: catalog.title || "Lookbook Collection",
        subtitle: catalog.subtitle || "",
        brandName: catalog.brandName || "",
        palettePreset: palettePreset,
        pages: catalog.pages,
      }, activeCatalogId || undefined);

      if (response.success && response.id) {
        setActiveCatalogId(response.id);
        const link = `${window.location.origin}/lookbook/${response.id}`;
        setShareableLink(link);
        fetchUserCatalogs();
        alert("Publication saved to cloud successfully!");
      } else {
        alert(response.error || "Failed to persist lookbook to the cloud.");
      }
    } catch (err: any) {
      console.error("Cloud saving exception:", err);
      alert("An unexpected error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCatalog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lookbook? This action cannot be undone.")) return;

    try {
      const response = await deleteCatalogAction(id);
      if (response.success) {
        alert("Lookbook deleted successfully.");
        // If we deleted the active catalog, reset active catalog states
        if (activeCatalogId === id) {
          setActiveCatalogId(null);
          setShareableLink(null);
        }
        fetchUserCatalogs();
      } else {
        alert(response.error || "Failed to delete lookbook.");
      }
    } catch (err: any) {
      console.error("Delete catalog error:", err);
      alert("An unexpected error occurred while deleting the lookbook.");
    }
  };

  const handleCreateManualCatalog = () => {
    const DEFAULT_MANUAL_PAGES = [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        title: "Front Cover Title",
        subtitle: "SEASON COLLECTION",
        hotspots: [
          { x: "50%", y: "50%", title: "Signature Item", price: "$99", description: "Edit details in Sheet Editor.", linkText: "Shop Product" }
        ]
      },
      {
        type: "editorial",
        title: "Editorial Story",
        subtitle: "OUR VISION",
        content: "Write your brand statement or publication story here. This editorial page is designed to showcase high-contrast typography alongside modern quotes.",
        quote: "Simplicity is the ultimate sophistication.",
        quoteAuthor: "Leonardo da Vinci"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
        title: "Product Focus",
        subtitle: "EXQUISITE DETAILS",
        hotspots: [
          { x: "30%", y: "40%", title: "Design Piece A", price: "$120", description: "Handcrafted details.", linkText: "Buy Now" }
        ]
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        title: "Bespoke Collection",
        subtitle: "LIMITED EDITION",
        hotspots: [
          { x: "60%", y: "30%", title: "Luxury Accent", price: "$350", description: "Limited run.", linkText: "Order Item" }
        ]
      },
      {
        type: "editorial",
        title: "Closing Notes",
        subtitle: "STAY CONNECTED",
        content: "Define your catalog's contact details, physical retail showrooms, or future launch dates here.",
        quote: "Design is not just what it looks like and feels like. Design is how it works.",
        quoteAuthor: "Steve Jobs"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
        title: "Back Cover",
        subtitle: "FOLIO SHOWROOM",
        hotspots: []
      }
    ];

    setCatalog({
      title: "Custom Lookbook Draft",
      subtitle: "MANUAL LAYOUT",
      brandName: "My Brand",
      pages: DEFAULT_MANUAL_PAGES,
    });

    setActiveCatalogId(null);
    setActiveTab("editor");
    setSelectedEditPage(0);
    alert("Created manual lookbook draft! You can now customize all pages in the Sheet Editor tab.");
  };

  const [isUploadingSheetImage, setIsUploadingSheetImage] = useState<Record<string, boolean>>({});

  const handleSheetImageUpload = async (pageIdx: number, field: string, files: FileList | null, subIdx?: number) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file.size > 4 * 1024 * 1024) {
      alert(`File "${file.name}" is larger than 4MB.`);
      return;
    }

    const uploadKey = `${pageIdx}-${field}-${subIdx ?? 0}`;
    setIsUploadingSheetImage((prev) => ({ ...prev, [uploadKey]: true }));

    // Read to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      if (!reader.result) {
        setIsUploadingSheetImage((prev) => ({ ...prev, [uploadKey]: false }));
        return;
      }
      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrls: [reader.result as string] }),
        });

        if (!uploadRes.ok) {
          throw new Error(`Upload API returned HTTP status ${uploadRes.status}`);
        }

        const uploadData = await uploadRes.json();
        if (uploadData.success && Array.isArray(uploadData.urls) && uploadData.urls[0]) {
          const uploadedUrl = uploadData.urls[0];
          
          // Set the value in catalog state!
          if (field === "images" && typeof subIdx === "number") {
            setCatalog((prev: any) => {
              if (!prev || !prev.pages) return prev;
              const updatedPages = [...prev.pages];
              const page = { ...updatedPages[pageIdx] };
              const currentImages = page.images ? [...page.images] : [page.src || ""];
              currentImages[subIdx] = uploadedUrl;
              page.images = currentImages;
              
              // Also update the fallback src if subIdx is 0
              if (subIdx === 0) {
                page.src = uploadedUrl;
              }
              updatedPages[pageIdx] = page;
              return { ...prev, pages: updatedPages };
            });
          } else {
            handlePageFieldChange(pageIdx, field, uploadedUrl);
            // If we update src, and there is an images array, update its first element
            if (field === "src") {
              setCatalog((prev: any) => {
                if (!prev || !prev.pages) return prev;
                const updatedPages = [...prev.pages];
                const page = { ...updatedPages[pageIdx] };
                if (page.images && page.images.length > 0) {
                  const currentImages = [...page.images];
                  currentImages[0] = uploadedUrl;
                  page.images = currentImages;
                }
                updatedPages[pageIdx] = page;
                return { ...prev, pages: updatedPages };
              });
            }
          }
        } else {
          alert("Image upload failed: " + (uploadData.error || "Unknown server error"));
        }
      } catch (err: any) {
        console.error("Sheet Image upload error:", err);
        alert("Upload failed: " + err.message);
      } finally {
        setIsUploadingSheetImage((prev) => ({ ...prev, [uploadKey]: false }));
      }
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    if (!shareableLink) return;
    navigator.clipboard.writeText(shareableLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Active edit page context
  const editPage = catalog.pages?.[selectedEditPage] || null;

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAF7F2] font-sans pt-24 pb-16 overflow-x-hidden relative">
      {/* Decorative Background Blob */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(163,230,53,0.03)_0%,transparent_60%)] pointer-events-none z-0" />
      
      {/* Main Interactive Studio Grid */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* COLUMN 1: LEFT SIDEBAR NAVIGATION */}
          <div className="lg:col-span-3 flex flex-col gap-6 bg-[#121215] border border-white/5 rounded-2xl p-5 shadow-2xl shrink-0">
            {/* User Profile Card */}
            <div className="flex items-center gap-3 border-b border-white/5 pb-5">
              {isLoaded && user ? (
                <>
                  <img
                    src={user.imageUrl}
                    alt={user.fullName || "User Avatar"}
                    className="h-10 w-10 rounded-full border border-lime-400/30 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold text-foreground truncate">
                      {user.fullName || "Creator"}
                    </h3>
                    <p className="text-[10px] text-muted truncate">
                      {user.primaryEmailAddress?.emailAddress || ""}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-10 w-10 rounded-full bg-zinc-800 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-zinc-800 rounded w-2/3 animate-pulse" />
                    <div className="h-2 bg-zinc-800 rounded w-1/2 animate-pulse" />
                  </div>
                </>
              )}
            </div>

            {/* Filter Search Input */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
              <input
                type="text"
                placeholder="Search lookbooks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1A1A22] border border-white/5 rounded-xl py-2.5 pl-9 pr-4 text-xs focus:outline-none focus:border-lime-400 text-foreground transition-all placeholder:text-muted/40 font-sans"
              />
            </div>

            {/* Dashboards Navigation links */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-bold text-muted uppercase tracking-widest pl-2 mb-1">
                Dashboards
              </span>
              <button
                type="button"
                onClick={() => setActiveTab("console")}
                className={cn(
                  "w-full text-left px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer",
                  activeTab === "console"
                    ? "bg-lime-400 text-black shadow-lg shadow-lime-400/10 font-semibold"
                    : "text-muted hover:text-foreground hover:bg-white/5"
                )}
              >
                <Sparkles className={cn("h-4 w-4 shrink-0", activeTab === "console" ? "text-black" : "text-lime-400")} />
                Prompt Console
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("editor")}
                className={cn(
                  "w-full text-left px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer",
                  activeTab === "editor"
                    ? "bg-lime-400 text-black shadow-lg shadow-lime-400/10 font-semibold"
                    : "text-muted hover:text-foreground hover:bg-white/5"
                )}
              >
                <Edit3 className={cn("h-4 w-4 shrink-0", activeTab === "editor" ? "text-black" : "text-lime-400")} />
                Sheet Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("creatives")}
                className={cn(
                  "w-full text-left px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer",
                  activeTab === "creatives"
                    ? "bg-lime-400 text-black shadow-lg shadow-lime-400/10 font-semibold"
                    : "text-muted hover:text-foreground hover:bg-white/5"
                )}
              >
                <BookOpen className={cn("h-4 w-4 shrink-0", activeTab === "creatives" ? "text-black" : "text-lime-400")} />
                My Creatives
              </button>
            </div>

            {/* Settings links */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-bold text-muted uppercase tracking-widest pl-2 mb-1">
                Settings & Resources
              </span>
              <a
                href="#inquiry-stage"
                className="w-full text-left px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 text-muted hover:text-foreground hover:bg-white/5 transition-all"
              >
                <Info className="h-4 w-4 shrink-0 text-lime-400" />
                Bespoke Booking
              </a>
              <a
                href="/"
                className="w-full text-left px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 text-muted hover:text-foreground hover:bg-white/5 transition-all"
              >
                <FileText className="h-4 w-4 shrink-0 text-lime-400" />
                Help Center
              </a>
            </div>

            {/* Brand Footer logo */}
            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-foreground tracking-widest uppercase flex items-center gap-1.5">
                <LayoutDashboard className="h-4 w-4 text-lime-400" />
                Folio Studio
              </span>
              <span className="text-[8px] text-muted font-mono font-medium">
                v1.2.0
              </span>
            </div>
          </div>

          {/* COLUMN 2: ACTIVE WORKSPACE CONSOLE */}
          <div className="lg:col-span-4 flex flex-col gap-6 bg-[#121215]/80 border border-white/5 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Top ambient highlight line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-lime-400/25 to-transparent" />

            {/* Top Breadcrumb Bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2 text-[10px] text-muted font-bold uppercase tracking-wider">
                <span>Workspace</span>
                <span>/</span>
                <span className="text-lime-400">
                  {activeTab === "console" && "Console"}
                  {activeTab === "editor" && "Editor"}
                  {activeTab === "creatives" && "Creatives"}
                </span>
              </div>
              <span className="text-[10px] text-muted font-mono font-medium">Today</span>
            </div>

            {/* Dynamic heading based on active view */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                {activeTab === "console" && "Prompt Console"}
                {activeTab === "editor" && "Sheet Editor"}
                {activeTab === "creatives" && "Your Saved Creatives"}
              </h2>
              <p className="text-[10px] text-muted mt-0.5">
                {activeTab === "console" && "Configure layout generation parameters"}
                {activeTab === "editor" && "Refine publication content and tags in real time"}
                {activeTab === "creatives" && "Browse, load, and share your dynamic lookbooks"}
              </p>
            </div>

            {/* VIEW 1: Prompt Console */}
            {activeTab === "console" && (
              <form onSubmit={handleGenerateCatalog} className="flex flex-col gap-6">
                {/* Textarea Brief Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="brief-input" className="text-[10px] font-bold text-muted uppercase tracking-wider flex justify-between">
                    <span>Describe Your Publication</span>
                    <span className="text-[9px] text-lime-400/70 capitalize font-medium">{brief.length}/1000 chars</span>
                  </label>
                  <textarea
                    id="brief-input"
                    rows={4}
                    required
                    maxLength={1000}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="e.g. A 6-page premium jewelry catalog. Features golden pearl rings, silver neck chains, and luxury amber perfume bottles..."
                    className="w-full rounded-xl border border-white/5 bg-[#1A1A22] px-4 py-3 text-xs leading-relaxed text-foreground font-mono placeholder:text-muted/40 focus:border-lime-400 focus:ring-4 focus:ring-lime-400/10 focus:outline-none transition-all duration-300 resize-none min-h-[120px] shadow-inner"
                  />
                </div>

                {/* Multimodal Image Uploader (Vision) */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="h-3.5 w-3.5 text-lime-400" />
                    Reference Inspiration Images (Vision)
                  </span>
                  
                  {uploadedImages.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2.5 rounded-xl border border-white/5 bg-[#1A1A22]/50 p-3 shadow-inner">
                      {uploadedImages.map((imgSrc, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group">
                          <img src={imgSrc} alt={`Reference Preview ${idx + 1}`} className="object-cover h-full w-full" />
                          <button
                            type="button"
                            onClick={() => removeUploadedImage(idx)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-black/60 hover:bg-lime-400 text-black opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                            aria-label="Remove image"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      
                      {/* Plus button to add more images */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square flex flex-col items-center justify-center rounded-lg border border-dashed border-white/10 hover:border-lime-400/40 bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer group"
                      >
                        <Upload className="h-4 w-4 text-muted group-hover:text-lime-400 transition-colors" />
                        <span className="text-[8px] font-bold text-muted mt-1">Add More</span>
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border border-dashed border-white/10 hover:border-lime-400/40 rounded-xl bg-[#1A1A22]/60 p-5 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-white/[0.02] transition-all duration-300 group shadow-inner"
                    >
                      <Upload className="h-5 w-5 text-muted group-hover:text-lime-400 transition-colors" />
                      <p className="text-[10px] font-bold text-foreground">Click to upload inspiration images</p>
                      <p className="text-[8px] text-muted font-medium">JPEG, PNG, or WEBP (Max 4MB each)</p>
                    </div>
                  )}
                  
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden" 
                  />
                </div>

                {/* YouTube Video URL Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="youtube-url" className="text-[10px] font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Video className="h-3.5 w-3.5 text-lime-400" />
                    Embed YouTube Video (Optional)
                  </label>
                  <input
                    id="youtube-url"
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="e.g. https://www.youtube.com/watch?v=..."
                    className="w-full rounded-xl border border-white/5 bg-[#1A1A22] px-4 py-3 text-xs leading-relaxed text-foreground font-mono placeholder:text-muted/40 focus:border-lime-400 focus:ring-4 focus:ring-lime-400/10 focus:outline-none transition-all duration-300 shadow-inner"
                  />
                </div>

                {/* CTA Outbound Link Inputs */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="action-link" className="text-[10px] font-bold text-muted uppercase tracking-wider flex items-center gap-1">
                      <LinkIcon className="h-3.5 w-3.5 text-lime-400" />
                      CTA Link
                    </label>
                    <input
                      id="action-link"
                      type="url"
                      value={actionLink}
                      onChange={(e) => setActionLink(e.target.value)}
                      placeholder="e.g. https://yoursite.com"
                      className="w-full rounded-xl border border-white/5 bg-[#1A1A22] px-4 py-3 text-xs leading-relaxed text-foreground font-mono placeholder:text-muted/40 focus:border-lime-400 focus:ring-4 focus:ring-lime-400/10 focus:outline-none transition-all duration-300 shadow-inner"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="action-link-text" className="text-[10px] font-bold text-muted uppercase tracking-wider">
                      CTA Label
                    </label>
                    <input
                      id="action-link-text"
                      type="text"
                      value={actionLinkText}
                      onChange={(e) => setActionLinkText(e.target.value)}
                      placeholder="e.g. Shop Now"
                      className="w-full rounded-xl border border-white/5 bg-[#1A1A22] px-4 py-3 text-xs leading-relaxed text-foreground font-mono placeholder:text-muted/40 focus:border-lime-400 focus:ring-4 focus:ring-lime-400/10 focus:outline-none transition-all duration-300 shadow-inner"
                    />
                  </div>
                </div>

                {/* Exclude Text Toggle */}
                <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#1A1A22]/50 p-3.5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-foreground tracking-wide font-sans">
                      Exclude Editorial Text (Minimalist Mode)
                    </span>
                    <span className="text-[9px] text-muted font-medium">
                      Generates visual images only, hiding paragraphs and quotes
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={excludeText} 
                      onChange={(e) => setExcludeText(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-9 h-5 bg-white/10 rounded-full peer peer-focus:ring-2 peer-focus:ring-lime-400/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-muted after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-lime-400 peer-checked:after:bg-black" />
                  </label>
                </div>

                {/* Preset Brand Kits */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider flex items-center gap-1">
                    <Palette className="h-3.5 w-3.5 text-lime-400" />
                    Select Brand Kit Preset
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {PRESET_STYLES.map((preset, idx) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setPalettePreset(preset.id)}
                        className={cn(
                          "flex flex-col items-start gap-2.5 rounded-xl border p-3 text-left transition-all duration-300 hover:bg-white/5 cursor-pointer relative",
                          palettePreset === preset.id
                            ? "border-lime-400/50 bg-lime-400/5 shadow-[0_0_15px_rgba(163,230,53,0.08)]"
                            : "border-white/5 bg-[#1A1A22]/60",
                          idx === 4 ? "col-span-2" : ""
                        )}
                      >
                        {/* Active Selection Glow */}
                        {palettePreset === preset.id && (
                          <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-bl-lg bg-lime-400" />
                        )}
                        
                        {/* Color Indicators Swatch */}
                        <div className="flex gap-1 bg-[#09090B] p-1.5 rounded-lg border border-white/5 w-fit">
                          {preset.colors.map((c, i) => (
                            <div
                              key={i}
                              className="h-3 w-3 rounded-full border border-white/10"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>

                        {/* Preset Name */}
                        <div>
                          <h4 className="text-[11px] font-bold text-foreground tracking-wide font-sans">
                            {preset.name}
                          </h4>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Trigger Buttons */}
                <div className="flex flex-col gap-2.5 mt-2">
                  <button
                    type="submit"
                    disabled={isPending || !brief.trim()}
                    className="relative flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-lime-400 text-black font-bold tracking-widest text-xs py-4 uppercase transition-all duration-300 hover:bg-lime-300 active:scale-98 disabled:opacity-50 cursor-pointer shadow-lg shadow-lime-400/15 w-full font-sans"
                  >
                    {isPending ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                        Designing Layout...
                      </>
                    ) : (
                      <>
                        Generate with AI
                        <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCreateManualCatalog}
                    className="flex items-center justify-center gap-2.5 rounded-xl border border-white/10 hover:border-lime-400/40 bg-[#1A1A22]/40 hover:bg-[#1A1A22] text-foreground font-bold tracking-widest text-xs py-4 uppercase transition-all duration-300 active:scale-98 cursor-pointer w-full font-sans"
                  >
                    <Edit3 className="h-4 w-4 text-lime-400" />
                    Design Manually (Bypass AI)
                  </button>
                </div>
              </form>
            )}

            {/* VIEW 2: Lookbook Sheet Editor */}
            {activeTab === "editor" && (
              <div className="flex flex-col gap-5">
                {/* Catalogue-wide Settings */}
                <div className="rounded-xl border border-white/5 bg-[#1A1A22]/30 p-3.5 flex flex-col gap-3">
                  <span className="text-[10px] font-bold text-lime-400 uppercase tracking-wider">Catalogue Settings</span>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold text-muted uppercase">Catalogue Title</label>
                    <input
                      type="text"
                      value={catalog.title || ""}
                      onChange={(e) => setCatalog((prev: any) => ({ ...prev, title: e.target.value }))}
                      className="w-full rounded-lg border border-white/5 bg-[#09090B] px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-lime-400 font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold text-muted uppercase">Brand Name</label>
                      <input
                        type="text"
                        value={catalog.brandName || ""}
                        onChange={(e) => setCatalog((prev: any) => ({ ...prev, brandName: e.target.value }))}
                        className="w-full rounded-lg border border-white/5 bg-[#09090B] px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-lime-400 font-sans"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold text-muted uppercase">Sub-Heading</label>
                      <input
                        type="text"
                        value={catalog.subtitle || ""}
                        onChange={(e) => setCatalog((prev: any) => ({ ...prev, subtitle: e.target.value }))}
                        className="w-full rounded-lg border border-white/5 bg-[#09090B] px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-lime-400 font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Select Page to Edit</h4>
                    {editPage && (
                      <button
                        type="button"
                        onClick={() => handleDeletePage(selectedEditPage)}
                        className="px-2.5 py-1 text-[9px] font-bold text-red-400 hover:text-white hover:bg-red-950/30 rounded-lg border border-red-500/20 transition-all cursor-pointer"
                      >
                        Delete Page
                      </button>
                    )}
                  </div>
                  <div className="grid gap-1 bg-[#1A1A22] p-1.5 rounded-xl border border-white/5" style={{ gridTemplateColumns: `repeat(${catalog.pages?.length || 4}, minmax(0, 1fr))` }}>
                    {catalog.pages?.map((_: any, i: number) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedEditPage(i)}
                        className={cn(
                          "py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                          selectedEditPage === i ? "bg-lime-400 text-black shadow-md" : "hover:bg-white/5 text-muted"
                        )}
                      >
                        P{i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {editPage ? (
                  <div className="flex flex-col gap-4 max-h-[450px] overflow-y-auto pr-1">
                    {/* Page Info */}
                    <div className="rounded-xl border border-white/5 bg-[#1A1A22]/50 p-3 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Sheet Type</span>
                      <select
                        value={editPage.type}
                        onChange={(e) => handlePageFieldChange(selectedEditPage, "type", e.target.value)}
                        className="rounded-lg border border-white/5 bg-[#09090B] text-[11px] font-bold text-foreground p-1 px-2 focus:outline-none focus:border-lime-400"
                      >
                        <option value="image">Image Spread</option>
                        <option value="editorial">Editorial Page</option>
                      </select>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Sheet Title</label>
                      <input
                        type="text"
                        value={editPage.title || ""}
                        onChange={(e) => handlePageFieldChange(selectedEditPage, "title", e.target.value)}
                        className="w-full rounded-xl border border-white/5 bg-[#1A1A22] px-3 py-2 text-xs text-foreground font-sans focus:outline-none focus:border-lime-400"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Sheet Subtitle</label>
                      <input
                        type="text"
                        value={editPage.subtitle || ""}
                        onChange={(e) => handlePageFieldChange(selectedEditPage, "subtitle", e.target.value)}
                        className="w-full rounded-xl border border-white/5 bg-[#1A1A22] px-3 py-2 text-xs text-foreground font-sans focus:outline-none focus:border-lime-400"
                      />
                    </div>

                    {/* Editorial Specific Fields */}
                    {editPage.type === "editorial" && (
                      <>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Editorial Copy</label>
                          <textarea
                            rows={4}
                            value={editPage.content || ""}
                            onChange={(e) => handlePageFieldChange(selectedEditPage, "content", e.target.value)}
                            className="w-full rounded-xl border border-white/5 bg-[#1A1A22] px-3 py-2 text-xs text-foreground font-sans focus:outline-none focus:border-lime-400 resize-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Quote</label>
                          <input
                            type="text"
                            value={editPage.quote || ""}
                            onChange={(e) => handlePageFieldChange(selectedEditPage, "quote", e.target.value)}
                            className="w-full rounded-xl border border-white/5 bg-[#1A1A22] px-3 py-2 text-xs text-foreground font-sans focus:outline-none focus:border-lime-400"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Quote Author</label>
                          <input
                            type="text"
                            value={editPage.quoteAuthor || ""}
                            onChange={(e) => handlePageFieldChange(selectedEditPage, "quoteAuthor", e.target.value)}
                            className="w-full rounded-xl border border-white/5 bg-[#1A1A22] px-3 py-2 text-xs text-foreground font-sans focus:outline-none focus:border-lime-400"
                          />
                        </div>
                      </>
                    )}

                    {/* Image Specific Fields */}
                    {editPage.type === "image" && (
                      <>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Image Source URL 1</label>
                            <label className="text-[9px] font-bold text-lime-400 hover:underline cursor-pointer flex items-center gap-1 select-none">
                              <Upload className="h-3 w-3" />
                              {isUploadingSheetImage[`${selectedEditPage}-src-0`] ? "Uploading..." : "Upload File"}
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={isUploadingSheetImage[`${selectedEditPage}-src-0`]}
                                onChange={(e) => handleSheetImageUpload(selectedEditPage, "src", e.target.files)}
                              />
                            </label>
                          </div>
                          <input
                            type="text"
                            value={editPage.src || ""}
                            onChange={(e) => {
                              handlePageFieldChange(selectedEditPage, "src", e.target.value);
                              const currentImages = editPage.images ? [...editPage.images] : [];
                              currentImages[0] = e.target.value;
                              handlePageFieldChange(selectedEditPage, "images", currentImages);
                            }}
                            className="w-full rounded-xl border border-white/5 bg-[#1A1A22] px-3 py-2 text-xs text-foreground font-sans focus:outline-none focus:border-lime-400"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Image Source URL 2 (Optional Split Layout)</label>
                            <label className="text-[9px] font-bold text-lime-400 hover:underline cursor-pointer flex items-center gap-1 select-none">
                              <Upload className="h-3 w-3" />
                              {isUploadingSheetImage[`${selectedEditPage}-images-1`] ? "Uploading..." : "Upload File"}
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={isUploadingSheetImage[`${selectedEditPage}-images-1`]}
                                onChange={(e) => handleSheetImageUpload(selectedEditPage, "images", e.target.files, 1)}
                              />
                            </label>
                          </div>
                          <input
                            type="text"
                            value={editPage.images?.[1] || ""}
                            onChange={(e) => {
                              const currentImages = editPage.images ? [...editPage.images] : [editPage.src || ""];
                              if (e.target.value.trim().length === 0) {
                                const newImages = [currentImages[0]];
                                handlePageFieldChange(selectedEditPage, "images", newImages);
                              } else {
                                currentImages[1] = e.target.value;
                                handlePageFieldChange(selectedEditPage, "images", currentImages);
                              }
                            }}
                            placeholder="Leave blank for single image layout"
                            className="w-full rounded-xl border border-white/5 bg-[#1A1A22] px-3 py-2 text-xs text-foreground font-sans focus:outline-none focus:border-lime-400"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">YouTube embed URL</label>
                          <input
                            type="text"
                            value={editPage.videoUrl || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              const embedUrl = getYoutubeEmbedUrl(val) || val;
                              handlePageFieldChange(selectedEditPage, "videoUrl", embedUrl);
                            }}
                            placeholder="e.g. https://www.youtube.com/embed/..."
                            className="w-full rounded-xl border border-white/5 bg-[#1A1A22] px-3 py-2 text-xs text-foreground font-sans focus:outline-none focus:border-lime-400"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold text-muted uppercase tracking-wider">CTA Link</label>
                            <input
                              type="text"
                              value={editPage.link || ""}
                              onChange={(e) => handlePageFieldChange(selectedEditPage, "link", e.target.value)}
                              className="w-full rounded-xl border border-white/5 bg-[#1A1A22] px-3 py-2 text-xs text-foreground font-sans focus:outline-none focus:border-lime-400"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold text-muted uppercase tracking-wider">CTA Text</label>
                            <input
                              type="text"
                              value={editPage.linkText || ""}
                              onChange={(e) => handlePageFieldChange(selectedEditPage, "linkText", e.target.value)}
                              className="w-full rounded-xl border border-white/5 bg-[#1A1A22] px-3 py-2 text-xs text-foreground font-sans focus:outline-none focus:border-lime-400"
                            />
                          </div>
                        </div>

                        {/* Hotspots Section */}
                        <div className="flex flex-col gap-3.5 border-t border-white/5 pt-3 mt-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Interactive Hotspots</span>
                            <button
                              type="button"
                              onClick={() => handleAddHotspot(selectedEditPage)}
                              className="text-[9px] font-bold text-lime-400 hover:underline cursor-pointer flex items-center gap-1"
                            >
                              + Add Hotspot
                            </button>
                          </div>

                          {editPage.hotspots && editPage.hotspots.length > 0 ? (
                            <div className="flex flex-col gap-3.5">
                              {editPage.hotspots.map((hotspot: any, hsIdx: number) => (
                                <div key={hsIdx} className="rounded-xl border border-white/5 bg-[#1A1A22]/40 p-3.5 flex flex-col gap-3 relative group">
                                  <div className="flex items-center justify-between border-b border-white/5 pb-1">
                                    <span className="text-[9px] font-bold text-lime-400 uppercase tracking-wider">Tag #{hsIdx + 1}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteHotspot(selectedEditPage, hsIdx)}
                                      className="text-[8px] font-bold text-red-400 hover:text-red-300 cursor-pointer"
                                    >
                                      Delete Tag
                                    </button>
                                  </div>

                                  <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] font-bold text-muted uppercase">Product Name</label>
                                    <input
                                      type="text"
                                      value={hotspot.title || ""}
                                      onChange={(e) => handleHotspotChange(selectedEditPage, hsIdx, "title", e.target.value)}
                                      className="w-full rounded-lg border border-white/5 bg-[#09090B] px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col gap-1.5">
                                      <label className="text-[9px] font-bold text-muted uppercase">Price</label>
                                      <input
                                        type="text"
                                        value={hotspot.price || ""}
                                        onChange={(e) => handleHotspotChange(selectedEditPage, hsIdx, "price", e.target.value)}
                                        className="w-full rounded-lg border border-white/5 bg-[#09090B] px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
                                      />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                      <label className="text-[9px] font-bold text-muted uppercase">Link Label</label>
                                      <input
                                        type="text"
                                        value={hotspot.linkText || ""}
                                        onChange={(e) => handleHotspotChange(selectedEditPage, hsIdx, "linkText", e.target.value)}
                                        className="w-full rounded-lg border border-white/5 bg-[#09090B] px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
                                      />
                                    </div>
                                  </div>

                                  <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] font-bold text-muted uppercase">Tag Description</label>
                                    <input
                                      type="text"
                                      value={hotspot.description || ""}
                                      onChange={(e) => handleHotspotChange(selectedEditPage, hsIdx, "description", e.target.value)}
                                      className="w-full rounded-lg border border-white/5 bg-[#09090B] px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col gap-1.5">
                                      <label className="text-[9px] font-bold text-muted uppercase">Horizontal Position (X %)</label>
                                      <input
                                        type="text"
                                        value={hotspot.x || ""}
                                        onChange={(e) => handleHotspotChange(selectedEditPage, hsIdx, "x", e.target.value)}
                                        className="w-full rounded-lg border border-white/5 bg-[#09090B] px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
                                      />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                      <label className="text-[9px] font-bold text-muted uppercase">Vertical Position (Y %)</label>
                                      <input
                                        type="text"
                                        value={hotspot.y || ""}
                                        onChange={(e) => handleHotspotChange(selectedEditPage, hsIdx, "y", e.target.value)}
                                        className="w-full rounded-lg border border-white/5 bg-[#09090B] px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
                                      />
                                    </div>
                                  </div>

                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[10px] text-muted italic text-center py-3 bg-white/[0.02] rounded-xl border border-white/5">No hotspots on this page yet.</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-muted text-center py-6">No sheets generated yet.</p>
                )}
              </div>
            )}

            {/* VIEW 3: Saved Creatives */}
            {activeTab === "creatives" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Your Saved Creatives</h4>
                  <button
                    type="button"
                    onClick={fetchUserCatalogs}
                    disabled={isLoadingCatalogs}
                    className="text-[10px] font-bold text-lime-400 hover:underline cursor-pointer"
                  >
                    {isLoadingCatalogs ? "Refreshing..." : "Refresh"}
                  </button>
                </div>

                {isLoadingCatalogs ? (
                  <div className="flex flex-col items-center justify-center py-10 gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-lime-400 border-t-transparent" />
                    <p className="text-[11px] text-muted font-sans font-medium">Fetching your lookbooks...</p>
                  </div>
                ) : userCatalogs.length > 0 ? (
                  <div className="flex flex-col gap-3 max-h-[450px] overflow-y-auto pr-1">
                    {userCatalogs.filter((item) => {
                      if (!searchQuery) return true;
                      const q = searchQuery.toLowerCase();
                      return (
                        (item.title && item.title.toLowerCase().includes(q)) ||
                        (item.brandName && item.brandName.toLowerCase().includes(q))
                      );
                    }).map((item) => (
                      <div
                        key={item._id}
                        className="rounded-xl border border-white/5 bg-[#1A1A22] p-4 flex flex-col gap-3 hover:border-lime-400/35 transition-all"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h5 className="text-xs font-bold text-foreground truncate">{item.title}</h5>
                            <p className="text-[9px] text-muted font-medium mt-0.5 uppercase tracking-wider truncate">{item.brandName} • {item.palettePreset}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <span className="text-[9px] text-muted bg-white/5 px-2 py-0.5 rounded font-sans">
                              {new Date(item._createdAt).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span className="text-[8px] font-bold text-lime-400 bg-lime-400/5 border border-lime-400/10 px-1.5 py-0.5 rounded font-sans flex items-center gap-1 select-none">
                              <span className="h-1 w-1 rounded-full bg-lime-400 animate-pulse" />
                              {item.views || 0} clicks
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-1 border-t border-white/5">
                          <button
                            type="button"
                            onClick={() => {
                              setCatalog(item);
                              setActiveCatalogId(item._id);
                              setPalettePreset(item.palettePreset);
                              setBrief(`Saved lookbook: ${item.title}`);
                              const link = `${window.location.origin}/lookbook/${item._id}`;
                              setShareableLink(link);
                              alert(`Loaded lookbook "${item.title}" successfully into the 3D Viewer.`);
                            }}
                            className="text-[10px] font-bold text-lime-400 hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <BookOpen className="h-3 w-3 text-lime-400" />
                            Load in Viewer
                          </button>
                          
                          <div className="flex items-center gap-3">
                            <a
                              href={`/lookbook/${item._id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] font-bold text-muted hover:text-foreground hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Public Link
                            </a>

                            <button
                              type="button"
                              onClick={() => handleDeleteCatalog(item._id)}
                              className="text-[10px] font-bold text-red-400 hover:text-red-300 hover:underline cursor-pointer flex items-center gap-1"
                            >
                              <X className="h-3 w-3 text-red-400" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {userCatalogs.filter((item) => {
                      if (!searchQuery) return true;
                      const q = searchQuery.toLowerCase();
                      return (
                        (item.title && item.title.toLowerCase().includes(q)) ||
                        (item.brandName && item.brandName.toLowerCase().includes(q))
                      );
                    }).length === 0 && (
                      <p className="text-[11px] text-muted text-center py-6">No matching lookbooks found.</p>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 border border-dashed border-white/5 rounded-xl bg-[#1A1A22]/30">
                    <p className="text-xs text-muted text-center font-sans font-medium">No saved lookbooks found.</p>
                    <p className="text-[10px] text-muted/60 text-center font-sans mt-1">Generate a publication and click "Save to Cloud" to see it here.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* COLUMN 3: STAGE & LIVE VIEW PRESENTATION */}
          <div className="lg:col-span-5 flex flex-col justify-start w-full min-w-0 gap-6">
            
            {/* Cloud Saving Bar (Shows if catalog exists) */}
            {catalog && !isPending && (
              <div className="glass-card bg-[#121215] rounded-2xl p-4 border border-white/5 flex items-center justify-between gap-4 shadow-xl z-20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-lime-400/10 text-lime-400">
                    <Cloud className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Save Publication to Sanity</h4>
                    <p className="text-[10px] text-muted font-medium mt-0.5">Generates dynamic links optimized for Pinterest conversion.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleSaveCatalog}
                    disabled={isSaving}
                    className="px-5 py-2.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-bold tracking-wider text-[10px] uppercase shadow-lg shadow-lime-400/15 disabled:opacity-50 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    {isSaving ? (
                      <>
                        <div className="h-3 w-3 animate-spin rounded-full border border-black border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        Save to Cloud
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Public Link Share State Screen */}
            {shareableLink && !isPending && (
              <div className="glass-card rounded-2xl p-5 border border-lime-400/20 bg-lime-400/5 flex flex-col gap-3 shadow-2xl z-20 animate-fade-in">
                <div className="flex items-center gap-2.5 text-lime-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="h-4 w-4 text-lime-400" />
                  Hosted Lookbook Ready!
                </div>
                <div className="flex items-center gap-2 bg-[#09090B] p-2.5 rounded-xl border border-white/5 w-full">
                  <input
                    type="text"
                    readOnly
                    value={shareableLink}
                    className="flex-1 bg-transparent border-none text-[11px] text-muted select-all focus:outline-none font-mono px-2"
                  />
                  <button
                    onClick={copyToClipboard}
                    className={cn(
                      "px-3.5 py-1.5 rounded-lg font-bold tracking-wider text-[9px] uppercase transition-all flex items-center gap-1 cursor-pointer",
                      copiedLink ? "bg-green-600 text-white" : "bg-white/10 hover:bg-white/20 text-foreground"
                    )}
                  >
                    {copiedLink ? (
                      <>
                        <Check className="h-3 w-3" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy
                      </>
                    )}
                  </button>
                  <a
                    href={shareableLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-foreground transition-all"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}

            {isPending ? (
              /* High-End Editorial Loading Stage Screen */
              <div className="w-full aspect-[16/10] bg-[#121215] rounded-2xl border border-white/5 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.03)_0%,transparent_70%)] pointer-events-none" />
                
                {/* Scanning Laser Line */}
                <div className="absolute left-0 top-0 w-full h-[3px] bg-gradient-to-r from-transparent via-lime-400/35 to-transparent animate-[scanline_3s_infinite_linear]" />

                <div className="relative mb-6">
                  {/* Spinning layout circles */}
                  <div className="h-16 w-16 rounded-full border-2 border-lime-400/25 border-t-lime-400 animate-spin" />
                  <Sparkles className="h-6 w-6 text-lime-400 absolute inset-0 m-auto animate-pulse" />
                </div>
                
                {/* Title */}
                <h4 className="font-serif text-xl font-light text-foreground mb-2">
                  Constructing Lookbook...
                </h4>
                
                {/* Dynamic loader step */}
                <p className="text-xs text-lime-400 tracking-widest uppercase font-bold animate-pulse font-mono transition-opacity duration-300">
                  {LOADING_STEPS[loadingStep]}
                </p>
                
                <p className="text-[10px] text-muted mt-6 max-w-sm leading-relaxed font-sans font-medium">
                  We constrain the layout via native schema trees and generate high-contrast product overlays. Fits standard 90s latency target.
                </p>
              </div>
            ) : (
              /* The 3D CSS Flipbook Hydrated Stage */
              <div className="w-full relative flex flex-col items-center justify-center">
                <Flipbook pages={catalog.pages} brandName={catalog.brandName || ""} />
              </div>
            )}

            {/* Guide Info Overlay */}
            <div className="flex gap-3 rounded-xl border border-white/5 bg-[#121215]/55 p-4 backdrop-blur-xl">
              <Info className="h-5 w-5 text-lime-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-muted font-sans font-medium leading-relaxed">
                <strong className="text-foreground">Vision Layout Sandbox:</strong> Upload multiple images, add video sheets, and edit details in real-time. Hit the "Save to Cloud" button to host your catalog publicly.
              </p>
            </div>
          </div>
          
        </div>
      </section>

      {/* Corporate Booking Form / Demo lead gen drawer */}
      <section id="inquiry-stage" className="mx-auto max-w-7xl mt-16 px-4 md:px-6 relative z-10 border-t border-white/5 bg-[#121215]/30 rounded-2xl overflow-hidden">
        <CatalogueBooking businessName={catalog.brandName ? catalog.brandName.toLowerCase().replace(/\s+/g, "-") : "pottery-studio"} />
      </section>
    </div>
  );
}
