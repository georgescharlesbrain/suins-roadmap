import type { RoadmapStatus } from "@/data/roadmap";

const STYLES: Record<RoadmapStatus, { label: string; className: string }> = {
  implemented: {
    label: "Shipped",
    className: "bg-green-100 text-green-700",
  },
  "in-development": {
    label: "Building",
    className: "bg-aqua text-sui-blue",
  },
  proposed: {
    label: "Exploring",
    className: "bg-slate/10 text-slate",
  },
};

export function StatusBadge({ status }: { status: RoadmapStatus }) {
  const { label, className } = STYLES[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${className}`}
    >
      {label}
    </span>
  );
}
