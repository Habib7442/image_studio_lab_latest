"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  RotateCcw,
  BookOpen,
  Download,
  ArrowRight,
} from "lucide-react";
import { cn, getYoutubeEmbedUrl } from "@/lib/utils";
import { CatalogueHotspot } from "./catalogue-hotspot";

// Interactive Hotspot Interface
interface Hotspot {
  x: string;
  y: string;
  title: string;
  description: string;
  price?: string;
  link?: string;
  linkText?: string;
}

// Catalogue Page Interface
interface Page {
  type: "image" | "editorial";
  src?: string;
  title: string;
  subtitle: string;
  content?: string;
  quote?: string;
  quoteAuthor?: string;
  hotspots?: Hotspot[];
  videoUrl?: string;
  link?: string;
  linkText?: string;
  images?: string[];
}

interface FlipbookProps {
  pages: Page[];
  brandName: string;
}

// ----------------------------------------------------
// Web Audio Paper Friction Synthesizer (Zero-Latency)
// ----------------------------------------------------
class PaperFlipSynth {
  private ctx: AudioContext | null = null;

  public play() {
    try {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const duration = 0.5; // 500ms flip sound duration

      // 1. Synthesize White Noise Buffer
      const sampleRate = this.ctx.sampleRate;
      const bufferSize = sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
      const channelData = buffer.getChannelData(0);

      // Generate soft static noise
      for (let i = 0; i < bufferSize; i++) {
        channelData[i] = Math.random() * 2 - 1;
      }

      // 2. Setup Noise Node
      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = buffer;

      // 3. Shape the frequency via Bandpass Filter (mimics paper rustling)
      const filterNode = this.ctx.createBiquadFilter();
      filterNode.type = "bandpass";
      filterNode.Q.setValueAtTime(4.0, now);
      filterNode.frequency.setValueAtTime(1600, now);
      // Sweep the frequency down as page lands
      filterNode.frequency.exponentialRampToValueAtTime(700, now + duration - 0.05);

      // 4. Shape Volume Envelope (quick attack, micro-rustling, slow decay)
      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.045, now + 0.07); // soft peak volume
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Connect nodes
      noiseNode.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      // Execute synthesis
      noiseNode.start(now);
      noiseNode.stop(now + duration);
    } catch (error) {
      console.warn("Audio synthesis page-flip failed:", error);
    }
  }
}

export const Flipbook: React.FC<FlipbookProps> = ({ pages, brandName }) => {
  const [activeSpread, setActiveSpread] = useState(0); // 0 to M
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ambientLight, setAmbientLight] = useState<"studio" | "marble">("studio");
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Custom synth reference
  const synthRef = useRef<PaperFlipSynth | null>(null);

  // Touch swipe refs for mobile gestures
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX; // initialize to prevent ghost jumps
  };

  const handleDownloadPageImages = (e: React.MouseEvent, p: Page) => {
    e.stopPropagation();
    e.preventDefault();

    const imagesToDownload = p.images && p.images.length > 0
      ? p.images
      : p.src
        ? [p.src]
        : [];

    imagesToDownload.forEach((src, idx) => {
      const link = document.createElement("a");
      link.href = src;
      const extension = src.split("?")[0].split(".").pop() || "jpg";
      link.download = `page-${p.title.toLowerCase().replace(/\s+/g, "-")}-image-${idx + 1}.${extension}`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const threshold = 40; // min swipe threshold in px
    
    if (swipeDistance > threshold) {
      handleNext();
    } else if (swipeDistance < -threshold) {
      handlePrev();
    }
  };

  const totalPages = pages.length;
  const totalLeafs = Math.ceil(totalPages / 2); // 3 leaves for 6 pages

  // Detect mobile viewport on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize audio synthesizer
  useEffect(() => {
    synthRef.current = new PaperFlipSynth();
  }, []);

  // Autoplay handler
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        if (isMobile) {
          // Mobile auto play: loops through single pages
          setActiveSpread((prev) => (prev + 1) % totalPages);
        } else {
          // Desktop auto play: loops spreads
          setActiveSpread((prev) => (prev + 1) % (totalLeafs + 1));
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isMobile, totalPages, totalLeafs]);

  // Page Flip Audio Trigger
  const triggerFlipAudio = () => {
    if (soundEnabled && synthRef.current) {
      synthRef.current.play();
    }
  };

  const handleNext = () => {
    if (isMobile) {
      if (activeSpread < totalPages - 1) {
        setActiveSpread((prev) => prev + 1);
        triggerFlipAudio();
      }
    } else {
      if (activeSpread < totalLeafs) {
        setActiveSpread((prev) => prev + 1);
        triggerFlipAudio();
      }
    }
  };

  const handlePrev = () => {
    if (activeSpread > 0) {
      setActiveSpread((prev) => prev - 1);
      triggerFlipAudio();
    }
  };

  const handleReset = () => {
    setActiveSpread(0);
    triggerFlipAudio();
  };

  // Render internal page types: image (with hotspots) vs. editorial text spreads
  const renderPageContent = (page: Page, isLeft: boolean) => {
    const roundedClass = isMobile
      ? "rounded-xl"
      : isLeft
        ? "rounded-l-xl"
        : "rounded-r-xl";

    if (!page) {
      return null;
    }

    if (page.type === "image") {
      const showSplit = page.images && page.images.length > 1;

      return (
        <div className={cn("relative w-full h-full group/page select-none overflow-hidden", roundedClass)}>
          {page.videoUrl ? (
            <iframe
              src={getYoutubeEmbedUrl(page.videoUrl)}
              title={page.title}
              className="w-full h-full border-0 absolute inset-0 z-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : showSplit ? (
            <div className="w-full h-full grid grid-cols-2 gap-1 bg-[#100D0B]/20">
              <div className="relative h-full w-full">
                <Image
                  src={page.images![0]}
                  alt={`${page.title} - Side A`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-102"
                />
              </div>
              <div className="relative h-full w-full border-l border-white/5">
                <Image
                  src={page.images![1]}
                  alt={`${page.title} - Side B`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-102"
                />
              </div>
            </div>
          ) : (
            page.src && (
              <Image
                src={page.src}
                alt={page.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className={cn("object-cover transition-transform duration-700 hover:scale-102", roundedClass)}
              />
            )
          )}
          {/* Subtle gradient highlights to mimic paper curve and light */}
          {!page.videoUrl && (
            <div
              className={cn(
                "absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 bg-gradient-to-r",
                isLeft
                  ? "from-black/10 via-transparent to-black/30"
                  : "from-black/30 via-transparent to-black/10",
                roundedClass
              )}
            />
          )}

          {/* Render pulsing gold hotspots */}
          {!page.videoUrl && page.hotspots?.map((hotspot, idx) => (
            <CatalogueHotspot key={idx} {...hotspot} />
          ))}

          {/* Minimal Elegant Overlay Header */}
          <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start pointer-events-none opacity-0 group-hover/page:opacity-100 transition-opacity duration-300">
            <span className="bg-black/35 backdrop-blur-md text-[9px] font-bold text-white tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/5">
              {page.subtitle}
            </span>
          </div>

          {/* Action Outbound CTA Link Overlay */}
          {page.link && (
            <a
              href={page.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 left-6 z-20 flex items-center gap-1.5 rounded-full bg-gold hover:bg-gold/80 text-foreground font-bold tracking-widest text-[9px] uppercase px-4 py-2.5 border border-gold/20 pointer-events-auto shadow-lg hover:scale-102 active:scale-98 transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {page.linkText || "Visit Website"}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          )}

          {/* Download button overlay */}
          {!page.videoUrl && (page.src || (page.images && page.images.length > 0)) && (
            <button
              type="button"
              onClick={(e) => handleDownloadPageImages(e, page)}
              className="absolute bottom-6 right-6 z-20 flex items-center gap-1.5 rounded-full bg-black/60 hover:bg-accent backdrop-blur-md text-[10px] font-bold text-white tracking-widest uppercase px-3.5 py-2 border border-white/10 opacity-0 group-hover/page:opacity-100 transition-all duration-300 pointer-events-auto shadow-md cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </button>
          )}
        </div>
      );
    }

    // Editorial typography spreads
    return (
      <div className={cn("relative w-full h-full flex flex-col justify-between px-4 py-4 md:px-10 md:py-8 lg:px-12 lg:py-10 bg-[#FAF7F2] text-[#15110D] overflow-hidden select-none", roundedClass)}>
        {/* Paper texture background */}
        <div className="absolute inset-0 bg-[radial-gradient(#15110d_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-[0.03] pointer-events-none" />
        
        {/* Subtle shadow binding fold */}
        {!isMobile && (
          <div
            className={cn(
              "absolute inset-y-0 w-16 pointer-events-none z-10 bg-gradient-to-r",
              isLeft
                ? "right-0 from-transparent to-[#15110d]/10"
                : "left-0 from-[#15110d]/10 to-transparent"
            )}
          />
        )}

        <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-[#6B5F52] border-b border-[#15110d]/10 pb-2.5">
          <span>{brandName && brandName.toUpperCase() !== "FOLIO" ? brandName.toUpperCase() : ""}</span>
          <span>EST. 2026</span>
        </div>

        <div className="flex-1 my-auto flex flex-col gap-2 md:gap-4 overflow-y-auto hide-scrollbar py-2 w-full min-w-0">
          <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-gold uppercase w-full break-words whitespace-normal">
            {page.subtitle}
          </span>
          <h3 className="font-serif text-xl md:text-3xl lg:text-4xl font-light text-[#15110D] leading-tight w-full break-words whitespace-normal">
            {page.title}
          </h3>
          {page.content && (
            <p className="text-[10px] md:text-xs leading-relaxed text-[#6B5F52] font-medium font-sans w-full break-words whitespace-normal">
              {page.content}
            </p>
          )}

          {page.quote && (
            <div className="border-l-2 border-gold pl-3 my-1 w-full min-w-0">
              <p className="font-serif italic text-[10px] md:text-sm text-[#15110D] leading-relaxed w-full break-words whitespace-normal">
                &ldquo;{page.quote}&rdquo;
              </p>
              {page.quoteAuthor && (
                <cite className="block text-[9px] md:text-[10px] font-bold tracking-wider text-[#6B5F52] mt-1 uppercase not-italic w-full break-words whitespace-normal">
                  — {page.quoteAuthor}
                </cite>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center text-[9px] font-bold text-[#6B5F52] border-t border-[#15110d]/10 pt-2.5">
          <span>{brandName && brandName.toUpperCase() !== "FOLIO" ? `${brandName.toUpperCase()} COLLECTION` : "COLLECTION"}</span>
          <span>PAGE 02</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* Dynamic Showroom Environment Controls Panel */}
      <div className="flex flex-wrap items-center justify-center gap-3 bg-card/65 backdrop-blur-xl border border-white/5 px-6 py-3 rounded-full shadow-2xl z-30">
        {/* Navigation Indicator */}
        <span className="text-[11px] font-bold text-muted px-2.5 border-r border-border/80 flex items-center gap-1.5 font-sans">
          <BookOpen className="h-3.5 w-3.5 text-gold" />
          {isMobile ? (
            <>PAGE {activeSpread + 1} / {totalPages}</>
          ) : (
            <>SPREAD {activeSpread} / {totalLeafs}</>
          )}
        </span>

        {/* Prev Page */}
        <button
          onClick={handlePrev}
          disabled={activeSpread === 0}
          className="p-1.5 rounded-full hover:bg-white/10 active:scale-90 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Next Page */}
        <button
          onClick={handleNext}
          disabled={isMobile ? activeSpread === totalPages - 1 : activeSpread === totalLeafs}
          className="p-1.5 rounded-full hover:bg-white/10 active:scale-90 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          aria-label="Next Page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Reset / Restart */}
        <button
          onClick={handleReset}
          disabled={activeSpread === 0}
          className="p-1.5 rounded-full hover:bg-white/10 active:scale-90 disabled:opacity-30 transition-all cursor-pointer border-r border-border/80 pr-3.5"
          aria-label="Restart Lookbook"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        {/* Autoplay Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={cn(
            "p-1.5 rounded-full transition-all cursor-pointer hover:bg-white/10",
            isPlaying && "text-gold bg-gold/10"
          )}
          aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>

        {/* Sound FX Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={cn(
            "p-1.5 rounded-full transition-all cursor-pointer hover:bg-white/10",
            soundEnabled && "text-gold bg-gold/10"
          )}
          aria-label={soundEnabled ? "Disable sound effects" : "Enable sound effects"}
        >
          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </button>

        {/* Ambient Lights Toggle */}
        <button
          onClick={() => setAmbientLight(ambientLight === "studio" ? "marble" : "studio")}
          className={cn(
            "p-1.5 rounded-full transition-all cursor-pointer hover:bg-white/10",
            ambientLight === "marble" && "text-gold bg-gold/10"
          )}
          aria-label="Toggle ambient lighting"
        >
          {ambientLight === "studio" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>

        {/* Zoom Toggle */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className={cn(
            "p-1.5 rounded-full transition-all cursor-pointer hover:bg-white/10",
            isZoomed && "text-gold bg-gold/10"
          )}
          aria-label="Toggle Zoom"
        >
          {isZoomed ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      </div>

      {/* Showroom Presentation Stage */}
      <div
        className={cn(
          "relative w-full flex items-center justify-center p-4 md:p-8 rounded-3xl border transition-all duration-700 overflow-hidden shadow-3xl",
          ambientLight === "studio"
            ? "bg-[#100D0B] border-white/5"
            : "bg-[#F5F2EB] border-[#15110d]/5",
          isZoomed ? "max-w-6xl scale-102" : "max-w-4xl"
        )}
      >
        {/* Elegant Floor Shadows and ambient highlights */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/25 pointer-events-none" />

        {/* -------------------------------------------------- */}
        {/* DESKTOP VIEW: High-Fidelity 3D Book Spreadsheet   */}
        {/* -------------------------------------------------- */}
        {!isMobile && (
          <div
            className="w-full aspect-[16/10] relative flex items-center perspective-1000 select-none py-4"
            style={{ 
              transformStyle: "preserve-3d",
              transform: activeSpread === 0 
                ? "translateX(-25%)" 
                : activeSpread === totalLeafs 
                  ? "translateX(25%)" 
                  : "translateX(0%)",
              transition: "transform 0.85s cubic-bezier(0.25, 1, 0.5, 1)"
            }}
          >
            {/* Rigid Luxury Book Undercover Base Shadow */}
            <div 
              className="absolute bg-black/45 rounded-2xl blur-xl pointer-events-none transform translate-z-[-20px] transition-all duration-[850ms] ease-in-out" 
              style={{
                top: "2%",
                height: "96%",
                left: activeSpread === 0 ? "50%" : "0%",
                width: activeSpread === 0 || activeSpread === totalLeafs ? "50%" : "100%",
              }}
            />

            {/* Faux Left Shell Cover */}
            <div
              className={cn(
                "absolute top-0 left-0 w-1/2 h-full rounded-l-xl shadow-[-10px_15px_30px_rgba(0,0,0,0.4)] border-y border-l transition-all duration-500 origin-right transform translate-z-[-10px]",
                ambientLight === "studio" ? "bg-[#181310] border-white/5" : "bg-[#FAF7F2] border-black/10",
                activeSpread === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
            />

            {/* Faux Right Shell Cover */}
            <div
              className={cn(
                "absolute top-0 left-[50%] w-1/2 h-full rounded-r-xl shadow-[10px_15px_30px_rgba(0,0,0,0.4)] border-y border-r transition-all duration-500 origin-left transform translate-z-[-10px]",
                ambientLight === "studio" ? "bg-[#181310] border-white/5" : "bg-[#FAF7F2] border-black/10",
                activeSpread === totalLeafs ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
            />

            {/* Central Bound Spine Ridge */}
            {activeSpread > 0 && activeSpread < totalLeafs && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full z-40 bg-gradient-to-r from-black/20 via-black/45 to-black/20 pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.3)] transition-opacity duration-300" />
            )}

            {/* Sheet Render Engine (Looping Leafs) */}
            {Array.from({ length: totalLeafs }).map((_, i) => {
              const frontPageIdx = i * 2;
              const backPageIdx = i * 2 + 1;
              const isFlipped = i < activeSpread;
              
              // Dynamic stacked 3D spacing + zIndex allocation
              const zIndex = isFlipped ? i : totalLeafs - i;

              return (
                <div
                  key={i}
                  className="absolute top-0 right-0 w-1/2 h-full preserve-3d cursor-pointer"
                  style={{
                    transform: isFlipped
                      ? `rotateY(-180deg) translateZ(${-i * 0.4}px)`
                      : `rotateY(0deg) translateZ(${(totalLeafs - i) * 0.4}px)`,
                    transformOrigin: "left",
                    zIndex: zIndex,
                    transition: "transform 1.25s cubic-bezier(0.25, 1, 0.3, 1)",
                  }}
                  onClick={(e) => {
                    // Click on left/right side of leaf triggers page turn
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    if (isFlipped) {
                      // Clicked left side, go back
                      if (clickX < rect.width * 0.4) {
                        handlePrev();
                      }
                    } else {
                      // Clicked right side, go next
                      if (clickX > rect.width * 0.6) {
                        handleNext();
                      }
                    }
                  }}
                >
                  {/* Front Face (Right Side Page) */}
                  <div 
                    className="absolute inset-0 bg-[#FAF7F2] border-l border-black/5 rounded-r-xl shadow-[inset_-12px_0_24px_rgba(0,0,0,0.12)] overflow-hidden"
                    style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
                  >
                    {renderPageContent(pages[frontPageIdx], false)}
                  </div>

                  {/* Back Face (Left Side Page when Flipped) */}
                  <div
                    className="absolute inset-0 bg-[#FAF7F2] border-r border-black/5 rounded-l-xl shadow-[inset_12px_0_24px_rgba(0,0,0,0.12)] overflow-hidden"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg) translateZ(0)" }}
                  >
                    {renderPageContent(pages[backPageIdx], true)}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* MOBILE VIEW: Touch-Friendly Single Page Carousel   */}
        {/* -------------------------------------------------- */}
        {isMobile && (
          <div 
            className="w-full aspect-[4/5] relative rounded-xl overflow-hidden shadow-2xl border border-white/5 bg-[#FAF7F2] perspective-1000"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ perspective: "1200px" }}
          >
            {/* Ambient light overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-black/10 pointer-events-none z-20" />

            <div className="absolute inset-0 w-full h-full" style={{ transformStyle: "preserve-3d" }}>
              {pages.map((page, idx) => {
                const isFlipped = idx < activeSpread;
                const isCurrent = idx === activeSpread;
                
                // Stack pages: earlier pages are always on top of later pages to ensure both forward and backward flips render perfectly without z-index jumping
                const zIndex = totalPages - idx;

                return (
                  <div
                    key={idx}
                    className="absolute inset-0 w-full h-full origin-left"
                    style={{
                      transform: isFlipped
                        ? "rotateY(-180deg)"
                        : "rotateY(0deg)",
                      zIndex: zIndex,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      pointerEvents: isCurrent ? "auto" : "none",
                      transition: "transform 1.25s cubic-bezier(0.25, 1, 0.3, 1)",
                    }}
                  >
                    {/* Render page content */}
                    <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden">
                      {renderPageContent(page, false)}
                    </div>

                    {/* Gradient shadow overlay that darkens the page as it flips (lifts) */}
                    <div 
                      className="absolute inset-0 bg-black pointer-events-none"
                      style={{
                        opacity: isFlipped ? 0.5 : 0,
                        zIndex: 40,
                        transition: "opacity 1.25s cubic-bezier(0.25, 1, 0.3, 1)",
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Mobile Touch overlays */}
            <div className="absolute inset-y-0 left-0 w-1/4 z-40" onClick={handlePrev} />
            <div className="absolute inset-y-0 right-0 w-1/4 z-40" onClick={handleNext} />
            
            {/* Page Count Bubble */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 bg-black/45 backdrop-blur-md px-3 py-1 rounded-full border border-white/5 text-[9px] font-bold text-white tracking-widest uppercase">
              PAGE {activeSpread + 1} OF {totalPages}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Controls Guide */}
      {!isMobile && (
        <div className="flex gap-8 justify-center text-[10px] font-bold text-muted uppercase tracking-widest select-none">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            Click Page Edges To Flip
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Hover Pulsing Dots For Details
          </span>
        </div>
      )}
    </div>
  );
};
