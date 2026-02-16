import * as React from 'react';

import type { NounSvgDefinition } from '@/components/decorative/noun-svg-source';
import { cn } from '@/lib/utils';

export type NounLineArtVariant = 'minimal' | 'whisper' | 'vivid';

type NounLineArtProps = {
  className?: string | undefined;
  variant?: NounLineArtVariant;
  definition: NounSvgDefinition;
  dataComponent: string;
};

const svgPalette = {
  terracotta: '#C7392E',
  terracottaSoft: '#D97F6F',
  teal: '#5C7A82',
  tealSoft: '#8CAEB5',
  ochre: '#C49A3C',
  ochreSoft: '#E0C987',
  ink: '#3D3534',
  paper: '#F8F2EC',
};

const variantProfile: Record<
  NounLineArtVariant,
  {
    terracottaBlob: number;
    tealBlob: number;
    ochreBlob: number;
    dots: number;
    gradientStroke: number;
    accent: number;
    line: number;
  }
> = {
  minimal: {
    terracottaBlob: 0,
    tealBlob: 0,
    ochreBlob: 0,
    dots: 0.08,
    gradientStroke: 0,
    accent: 0,
    line: 0.78,
  },
  whisper: {
    terracottaBlob: 0.1,
    tealBlob: 0.08,
    ochreBlob: 0.06,
    dots: 0.18,
    gradientStroke: 0.16,
    accent: 0.14,
    line: 0.62,
  },
  vivid: {
    terracottaBlob: 0.32,
    tealBlob: 0.28,
    ochreBlob: 0.24,
    dots: 0.38,
    gradientStroke: 0.46,
    accent: 0.3,
    line: 0.75,
  },
};

function parseViewBox(viewBox: string) {
  const values = viewBox.trim().split(/\s+/);
  if (values.length !== 4) {
    throw new Error(`Invalid viewBox: ${viewBox}`);
  }

  const minX = Number(values[0]);
  const minY = Number(values[1]);
  const width = Number(values[2]);
  const height = Number(values[3]);

  if (![minX, minY, width, height].every((value) => Number.isFinite(value))) {
    throw new Error(`Non-numeric viewBox values: ${viewBox}`);
  }

  return { minX, minY, width, height };
}

export function NounLineArt({ className, variant = 'whisper', definition, dataComponent }: NounLineArtProps) {
  const profile = variantProfile[variant];
  const idBase = React.useId().replace(/:/g, '');
  const gradientId = `noun-line-art-gradient-${idBase}`;

  const { minX, minY, width, height } = parseViewBox(definition.viewBox);
  const shortEdge = Math.min(width, height);

  const centerX = minX + width / 2;
  const centerY = minY + height / 2;

  const blobs = [
    {
      cx: minX + width * 0.28,
      cy: minY + height * 0.34,
      r: shortEdge * 0.18,
      color: svgPalette.terracotta,
      opacity: profile.terracottaBlob,
    },
    {
      cx: minX + width * 0.67,
      cy: minY + height * 0.65,
      r: shortEdge * 0.23,
      color: svgPalette.teal,
      opacity: profile.tealBlob,
    },
    {
      cx: minX + width * 0.74,
      cy: minY + height * 0.35,
      r: shortEdge * 0.14,
      color: svgPalette.ochre,
      opacity: profile.ochreBlob,
    },
  ];

  const dots = [
    { cx: minX + width * 0.17, cy: minY + height * 0.57, r: shortEdge * 0.024, color: svgPalette.tealSoft },
    { cx: minX + width * 0.39, cy: minY + height * 0.22, r: shortEdge * 0.021, color: svgPalette.terracottaSoft },
    { cx: minX + width * 0.65, cy: minY + height * 0.25, r: shortEdge * 0.02, color: svgPalette.ochreSoft },
    { cx: minX + width * 0.76, cy: minY + height * 0.77, r: shortEdge * 0.022, color: svgPalette.terracotta },
  ];

  return (
    <svg
      viewBox={definition.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('overflow-visible', className)}
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
      data-component={dataComponent}
    >
      <defs>
        <linearGradient id={gradientId} x1={minX + width * 0.14} y1={minY + height * 0.18} x2={minX + width * 0.83} y2={minY + height * 0.84} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={svgPalette.terracotta} />
          <stop offset="52%" stopColor={svgPalette.teal} />
          <stop offset="100%" stopColor={svgPalette.ochre} />
        </linearGradient>
      </defs>

      <rect x={minX} y={minY} width={width} height={height} fill={svgPalette.paper} fillOpacity="0.96" />

      {blobs.map((blob) => (
        <circle key={`${blob.cx}-${blob.cy}-${blob.color}`} cx={blob.cx} cy={blob.cy} r={blob.r} fill={blob.color} fillOpacity={blob.opacity} />
      ))}

      {dots.map((dot) => (
        <circle key={`${dot.cx}-${dot.cy}-${dot.color}`} cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.color} fillOpacity={profile.dots} />
      ))}

      {definition.paths.map((pathData, index) => (
        <path
          key={`noun-path-ink-${index}`}
          d={pathData}
          fill="none"
          stroke={svgPalette.ink}
          strokeWidth={shortEdge * 0.0092}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={profile.line}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {profile.gradientStroke > 0 &&
        definition.paths.map((pathData, index) => (
          <path
            key={`noun-path-gradient-${index}`}
            d={pathData}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={shortEdge * 0.0082}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={profile.gradientStroke}
            vectorEffect="non-scaling-stroke"
          />
        ))}

      {profile.accent > 0 &&
        definition.paths.map((pathData, index) => (
          <path
            key={`noun-path-accent-${index}`}
            d={pathData}
            fill="none"
            stroke={svgPalette.terracottaSoft}
            strokeWidth={shortEdge * 0.0034}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={profile.accent}
            vectorEffect="non-scaling-stroke"
          />
        ))}

      {variant === 'minimal' && (
        <circle cx={centerX + width * 0.15} cy={centerY + height * 0.26} r={shortEdge * 0.015} fill={svgPalette.ochreSoft} fillOpacity="0.24" />
      )}
    </svg>
  );
}
