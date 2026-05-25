"use client";

import React, { useState } from "react";
import { ArrowRight, Send, CheckCircle2, Sparkles, FolderHeart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CatalogueBookingProps {
  businessName: string;
}

export const CatalogueBooking: React.FC<CatalogueBookingProps> = ({ businessName }) => {
  const [formState, setFormState] = useState({
    brandName: businessName ? businessName.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "",
    contactEmail: "",
    websiteUrl: "",
    campaignScope: "full",
    aestheticVision: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.contactEmail || !formState.brandName) return;

    setIsSubmitting(true);
    // Simulate premium submission sequence
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  return (
    <section className="relative w-full border-t border-border/40 bg-card/20 py-24 md:py-32 overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute right-[-10%] top-[20%] h-[300px] w-[300px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-[-5%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">
          {/* Left Column: Premium Pitch */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="flex items-center gap-2 text-xs font-semibold tracking-widest text-gold uppercase mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Bespoke Showrooms
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight text-foreground">
              A Lookbook <br />
              <em className="italic">Custom Built</em> <br />
              For Your Brand.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted font-sans font-medium">
              Elevate your online storefront with the premium, realistic AI lookbook engine designed by Image Studio Lab. Stop spending thousands on traditional photoshoots, lighting crew, and rentals.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted font-sans font-medium">
              We engineer master-level custom prompt packs and host fluid interactive 3D digital catalogs tailored strictly to your product catalog.
            </p>

            <div className="mt-8 flex flex-col gap-4 border-l border-border/80 pl-4 py-1">
              <div className="flex items-start gap-3">
                <FolderHeart className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-foreground font-sans">Full Ownership</h4>
                  <p className="text-[11px] text-muted font-sans mt-0.5">Keep 100% rights to generated lookbook assets.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-foreground font-sans">Supercharged CTR</h4>
                  <p className="text-[11px] text-muted font-sans mt-0.5">Interactive pulsing hotspots click right to purchase.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Booking Form / Success State */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-card/65 p-8 md:p-10 backdrop-blur-xl shadow-2xl">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold mb-6 animate-pulse">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-foreground mb-3">
                    Inquiry Received, <em className="italic">{formState.brandName}</em>.
                  </h3>
                  <p className="max-w-md text-xs leading-relaxed text-muted font-medium mb-8">
                    Our lead creative director will review your aesthetic goals and curate a complimentary AI mood board within 24 hours to your email: <span className="text-foreground underline">{formState.contactEmail}</span>.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="rounded-full bg-gold/10 hover:bg-gold/20 px-6 py-2.5 text-xs font-bold text-gold tracking-wide uppercase transition-all"
                  >
                    Reset Form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-serif text-xl font-light text-foreground">
                      Let&apos;s Create Your Brand Showroom.
                    </h3>
                    <p className="text-[11px] text-muted font-medium mt-1">
                      Fill out your brand details, and our studio team will build a demo lookbook spread.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* Brand Name Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="brandName" className="text-[10px] font-bold text-muted uppercase tracking-wider">
                        Brand Name
                      </label>
                      <input
                        id="brandName"
                        type="text"
                        required
                        value={formState.brandName}
                        onChange={(e) => setFormState({ ...formState, brandName: e.target.value })}
                        placeholder="e.g. Aura Cosmetics"
                        className="w-full rounded-lg border border-white/5 bg-background/50 px-4 py-3 text-xs font-medium text-foreground placeholder:text-muted/60 focus:border-gold/50 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Contact Email Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contactEmail" className="text-[10px] font-bold text-muted uppercase tracking-wider">
                        Contact Email
                      </label>
                      <input
                        id="contactEmail"
                        type="email"
                        required
                        value={formState.contactEmail}
                        onChange={(e) => setFormState({ ...formState, contactEmail: e.target.value })}
                        placeholder="e.g. founders@brand.com"
                        className="w-full rounded-lg border border-white/5 bg-background/50 px-4 py-3 text-xs font-medium text-foreground placeholder:text-muted/60 focus:border-gold/50 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* Website / Social Link */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="websiteUrl" className="text-[10px] font-bold text-muted uppercase tracking-wider">
                        Website or Instagram
                      </label>
                      <input
                        id="websiteUrl"
                        type="text"
                        value={formState.websiteUrl}
                        onChange={(e) => setFormState({ ...formState, websiteUrl: e.target.value })}
                        placeholder="e.g. www.auracosmetics.com"
                        className="w-full rounded-lg border border-white/5 bg-background/50 px-4 py-3 text-xs font-medium text-foreground placeholder:text-muted/60 focus:border-gold/50 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Campaign Scope Dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="campaignScope" className="text-[10px] font-bold text-muted uppercase tracking-wider">
                        Estimated Campaign Scope
                      </label>
                      <select
                        id="campaignScope"
                        value={formState.campaignScope}
                        onChange={(e) => setFormState({ ...formState, campaignScope: e.target.value })}
                        className="w-full rounded-lg border border-white/5 bg-background/50 px-4 py-3 text-xs font-medium text-foreground focus:border-gold/50 focus:outline-none transition-all appearance-none"
                      >
                        <option value="starter" className="bg-card text-foreground">Mini Lookbook Pack (5 Setups)</option>
                        <option value="full" className="bg-card text-foreground">Standard Digital Catalog (15 Setups)</option>
                        <option value="enterprise" className="bg-card text-foreground">Enterprise Infinite Studio (30+ Custom Setups)</option>
                      </select>
                    </div>
                  </div>

                  {/* Aesthetic Vision Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="aestheticVision" className="text-[10px] font-bold text-muted uppercase tracking-wider">
                      Aesthetic Vision & Message
                    </label>
                    <textarea
                      id="aestheticVision"
                      rows={3}
                      value={formState.aestheticVision}
                      onChange={(e) => setFormState({ ...formState, aestheticVision: e.target.value })}
                      placeholder="Describe your desired mood, color tones, lighting style, or products..."
                      className="w-full rounded-lg border border-white/5 bg-background/50 px-4 py-3 text-xs font-medium text-foreground placeholder:text-muted/60 focus:border-gold/50 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Premium Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative mt-2 flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-foreground text-background font-bold tracking-wider text-xs py-4 uppercase transition-all duration-300 hover:bg-gold hover:text-foreground active:scale-98 disabled:opacity-50 cursor-pointer shadow-lg hover:shadow-gold/20"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        Transmitting Inquiry...
                      </>
                    ) : (
                      <>
                        Request Custom Studio Showroom
                        <Send className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
