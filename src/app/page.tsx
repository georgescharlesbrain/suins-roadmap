import { Hero } from "@/components/Hero";
import { Thesis } from "@/components/Thesis";
import { Showcase } from "@/components/Showcase";
import { RoadmapExplorer } from "@/components/RoadmapExplorer";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Thesis />
      <Showcase />
      <RoadmapExplorer />
      <Footer />
    </main>
  );
}
