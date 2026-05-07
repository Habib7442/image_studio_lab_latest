import { Hero } from "@/components/brand/hero";
import { FeaturedPacks } from "@/components/brand/featured-packs";
import { ProblemSolution } from "@/components/brand/problem-solution";

export default function Home() {
  return (
    <div className="bg-background">
      <Hero />
      <FeaturedPacks />
    </div>
  );
}
