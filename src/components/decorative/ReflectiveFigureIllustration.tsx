import {
  NounLineArt,
  type NounLineArtVariant,
} from '@/components/decorative/NounLineArt';
import { reflectiveFigureNounSvgDefinition } from '@/components/decorative/noun-svg-source';

export type ReflectiveFigureIllustrationVariant = NounLineArtVariant;

type ReflectiveFigureIllustrationProps = {
  className?: string;
  variant?: ReflectiveFigureIllustrationVariant;
};

export function ReflectiveFigureIllustration({
  className,
  variant = 'whisper',
}: ReflectiveFigureIllustrationProps) {
  return (
    <NounLineArt
      className={className}
      variant={variant}
      definition={reflectiveFigureNounSvgDefinition}
    />
  );
}
