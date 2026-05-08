import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/brand/smooth-scroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://imagestudiolab.com"),
  title: {
    default: "Image Studio Lab — Master Prompts. Beautiful AI Images.",
    template: "%s | Image Studio Lab"
  },
  description: "Editorial-grade, master-tested prompt packs for ChatGPT and Gemini. Copy, paste, and generate high-end AI art with zero prompt engineering.",
  keywords: ["AI prompts", "ChatGPT prompts", "Gemini prompts", "AI art generation", "prompt engineering", "image studio lab", "cinematic AI art"],
  authors: [{ name: "Image Studio Lab" }],
  creator: "Image Studio Lab",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://imagestudiolab.com",
    title: "Image Studio Lab — The Art of Zero Engineering",
    description: "Premium prompt packs for the world's most powerful AI models. Copy, paste, and create editorial-grade images instantly.",
    siteName: "Image Studio Lab",
    images: [
      {
        url: "/og.png", // Using the beautiful studio background as OG
        width: 1200,
        height: 630,
        alt: "Image Studio Lab — Master Prompts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Studio Lab — Master Prompts. Beautiful AI Images.",
    description: "Master-tested prompt packs for ChatGPT and Gemini. No prompt engineering required.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
