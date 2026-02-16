import {
  NounLineArt,
  type NounLineArtVariant,
} from '@/components/decorative/NounLineArt';
import { guidingLabyrinthNounSvgDefinition } from '@/components/decorative/noun-svg-source';

type GuidingLabyrinthIllustrationProps = {
  className?: string;
  variant?: NounLineArtVariant;
};

export function GuidingLabyrinthIllustration({
  className,
  variant = 'minimal',
}: GuidingLabyrinthIllustrationProps) {
  return (
    <NounLineArt
      className={className}
      variant={variant}
      definition={guidingLabyrinthNounSvgDefinition}
    />
  );
}
