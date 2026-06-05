"use client";

import { useEffect, useState } from "react";

/**
 * Preview mode controls whether review-pending (`review: "candidate"`) roadmap
 * features are revealed. It is on when:
 *  - running outside production (`pnpm dev`), or
 *  - the URL carries `?preview=1` (or `?preview=true`).
 *
 * Returning `false` on the first render in production keeps server and client
 * markup identical (no hydration mismatch); the effect then opts in if the query
 * param is present.
 */
export function usePreview(): boolean {
  const [preview, setPreview] = useState(
    process.env.NODE_ENV !== "production",
  );

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("preview");
    if (value === "1" || value === "true") setPreview(true);
  }, []);

  return preview;
}
