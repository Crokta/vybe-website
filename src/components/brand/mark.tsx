import { site } from "@/lib/site";

/*
 * The mark, drawn from the same geometry as the app's `_MarkPainter` and `tools/brand/mark.py`:
 * two paths converging on one point — two people, one plan, one real table.
 */
const LEFT = "M30 30 L60 80";
const RIGHT = "M90 21 L60 80";
const DOT = { cx: 60, cy: 80, r: 10.5 };
const STROKE = 17;

type MarkProps = {
  size?: number;
  /** One ink for the whole mark, for surfaces where three colours would be noise. */
  monochrome?: string;
  /** Draws the two paths in, once, when the mark first appears. */
  animated?: boolean;
  className?: string;
  title?: string;
};

export function Mark({ size = 40, monochrome, animated, className, title }: MarkProps) {
  const pathProps = animated
    ? { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1, className: "animate-draw" }
    : {};

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g fill="none" strokeLinecap="round" strokeWidth={STROKE}>
        <path d={LEFT} stroke={monochrome ?? site.colors.plum} {...pathProps} />
        <path
          d={RIGHT}
          stroke={monochrome ?? site.colors.rose}
          {...pathProps}
          style={animated ? { animationDelay: "150ms" } : undefined}
        />
      </g>
      <circle {...DOT} fill={monochrome ?? site.colors.amber} />
    </svg>
  );
}

type LockupProps = {
  height?: number;
  /** Wordmark colour. The mark keeps its own colours unless `monochrome` is set. */
  color?: string;
  monochrome?: boolean;
  className?: string;
};

/** The mark and the wordmark, tracked out as in the app's `VybeLockup`. */
export function Lockup({ height = 32, color = "currentColor", monochrome, className }: LockupProps) {
  return (
    <span className={`inline-flex items-center ${className ?? ""}`} style={{ gap: height * 0.26 }}>
      <Mark size={height} monochrome={monochrome ? color : undefined} />
      <span
        className="leading-none font-semibold"
        style={{ fontSize: height * 0.56, letterSpacing: height * 0.09, color }}
      >
        VYBE
      </span>
    </span>
  );
}
