"use client";

/*
  Diamond point shape — the bottom edge of the header section.
  Creates a downward-pointing chevron/diamond facet shape
  that the header sits on top of, with a drop shadow for depth.
*/

export default function DiamondEdge({
  color = "#181919",
  shadow = true,
}: {
  color?: string;
  shadow?: boolean;
}) {
  return (
    <div className="relative w-full" style={{ marginTop: -1 }}>
      {/* Drop shadow layer — sits behind the shape */}
      {shadow && (
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full h-[120px]"
          style={{ filter: "blur(20px)", opacity: 0.3, transform: "translateY(8px)" }}
        >
          <polygon
            points="0,0 1440,0 1440,60 720,120 0,60"
            fill="#000000"
          />
        </svg>
      )}

      {/* Diamond point shape */}
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="block w-full h-[80px] md:h-[100px]"
      >
        <polygon
          points="0,0 1440,0 1440,50 720,100 0,50"
          fill={color}
        />
      </svg>
    </div>
  );
}
