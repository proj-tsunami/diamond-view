"use client";

/*
  Corner registration marks — thin L-shaped brackets at
  corners of a container. Gives a technical/precision feel
  like film registration or print crop marks.
*/

export default function CornerMarks({
  color = "rgba(255,255,255,0.08)",
  size = 20,
  thickness = 1,
  className = "",
}: {
  color?: string;
  size?: number;
  thickness?: number;
  className?: string;
}) {
  const markStyle = (
    top: boolean,
    left: boolean
  ): React.CSSProperties => ({
    position: "absolute",
    width: size,
    height: size,
    ...(top ? { top: 0 } : { bottom: 0 }),
    ...(left ? { left: 0 } : { right: 0 }),
    borderColor: color,
    borderStyle: "solid",
    borderWidth: 0,
    ...(top ? { borderTopWidth: thickness } : { borderBottomWidth: thickness }),
    ...(left ? { borderLeftWidth: thickness } : { borderRightWidth: thickness }),
  });

  return (
    <div className={`absolute inset-4 md:inset-8 pointer-events-none ${className}`}>
      <div style={markStyle(true, true)} />
      <div style={markStyle(true, false)} />
      <div style={markStyle(false, true)} />
      <div style={markStyle(false, false)} />
    </div>
  );
}
