import * as React from 'react';

/**
 * Rich, Matisse / Kandinsky-inspired freehand SVG artwork.
 * These are used as large low-opacity background decorations to
 * give the site an art-therapy studio ambience.
 */

/* ── Botanical / leaf cluster (Matisse cut-out style) ── */
export function BotanicalCluster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Large leaf */}
      <path d="M300 80 C340 140, 420 180, 400 300 C380 420, 320 480, 300 520 C280 480, 220 420, 200 300 C180 180, 260 140, 300 80Z" fill="currentColor" opacity="0.06" />
      {/* Smaller leaves branching */}
      <path d="M300 200 C360 180, 440 200, 460 260 C440 240, 370 230, 300 250Z" fill="currentColor" opacity="0.045" />
      <path d="M300 200 C240 180, 160 200, 140 260 C160 240, 230 230, 300 250Z" fill="currentColor" opacity="0.04" />
      <path d="M300 320 C370 300, 460 320, 480 380 C450 350, 370 340, 300 360Z" fill="currentColor" opacity="0.035" />
      <path d="M300 320 C230 300, 140 320, 120 380 C150 350, 230 340, 300 360Z" fill="currentColor" opacity="0.03" />
      {/* Stem */}
      <path d="M298 100 C300 200, 302 400, 300 520" stroke="currentColor" strokeWidth="2" opacity="0.06" fill="none" />
      {/* Berry dots */}
      <circle cx="460" cy="250" r="8" fill="currentColor" opacity="0.05" />
      <circle cx="475" cy="270" r="6" fill="currentColor" opacity="0.04" />
      <circle cx="140" cy="250" r="8" fill="currentColor" opacity="0.05" />
      <circle cx="125" cy="275" r="5" fill="currentColor" opacity="0.04" />
    </svg>
  );
}

/* ── Dancing figures (Matisse "Dance" inspired) ── */
export function DancingFigures({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Figure 1 - leaping */}
      <path d="M160 300 C150 260, 140 200, 170 170 C185 155, 200 160, 200 180 C200 200, 180 230, 170 260 L200 220 C220 200, 250 210, 240 240 L220 280 L260 260 C280 250, 290 260, 280 280 L240 310 L200 350 C180 370, 160 340, 160 300Z" fill="currentColor" opacity="0.045" />
      {/* Head */}
      <circle cx="185" cy="155" r="20" fill="currentColor" opacity="0.04" />

      {/* Figure 2 - arms wide */}
      <path d="M380 320 C370 280, 360 220, 390 190 C405 175, 420 180, 415 200 C410 220, 395 250, 390 270 L440 200 C460 180, 480 190, 470 215 L430 270 L340 200 C320 185, 310 195, 325 215 L370 270 L380 380 C385 400, 370 410, 360 390 L380 320Z" fill="currentColor" opacity="0.04" />
      <circle cx="400" cy="175" r="22" fill="currentColor" opacity="0.035" />

      {/* Figure 3 - swaying */}
      <path d="M600 310 C590 270, 580 210, 610 180 C625 165, 640 170, 635 190 C630 210, 615 240, 610 260 L650 230 C665 215, 680 225, 670 245 L640 280 L560 240 C545 230, 540 240, 555 255 L590 275 L580 380 C575 400, 595 410, 600 390 L600 310Z" fill="currentColor" opacity="0.04" />
      <circle cx="620" cy="165" r="18" fill="currentColor" opacity="0.035" />

      {/* Connection arcs between figures */}
      <path d="M230 290 C280 260, 330 270, 360 290" stroke="currentColor" strokeWidth="2" opacity="0.03" fill="none" />
      <path d="M450 280 C500 260, 540 265, 570 280" stroke="currentColor" strokeWidth="2" opacity="0.03" fill="none" />
    </svg>
  );
}

/* ── Expressive brush strokes (gestural, abstract-expressionist) ── */
export function ExpressiveStrokes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Thick sweeping stroke */}
      <path d="M40 200 C100 80, 250 320, 400 180 S650 50, 760 200" stroke="currentColor" strokeWidth="18" strokeLinecap="round" opacity="0.03" fill="none" />
      {/* Thinner parallel stroke */}
      <path d="M60 240 C130 140, 270 340, 420 210 S660 100, 740 230" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.04" fill="none" />
      {/* Cross stroke */}
      <path d="M200 350 C300 300, 400 100, 600 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.04" fill="none" />
      {/* Splatter dots */}
      <circle cx="350" cy="160" r="5" fill="currentColor" opacity="0.04" />
      <circle cx="380" cy="190" r="3" fill="currentColor" opacity="0.035" />
      <circle cx="420" cy="145" r="4" fill="currentColor" opacity="0.04" />
      <circle cx="500" cy="120" r="6" fill="currentColor" opacity="0.03" />
      <circle cx="250" cy="280" r="4" fill="currentColor" opacity="0.035" />
    </svg>
  );
}

/* ── Abstract face / profile (Matisse-style cut-out) ── */
export function AbstractFace({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Face outline */}
      <path d="M200 60 C280 60, 340 140, 340 240 C340 340, 300 420, 220 440 C160 455, 100 400, 80 320 C60 240, 100 60, 200 60Z" fill="currentColor" opacity="0.035" />
      {/* Eye */}
      <ellipse cx="230" cy="200" rx="25" ry="12" fill="currentColor" opacity="0.05" transform="rotate(-5 230 200)" />
      <circle cx="235" cy="198" r="6" fill="currentColor" opacity="0.06" />
      {/* Nose line */}
      <path d="M210 220 C200 260, 190 280, 200 290" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.05" fill="none" />
      {/* Lips */}
      <path d="M170 320 C190 310, 220 310, 240 320 C220 330, 190 335, 170 320Z" fill="currentColor" opacity="0.045" />
      {/* Hair strokes */}
      <path d="M200 60 C160 50, 120 80, 110 120" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.04" fill="none" />
      <path d="M200 60 C240 40, 300 60, 320 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.04" fill="none" />
      <path d="M200 55 C180 30, 140 50, 130 90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.03" fill="none" />
    </svg>
  );
}

/* ── Swirling circles (Kandinsky-inspired concentric rings) ── */
export function ConcentricRings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="250" cy="250" r="220" stroke="currentColor" strokeWidth="1.5" opacity="0.04" />
      <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="2" opacity="0.05" />
      <circle cx="250" cy="250" r="140" stroke="currentColor" strokeWidth="1" opacity="0.04" />
      <circle cx="250" cy="250" r="100" stroke="currentColor" strokeWidth="2.5" opacity="0.05" />
      <circle cx="250" cy="250" r="60" stroke="currentColor" strokeWidth="1.5" opacity="0.06" />
      <circle cx="250" cy="250" r="25" fill="currentColor" opacity="0.04" />
      {/* Off-center accent circles */}
      <circle cx="180" cy="180" r="15" stroke="currentColor" strokeWidth="1.5" opacity="0.04" />
      <circle cx="340" cy="160" r="10" fill="currentColor" opacity="0.03" />
      <circle cx="320" cy="340" r="12" stroke="currentColor" strokeWidth="1" opacity="0.035" />
    </svg>
  );
}

/* ── Organic freehand divider ── */
export function OrganicDivider({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path d="M0 30 C60 10, 120 50, 200 30 C280 10, 340 45, 420 25 C500 5, 560 50, 650 30 C740 10, 800 48, 880 28 C960 8, 1020 45, 1100 30 C1140 22, 1170 35, 1200 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.1" fill="none" />
      <path d="M0 35 C80 55, 160 15, 250 38 C340 61, 420 12, 510 35 C600 58, 680 18, 770 38 C860 58, 940 15, 1030 35 C1100 50, 1160 25, 1200 35" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.06" fill="none" />
    </svg>
  );
}

/* ── Scattered paint splashes ── */
export function PaintSplashes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Large splash */}
      <path d="M300 200 C340 150, 400 160, 380 220 C360 280, 320 300, 280 270 C240 240, 260 180, 300 200Z" fill="currentColor" opacity="0.03" />
      {/* Drip */}
      <path d="M360 220 C365 250, 358 290, 362 320 C364 340, 358 350, 355 335 C352 320, 356 280, 355 250Z" fill="currentColor" opacity="0.025" />
      {/* Satellite drops */}
      <circle cx="420" cy="170" r="12" fill="currentColor" opacity="0.03" />
      <circle cx="450" cy="200" r="6" fill="currentColor" opacity="0.04" />
      <circle cx="220" cy="160" r="8" fill="currentColor" opacity="0.03" />
      <circle cx="200" cy="180" r="4" fill="currentColor" opacity="0.035" />
      <circle cx="340" cy="310" r="5" fill="currentColor" opacity="0.03" />
      <circle cx="410" cy="280" r="9" fill="currentColor" opacity="0.025" />
      {/* Spray dots */}
      {[[150,120],[170,100],[190,130],[480,150],[500,180],[460,130],[250,320],[280,340],[310,350]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2 + (i % 3)} fill="currentColor" opacity={0.02 + (i % 3) * 0.01} />
      ))}
    </svg>
  );
}

/* ── Hand-drawn circle ── */
export function HandCircle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M100 20 C142 16, 178 42, 184 82 C190 122, 168 164, 128 178 C88 192, 42 172, 24 134 C6 96, 22 48, 60 28 C76 20, 90 18, 100 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.08" fill="none" />
      {/* Second pass - imperfect overlap */}
      <path d="M102 22 C144 20, 176 48, 182 86 C188 124, 164 162, 126 176 C86 188, 44 168, 28 132 C12 96, 26 50, 62 32 C78 22, 92 20, 102 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.05" fill="none" />
    </svg>
  );
}

/* ── Wavy section divider (replaces old WavyDivider) ── */
export function WavyDivider({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path d="M0 20 Q100 5, 200 20 T400 20 T600 20 T800 20 T1000 20 T1200 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.12" fill="none" />
    </svg>
  );
}
