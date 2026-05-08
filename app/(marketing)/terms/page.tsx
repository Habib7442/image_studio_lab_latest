import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Review the terms and conditions for using Image Studio Lab products and services.",
};

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-background px-6 pt-16 pb-24 md:pt-24 md:pb-40">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-serif md:text-6xl">Terms of Service</h1>
        <p className="mb-12 text-sm uppercase tracking-widest text-muted">Last Updated: {lastUpdated}</p>

        <div className="prose prose-stone max-w-none space-y-12 text-muted leading-relaxed">
          <section>
            <h2 className="text-2xl font-serif text-foreground mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the Image Studio Lab website, you agree to be bound by these Terms of Service 
              and all applicable laws and regulations. If you do not agree with any of these terms, you are 
              prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-4">2. License & Intellectual Property</h2>
            <p>
              Upon purchase, Image Studio Lab grants you a non-exclusive, non-transferable license to use the 
              AI prompts included in our packs for both personal and commercial creative projects. 
              However, you may not:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>Resell, redistribute, or sub-license the raw prompt text itself as a standalone product.</li>
              <li>Claim authorship of the original prompt logic.</li>
              <li>Use our brand name or logo without express written permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-4">3. No Refunds</h2>
            <p>
              Due to the digital nature of our products (downloadable AI prompts), all sales are final. 
              Once you have gained access to the prompt pack, we cannot offer refunds. Please review the 
              sample generations on our site before making a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-4">4. Limitation of Liability</h2>
            <p>
              Image Studio Lab shall not be held liable for any damages arising out of the use or inability 
              to use the prompts on our site, even if we have been notified of the possibility of such damage. 
              We do not guarantee that the prompts will produce the exact same results across all versions 
              of AI models (e.g., future versions of Midjourney).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-4">5. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of your 
              jurisdiction, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
