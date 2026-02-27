import type { NounSvgDefinition } from '@/components/decorative/noun-svg-source';
import { cn } from '@/lib/utils';

export type NounLineArtVariant = 'minimal' | 'whisper' | 'vivid';

type NounLineArtProps = {
  className?: string | undefined;
  variant?: NounLineArtVariant;
  definition: NounSvgDefinition;
};

const variantFillOpacityByName: Record<NounLineArtVariant, number> = {
  minimal: 0.68,
  whisper: 0.82,
  vivid: 0.94,
};

export function NounLineArt({ className, variant = 'whisper', definition }: NounLineArtProps) {
  const fillOpacity = variantFillOpacityByName[variant];

  return (
    <svg
      viewBox={definition.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={cn('overflow-visible text-black mix-blend-multiply', className)}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <g fill="currentColor" fillOpacity={fillOpacity}>
        {definition.paths.map((pathData, pathIndex) => (
          <path key={`noun-path-${pathIndex}`} d={pathData} />
        ))}
      </g>
    </svg>
  );
}
