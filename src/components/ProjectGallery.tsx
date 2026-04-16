"use client";

import AnimatedSection from "@/components/AnimatedSection";
import type { GalleryItem } from "@/sanity/queries";

interface ProjectGalleryProps {
  gallery: GalleryItem[];
}

export default function ProjectGallery({ gallery }: ProjectGalleryProps) {
  // Group items: "full" renders alone, consecutive "half" items pair up
  const rows: GalleryItem[][] = [];
  let i = 0;
  while (i < gallery.length) {
    if (gallery[i].layout === "full") {
      rows.push([gallery[i]]);
      i++;
    } else {
      // Pair two halves together, or render single half as full-width
      if (i + 1 < gallery.length && gallery[i + 1].layout === "half") {
        rows.push([gallery[i], gallery[i + 1]]);
        i += 2;
      } else {
        rows.push([gallery[i]]);
        i++;
      }
    }
  }

  return (
    <section className="bg-charcoal px-2 md:px-3 pb-2 md:pb-3" data-theme="dark">
      <div className="flex flex-col gap-2 md:gap-3">
        {rows.map((row, rowIndex) => (
          <AnimatedSection key={rowIndex} delay={rowIndex * 0.05}>
            {row.length === 1 ? (
              <img
                src={row[0].src}
                alt={row[0].alt}
                className="w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                {row.map((item, itemIndex) => (
                  <img
                    key={itemIndex}
                    src={item.src}
                    alt={item.alt}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
