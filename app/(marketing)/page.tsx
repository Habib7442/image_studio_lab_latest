import { Hero } from "@/components/brand/hero";
import { FeaturedPacks } from "@/components/brand/featured-packs";
import { ReviewForm } from "@/components/brand/review-form";

export default function Home() {
  return (
    <div className="bg-background">
      <Hero />
      <FeaturedPacks />
      
      {/* Global Review Section */}
      <section className="py-24 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <ReviewForm />
        </div>
      </section>
    </div>
  );
}
