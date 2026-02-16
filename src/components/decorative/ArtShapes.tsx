import * as React from 'react';

const palette = {
  terracotta: '#C7392E',
  terracottaSoft: '#D97F6F',
  teal: '#5C7A82',
  tealSoft: '#8CAEB5',
  ochre: '#C49A3C',
  ochreSoft: '#E0C987',
  sage: '#8D9A6B',
  ink: '#3D3534',
};

export function BotanicalCluster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M320 90 C360 150, 438 200, 416 322 C394 444, 336 514, 320 548 C304 514, 246 444, 224 322 C202 200, 280 150, 320 90 Z" fill={palette.sage} fillOpacity="0.16" />
      <path d="M320 188 C392 165, 496 198, 520 276 C490 248, 403 240, 320 264 Z" fill={palette.teal} fillOpacity="0.2" />
      <path d="M320 188 C248 165, 144 198, 120 276 C150 248, 237 240, 320 264 Z" fill={palette.terracottaSoft} fillOpacity="0.22" />
      <path d="M320 320 C392 296, 502 330, 526 414 C482 376, 394 360, 320 382 Z" fill={palette.ochre} fillOpacity="0.22" />
      <path d="M320 320 C248 296, 138 330, 114 414 C158 376, 246 360, 320 382 Z" fill={palette.tealSoft} fillOpacity="0.18" />
      <path d="M318 112 C320 220, 324 408, 322 548" stroke={palette.ink} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.22" />
      <circle cx="522" cy="278" r="10" fill={palette.terracotta} fillOpacity="0.3" />
      <circle cx="538" cy="304" r="7" fill={palette.ochre} fillOpacity="0.34" />
      <circle cx="118" cy="278" r="10" fill={palette.teal} fillOpacity="0.28" />
      <circle cx="102" cy="302" r="6" fill={palette.ochre} fillOpacity="0.32" />
    </svg>
  );
}

export function DancingFigures({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 840 520" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M164 306 C154 260, 146 202, 178 172 C194 158, 212 162, 210 184 C208 206, 190 238, 180 266 L210 224 C234 198, 266 210, 254 242 L232 286 L274 262 C296 248, 306 262, 294 284 L250 314 L210 356 C188 378, 164 346, 164 306 Z" fill={palette.terracotta} fillOpacity="0.2" />
      <circle cx="196" cy="154" r="21" fill={palette.terracottaSoft} fillOpacity="0.28" />

      <path d="M386 328 C376 284, 366 226, 398 194 C414 178, 432 182, 428 204 C424 226, 408 256, 398 282 L448 206 C468 182, 492 196, 480 220 L438 282 L344 206 C324 190, 314 202, 330 222 L376 278 L384 392 C388 410, 370 420, 360 396 L386 328 Z" fill={palette.teal} fillOpacity="0.2" />
      <circle cx="408" cy="178" r="23" fill={palette.tealSoft} fillOpacity="0.28" />

      <path d="M614 314 C604 272, 594 216, 624 186 C640 170, 656 174, 652 194 C648 214, 632 244, 624 268 L666 236 C684 220, 700 232, 690 252 L656 286 L572 244 C558 236, 550 244, 564 258 L602 280 L592 388 C588 408, 608 418, 614 396 L614 314 Z" fill={palette.ochre} fillOpacity="0.24" />
      <circle cx="634" cy="172" r="19" fill={palette.ochreSoft} fillOpacity="0.3" />

      <path d="M236 294 C292 260, 334 270, 366 292" stroke={palette.ink} strokeWidth="2" strokeOpacity="0.22" strokeLinecap="round" />
      <path d="M452 284 C504 262, 546 266, 582 284" stroke={palette.ink} strokeWidth="2" strokeOpacity="0.22" strokeLinecap="round" />
    </svg>
  );
}

export function ExpressiveStrokes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 860 440" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M32 210 C100 92, 250 334, 414 186 S670 58, 808 214" stroke={palette.teal} strokeWidth="20" strokeLinecap="round" strokeOpacity="0.18" />
      <path d="M62 254 C140 150, 290 354, 446 222 S684 110, 786 244" stroke={palette.terracotta} strokeWidth="9" strokeLinecap="round" strokeOpacity="0.22" />
      <path d="M188 364 C296 308, 410 108, 628 52" stroke={palette.ochre} strokeWidth="4" strokeLinecap="round" strokeOpacity="0.3" />
      <path d="M130 72 C188 96, 256 96, 320 78" stroke={palette.terracottaSoft} strokeWidth="5" strokeLinecap="round" strokeOpacity="0.2" />
      <path d="M540 360 C596 334, 664 338, 730 370" stroke={palette.tealSoft} strokeWidth="5" strokeLinecap="round" strokeOpacity="0.22" />
      <circle cx="360" cy="162" r="6" fill={palette.ochre} fillOpacity="0.3" />
      <circle cx="392" cy="194" r="4" fill={palette.terracotta} fillOpacity="0.32" />
      <circle cx="428" cy="146" r="5" fill={palette.teal} fillOpacity="0.28" />
      <circle cx="506" cy="124" r="7" fill={palette.ochreSoft} fillOpacity="0.32" />
      <circle cx="254" cy="286" r="5" fill={palette.terracottaSoft} fillOpacity="0.28" />
    </svg>
  );
}

export function AbstractFace({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 520" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M208 62 C290 62, 352 146, 352 248 C352 352, 312 432, 230 454 C164 472, 96 412, 74 328 C52 244, 98 62, 208 62 Z" fill={palette.tealSoft} fillOpacity="0.2" />
      <ellipse cx="238" cy="206" rx="26" ry="12" fill={palette.ink} fillOpacity="0.22" transform="rotate(-5 238 206)" />
      <circle cx="244" cy="204" r="6" fill={palette.terracotta} fillOpacity="0.3" />
      <path d="M214 226 C204 268, 194 288, 204 298" stroke={palette.ink} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.28" />
      <path d="M174 328 C194 316, 224 318, 246 328 C224 340, 194 344, 174 328 Z" fill={palette.ochre} fillOpacity="0.34" />
      <path d="M206 62 C166 52, 126 84, 116 124" stroke={palette.terracotta} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.24" />
      <path d="M206 62 C246 42, 308 62, 330 102" stroke={palette.teal} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.24" />
      <path d="M208 58 C184 34, 146 52, 136 92" stroke={palette.ochre} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.24" />
    </svg>
  );
}

export function ConcentricRings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="260" cy="260" r="226" stroke={palette.teal} strokeWidth="2" strokeOpacity="0.22" />
      <circle cx="260" cy="260" r="184" stroke={palette.terracotta} strokeWidth="2.2" strokeOpacity="0.26" />
      <circle cx="260" cy="260" r="142" stroke={palette.ochre} strokeWidth="2" strokeOpacity="0.3" />
      <circle cx="260" cy="260" r="102" stroke={palette.tealSoft} strokeWidth="2.2" strokeOpacity="0.3" />
      <circle cx="260" cy="260" r="64" stroke={palette.terracottaSoft} strokeWidth="2" strokeOpacity="0.36" />
      <circle cx="260" cy="260" r="27" fill={palette.ochre} fillOpacity="0.3" />
      <circle cx="184" cy="186" r="16" stroke={palette.ink} strokeWidth="1.5" strokeOpacity="0.24" />
      <circle cx="350" cy="164" r="11" fill={palette.terracotta} fillOpacity="0.28" />
      <circle cx="334" cy="346" r="13" stroke={palette.teal} strokeWidth="1.5" strokeOpacity="0.24" />
      <path d="M112 332 L412 120" stroke={palette.ink} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.16" />
    </svg>
  );
}

export function OrganicDivider({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path d="M0 28 C74 6, 132 48, 214 28 C294 8, 356 46, 436 24 C516 2, 586 50, 670 28 C754 6, 818 48, 900 26 C984 6, 1044 44, 1120 30 C1158 24, 1184 34, 1200 30" stroke={palette.terracotta} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.28" />
      <path d="M0 36 C88 58, 170 14, 260 38 C350 62, 436 12, 522 36 C608 58, 692 16, 780 38 C868 60, 952 14, 1044 36 C1110 50, 1168 24, 1200 36" stroke={palette.teal} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.2" />
      <path d="M0 32 C70 40, 142 20, 220 30 C302 42, 374 18, 456 32 C538 46, 618 20, 702 32 C786 44, 862 18, 944 30 C1026 44, 1106 18, 1200 34" stroke={palette.ochre} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.24" />
    </svg>
  );
}

export function PaintedEdgeDivider({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path d="M0 32 C90 26, 186 48, 286 40 C386 32, 486 16, 596 26 C706 36, 826 58, 938 46 C1050 34, 1148 14, 1254 22 C1332 28, 1392 38, 1440 34 L1440 72 L0 72 Z" fill={palette.tealSoft} fillOpacity="0.05" />
      <path d="M0 26 C88 14, 180 34, 284 24 C388 14, 492 2, 602 14 C712 26, 826 48, 938 38 C1050 26, 1154 6, 1262 16 C1340 22, 1394 32, 1440 30 L1440 72 L0 72 Z" fill={palette.terracottaSoft} fillOpacity="0.04" />
      <path d="M0 38 C104 54, 196 30, 308 36 C420 42, 522 56, 640 48 C758 40, 858 26, 968 32 C1078 38, 1178 52, 1288 46 C1364 42, 1416 36, 1440 38" stroke={palette.terracotta} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.18" />
      <path d="M0 34 C76 24, 152 44, 236 36 C322 28, 404 18, 492 26 C580 34, 668 48, 756 40 C844 32, 930 18, 1022 24 C1114 30, 1210 48, 1308 40 C1366 36, 1412 32, 1440 34" stroke={palette.ochre} strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.14" />
    </svg>
  );
}

export function PaintSplashes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 620 420" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M308 208 C348 154, 412 166, 390 228 C368 290, 322 312, 280 280 C238 248, 266 184, 308 208 Z" fill={palette.terracotta} fillOpacity="0.24" />
      <path d="M370 228 C378 258, 370 300, 376 332 C378 350, 366 360, 362 342 C358 324, 364 284, 362 254 Z" fill={palette.teal} fillOpacity="0.2" />
      <circle cx="422" cy="172" r="13" fill={palette.ochre} fillOpacity="0.34" />
      <circle cx="452" cy="204" r="7" fill={palette.terracottaSoft} fillOpacity="0.34" />
      <circle cx="226" cy="160" r="9" fill={palette.teal} fillOpacity="0.3" />
      <circle cx="204" cy="182" r="5" fill={palette.ochre} fillOpacity="0.28" />
      <circle cx="342" cy="314" r="6" fill={palette.tealSoft} fillOpacity="0.3" />
      <circle cx="414" cy="282" r="9" fill={palette.terracotta} fillOpacity="0.24" />
      {[
        [154, 122],
        [172, 104],
        [192, 132],
        [484, 150],
        [502, 182],
        [462, 130],
        [252, 320],
        [284, 344],
        [314, 352],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2 + (i % 3)} fill={i % 2 === 0 ? palette.ochre : palette.teal} fillOpacity={0.22 + (i % 3) * 0.05} />
      ))}
    </svg>
  );
}

export function HandCircle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M112 20 C156 16, 192 44, 198 86 C204 128, 180 170, 136 184 C92 198, 44 176, 24 136 C4 96, 20 46, 62 28 C80 20, 98 18, 112 20" stroke={palette.terracotta} strokeWidth="2.8" strokeLinecap="round" strokeOpacity="0.35" />
      <path d="M114 24 C156 22, 190 52, 196 90 C202 128, 176 166, 134 180 C90 194, 46 172, 30 134 C14 96, 28 52, 64 34 C82 24, 100 22, 114 24" stroke={palette.ochre} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.34" />
      <path d="M110 18 C146 14, 176 32, 194 60" stroke={palette.teal} strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.3" />
    </svg>
  );
}

export function WavyDivider({ className }: { className?: string }) {
  return className ? <PaintedEdgeDivider className={className} /> : <PaintedEdgeDivider />;
}
