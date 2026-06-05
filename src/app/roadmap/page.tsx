import type { Metadata } from "next";
import { RoadmapExplorer } from "@/components/RoadmapExplorer";

export const metadata: Metadata = {
  title: "Roadmap — The Future of SuiNS",
  description:
    "Shipped, building, and exploring — the path from .sui names to a full identity, social, and discovery protocol.",
};

export default function Roadmap() {
  return (
    <main>
      <RoadmapExplorer />
    </main>
  );
}
