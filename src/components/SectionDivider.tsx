import Diamond from "./Diamond";

type DividerVariant =
  | "line"        // simple full-width thin line
  | "short"       // short 70px line (brand section-divider spec)
  | "diamond"     // line + centered diamond + line
  | "triple"      // three diamonds spaced with short lines
  | "geo";        // multi-segment thin line with diamond bullet

interface SectionDividerProps {
  variant?: DividerVariant;
  className?: string;
  /** Override color — defaults to currentColor so it inherits dark/light */
  color?: string;
  /** Override accent diamond color — defaults to taupe */
  accent?: string;
}

/**
 * Brand section divider — thin line + diamond motif.
 * Subtle separators between sections, derived from the DV Brand Guide.
 *
 * Use `color="cream"` on dark sections, or leave as currentColor.
 */
export default function SectionDivider({
  variant = "diamond",
  className = "",
  color,
  accent,
}: SectionDividerProps) {
  const lineStyle = color ? { background: color } : undefined;
  const accentClass = accent ? "" : "text-taupe";
  const accentStyle = accent ? { color: accent } : undefined;

  if (variant === "line") {
    return (
      <div
        className={`w-full h-px opacity-[0.12] ${className}`}
        style={lineStyle ?? { background: "currentColor" }}
        aria-hidden
      />
    );
  }

  if (variant === "short") {
    return (
      <div
        className={`w-[70px] opacity-[0.2] ${className}`}
        style={{
          height: "3.5px",
          background: color ?? "currentColor",
        }}
        aria-hidden
      />
    );
  }

  if (variant === "diamond") {
    return (
      <div
        className={`flex items-center justify-center gap-4 w-full ${className}`}
        aria-hidden
      >
        <span
          className="flex-1 h-px opacity-[0.12]"
          style={lineStyle ?? { background: "currentColor" }}
        />
        <Diamond
          size={8}
          variant="duotone"
          strokeWidth={0.75}
          className={accentClass}
          style={accentStyle}
        />
        <span
          className="flex-1 h-px opacity-[0.12]"
          style={lineStyle ?? { background: "currentColor" }}
        />
      </div>
    );
  }

  if (variant === "triple") {
    return (
      <div
        className={`flex items-center justify-center gap-3 w-full ${className}`}
        aria-hidden
      >
        <span
          className="flex-1 h-px opacity-[0.1]"
          style={lineStyle ?? { background: "currentColor" }}
        />
        <Diamond size={5} variant="stroke" strokeWidth={0.75} className={accentClass} style={accentStyle} />
        <span className="w-8 h-px opacity-[0.15]" style={lineStyle ?? { background: "currentColor" }} />
        <Diamond size={7} variant="fill" className={accentClass} style={accentStyle} />
        <span className="w-8 h-px opacity-[0.15]" style={lineStyle ?? { background: "currentColor" }} />
        <Diamond size={5} variant="stroke" strokeWidth={0.75} className={accentClass} style={accentStyle} />
        <span
          className="flex-1 h-px opacity-[0.1]"
          style={lineStyle ?? { background: "currentColor" }}
        />
      </div>
    );
  }

  // geo — used as section-labels with an icon start
  return (
    <div
      className={`flex items-center gap-3 w-full ${className}`}
      aria-hidden
    >
      <Diamond size={6} variant="fill" className={accentClass} style={accentStyle} />
      <span
        className="flex-1 h-px opacity-[0.1]"
        style={lineStyle ?? { background: "currentColor" }}
      />
    </div>
  );
}
