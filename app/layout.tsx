import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/brand/smooth-scroll";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

import { BASE_SEO } from "@/lib/seo";

export const metadata: Metadata = {
  ...BASE_SEO,
  keywords: ["AI 3D lookbooks", "3D shoppable catalogs", "digital catalogs", "image studio lab", "interactive flipbooks", "shoppable hotspots"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        fraunces.variable,
        "font-sans"
      )}
    >
      <body 
        className="bg-background text-foreground"
        suppressHydrationWarning
      >
        <ClerkProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ClerkProvider>
      </body>
    </html>
  );
}
