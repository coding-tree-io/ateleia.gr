import * as React from 'react';

/**
 * Organic freehand SVG shapes used as background decorations
 * throughout the site. They evoke a creative, art-therapy feel.
 */

export function BrushStroke1({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 100 C80 40, 160 160, 240 90 S400 30, 480 110 S560 80, 580 100"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.15"
        fill="none"
      />
    </svg>
  );
}

export function OrganicBlob1({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M250 50 C350 30, 450 120, 430 220 S380 380, 280 420 C180 460, 60 380, 50 280 S80 100, 180 60 C210 48, 230 48, 250 50Z"
        fill="currentColor"
        opacity="0.04"
      />
    </svg>
  );
}

export function OrganicBlob2({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M200 30 C300 10, 380 90, 370 180 S340 340, 220 370 C120 400, 30 320, 40 220 S70 70, 160 40 C175 34, 190 30, 200 30Z"
        fill="currentColor"
        opacity="0.035"
      />
    </svg>
  );
}

export function FreehandCircle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M100 20 C140 18, 175 45, 180 85 S170 155, 130 175 C90 190, 40 170, 25 130 S20 55, 60 30 C72 23, 88 20, 100 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.12"
        fill="none"
      />
    </svg>
  );
}

export function ScribbleLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 30 Q40 10, 70 30 T130 30 T190 30 T250 30 T290 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.1"
        fill="none"
      />
    </svg>
  );
}

export function DotCluster({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {[
        [30, 25], [60, 15], [90, 30], [20, 55], [50, 48],
        [80, 58], [35, 85], [65, 78], [95, 88], [50, 105],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={2.5}
          fill="currentColor"
          opacity={0.08 + (i % 3) * 0.04}
        />
      ))}
    </svg>
  );
}

export function WavyDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 20 Q100 5, 200 20 T400 20 T600 20 T800 20 T1000 20 T1200 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.12"
        fill="none"
      />
    </svg>
  );
}
