import { Hero } from "@/components/brand/hero";

export default function Home() {
  return (
    <div className="bg-background">
      <Hero />
      {/* Subsequent sections (Segments, Featured Packs, etc.) will go here */}
    </div>
  );
}
