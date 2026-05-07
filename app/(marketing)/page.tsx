import { Hero } from "@/components/brand/hero";
import { FeaturedPacks } from "@/components/brand/featured-packs";
import { Testimonials } from "@/components/brand/testimonials";

export default function Home() {
  return (
    <div className="bg-background">
      <Hero />
      <FeaturedPacks />
      
      {/* Testimonials Section */}
      <section className="py-24 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <Testimonials />
        </div>
      </section>
    </div>
  );
}
