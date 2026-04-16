import type { SVGProps } from "react";

type DiamondVariant = "fill" | "stroke" | "duotone";

interface DiamondProps extends Omit<SVGProps<SVGSVGElement>, "fill"> {
  size?: number;
  variant?: DiamondVariant;
  color?: string;
  strokeWidth?: number;
}

/**
 * Diamond motif — 45° rotated square.
 * Brand icon used as bullet points, nav indicators, and decorative accents.
 *
 * Variants:
 * - fill: solid filled diamond
 * - stroke: outline only
 * - duotone: outer stroke with inset fill (layered accent)
 */
export default function Diamond({
  size = 10,
  variant = "fill",
  color = "currentColor",
  strokeWidth = 1,
  ...rest
}: DiamondProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      {variant === "fill" && (
        <rect
          x="5"
          y="0.5"
          width="6.364"
          height="6.364"
          transform="rotate(45 5 0.5)"
          fill={color}
        />
      )}

      {variant === "stroke" && (
        <rect
          x="5"
          y="0.9"
          width="5.8"
          height="5.8"
          transform="rotate(45 5 0.9)"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
        />
      )}

      {variant === "duotone" && (
        <>
          <rect
            x="5"
            y="0.9"
            width="5.8"
            height="5.8"
            transform="rotate(45 5 0.9)"
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <rect
            x="5"
            y="2.8"
            width="3.1"
            height="3.1"
            transform="rotate(45 5 2.8)"
            fill={color}
          />
        </>
      )}
    </svg>
  );
}
