const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

/**
 * Generates an array of sequential frame URLs.
 * @param basePath - Directory path under public/ (e.g., "/sequences/hero/desktop")
 * @param count - Number of frames
 * @param startAt - First frame number (default: 1)
 * @returns Array of URLs like ["/sequences/hero/desktop/frame-001.webp", ...]
 */
export function getFrameUrls(
  basePath: string,
  count: number,
  startAt: number = 1
): string[] {
  return Array.from({ length: count }, (_, i) => {
    const num = String(startAt + i).padStart(3, "0");
    return `${BASE}${basePath}/frame-${num}.webp`;
  });
}
