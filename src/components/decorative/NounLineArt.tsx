import { useId } from 'react';

import type { NounSvgDefinition } from '@/components/decorative/noun-svg-source';
import { therapyPracticeSiteBranding } from '@/config/site-branding';
import { cn } from '@/lib/utils';

export type NounLineArtVariant = 'minimal' | 'whisper' | 'vivid';

type NounLineArtProps = {
  className?: string | undefined;
  variant?: NounLineArtVariant;
  definition: NounSvgDefinition;
};

type NounIllustrationStyleProfile = {
  terracottaBlobOpacity: number;
  tealBlobOpacity: number;
  ochreBlobOpacity: number;
  accentDotOpacity: number;
  gradientStrokeOpacity: number;
  terracottaAccentStrokeOpacity: number;
  inkLineOpacity: number;
};

type ViewBoxMetrics = {
  minX: number;
  minY: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  shortestEdge: number;
};

type DecorativeCircle = {
  centerX: number;
  centerY: number;
  radius: number;
  fillColor: string;
  fillOpacity: number;
};

const nounIllustrationPalette = therapyPracticeSiteBranding.illustrationPalette;

const nounIllustrationStyleProfiles: Record<NounLineArtVariant, NounIllustrationStyleProfile> = {
  minimal: {
    terracottaBlobOpacity: 0,
    tealBlobOpacity: 0,
    ochreBlobOpacity: 0,
    accentDotOpacity: 0.08,
    gradientStrokeOpacity: 0,
    terracottaAccentStrokeOpacity: 0,
    inkLineOpacity: 0.74,
  },
  whisper: {
    terracottaBlobOpacity: 0.09,
    tealBlobOpacity: 0.08,
    ochreBlobOpacity: 0.06,
    accentDotOpacity: 0.16,
    gradientStrokeOpacity: 0.14,
    terracottaAccentStrokeOpacity: 0.12,
    inkLineOpacity: 0.6,
  },
  vivid: {
    terracottaBlobOpacity: 0.3,
    tealBlobOpacity: 0.26,
    ochreBlobOpacity: 0.22,
    accentDotOpacity: 0.34,
    gradientStrokeOpacity: 0.42,
    terracottaAccentStrokeOpacity: 0.26,
    inkLineOpacity: 0.73,
  },
};

function deriveViewBoxMetrics(viewBox: string): ViewBoxMetrics {
  const viewBoxValues = viewBox.trim().split(/\s+/);

  if (viewBoxValues.length !== 4) {
    throw new Error(`Invalid viewBox values: ${viewBox}`);
  }

  const minX = Number(viewBoxValues[0] ?? Number.NaN);
  const minY = Number(viewBoxValues[1] ?? Number.NaN);
  const width = Number(viewBoxValues[2] ?? Number.NaN);
  const height = Number(viewBoxValues[3] ?? Number.NaN);

  if (![minX, minY, width, height].every((value) => Number.isFinite(value))) {
    throw new Error(`Invalid viewBox values: ${viewBox}`);
  }

  return {
    minX,
    minY,
    width,
    height,
    centerX: minX + width / 2,
    centerY: minY + height / 2,
    shortestEdge: Math.min(width, height),
  };
}

function createBackgroundColorBlobs(
  metrics: ViewBoxMetrics,
  styleProfile: NounIllustrationStyleProfile
): DecorativeCircle[] {
  const { minX, minY, width, height, shortestEdge } = metrics;

  return [
    {
      centerX: minX + width * 0.28,
      centerY: minY + height * 0.34,
      radius: shortestEdge * 0.18,
      fillColor: nounIllustrationPalette.terracotta,
      fillOpacity: styleProfile.terracottaBlobOpacity,
    },
    {
      centerX: minX + width * 0.67,
      centerY: minY + height * 0.65,
      radius: shortestEdge * 0.23,
      fillColor: nounIllustrationPalette.teal,
      fillOpacity: styleProfile.tealBlobOpacity,
    },
    {
      centerX: minX + width * 0.74,
      centerY: minY + height * 0.35,
      radius: shortestEdge * 0.14,
      fillColor: nounIllustrationPalette.ochre,
      fillOpacity: styleProfile.ochreBlobOpacity,
    },
  ];
}

function createAccentDots(metrics: ViewBoxMetrics, dotOpacity: number): DecorativeCircle[] {
  const { minX, minY, width, height, shortestEdge } = metrics;

  return [
    {
      centerX: minX + width * 0.17,
      centerY: minY + height * 0.57,
      radius: shortestEdge * 0.024,
      fillColor: nounIllustrationPalette.tealSoft,
      fillOpacity: dotOpacity,
    },
    {
      centerX: minX + width * 0.39,
      centerY: minY + height * 0.22,
      radius: shortestEdge * 0.021,
      fillColor: nounIllustrationPalette.terracottaSoft,
      fillOpacity: dotOpacity,
    },
    {
      centerX: minX + width * 0.65,
      centerY: minY + height * 0.25,
      radius: shortestEdge * 0.02,
      fillColor: nounIllustrationPalette.ochreSoft,
      fillOpacity: dotOpacity,
    },
    {
      centerX: minX + width * 0.76,
      centerY: minY + height * 0.77,
      radius: shortestEdge * 0.022,
      fillColor: nounIllustrationPalette.terracotta,
      fillOpacity: dotOpacity,
    },
  ];
}

export function NounLineArt({ className, variant = 'whisper', definition }: NounLineArtProps) {
  const selectedStyleProfile = nounIllustrationStyleProfiles[variant];
  const gradientDefinitionIdentifier = `noun-line-art-gradient-${useId().replace(/:/g, '')}`;
  const viewBoxMetrics = deriveViewBoxMetrics(definition.viewBox);

  const backgroundColorBlobs = createBackgroundColorBlobs(viewBoxMetrics, selectedStyleProfile);
  const accentDots = createAccentDots(viewBoxMetrics, selectedStyleProfile.accentDotOpacity);
  const { minX, minY, width, height, centerX, centerY, shortestEdge } = viewBoxMetrics;

  return (
    <svg
      viewBox={definition.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('overflow-visible', className)}
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient
          id={gradientDefinitionIdentifier}
          x1={minX + width * 0.14}
          y1={minY + height * 0.18}
          x2={minX + width * 0.83}
          y2={minY + height * 0.84}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={nounIllustrationPalette.terracotta} />
          <stop offset="52%" stopColor={nounIllustrationPalette.teal} />
          <stop offset="100%" stopColor={nounIllustrationPalette.ochre} />
        </linearGradient>
      </defs>

      {backgroundColorBlobs.map((blob) => (
        <circle
          key={`${blob.centerX}-${blob.centerY}-${blob.fillColor}`}
          cx={blob.centerX}
          cy={blob.centerY}
          r={blob.radius}
          fill={blob.fillColor}
          fillOpacity={blob.fillOpacity}
        />
      ))}

      {accentDots.map((dot) => (
        <circle
          key={`${dot.centerX}-${dot.centerY}-${dot.fillColor}`}
          cx={dot.centerX}
          cy={dot.centerY}
          r={dot.radius}
          fill={dot.fillColor}
          fillOpacity={dot.fillOpacity}
        />
      ))}

      {definition.paths.map((pathData, pathIndex) => (
        <path
          key={`noun-path-ink-${pathIndex}`}
          d={pathData}
          fill="none"
          stroke={nounIllustrationPalette.ink}
          strokeWidth={shortestEdge * 0.0088}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={selectedStyleProfile.inkLineOpacity}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {selectedStyleProfile.gradientStrokeOpacity > 0 &&
        definition.paths.map((pathData, pathIndex) => (
          <path
            key={`noun-path-gradient-${pathIndex}`}
            d={pathData}
            fill="none"
            stroke={`url(#${gradientDefinitionIdentifier})`}
            strokeWidth={shortestEdge * 0.0078}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={selectedStyleProfile.gradientStrokeOpacity}
            vectorEffect="non-scaling-stroke"
          />
        ))}

      {selectedStyleProfile.terracottaAccentStrokeOpacity > 0 &&
        definition.paths.map((pathData, pathIndex) => (
          <path
            key={`noun-path-accent-${pathIndex}`}
            d={pathData}
            fill="none"
            stroke={nounIllustrationPalette.terracottaSoft}
            strokeWidth={shortestEdge * 0.0032}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={selectedStyleProfile.terracottaAccentStrokeOpacity}
            vectorEffect="non-scaling-stroke"
          />
        ))}

      {variant === 'minimal' && (
        <circle
          cx={centerX + width * 0.15}
          cy={centerY + height * 0.26}
          r={shortestEdge * 0.015}
          fill={nounIllustrationPalette.ochreSoft}
          fillOpacity="0.22"
        />
      )}
    </svg>
  );
}
