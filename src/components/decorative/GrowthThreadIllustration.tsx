import {
  NounLineArt,
  type NounLineArtVariant,
} from '@/components/decorative/NounLineArt';
import { growthThreadNounSvgDefinition } from '@/components/decorative/noun-svg-source';

type GrowthThreadIllustrationProps = {
  className?: string;
  variant?: NounLineArtVariant;
};

export function GrowthThreadIllustration({
  className,
  variant = 'vivid',
}: GrowthThreadIllustrationProps) {
  return (
    <NounLineArt
      className={className}
      variant={variant}
      definition={growthThreadNounSvgDefinition}
    />
  );
}
