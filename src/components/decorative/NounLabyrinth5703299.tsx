import * as React from 'react';

import { NounLineArt, type NounLineArtVariant } from '@/components/decorative/NounLineArt';
import { nounSvgLabyrinth5703299 } from '@/components/decorative/noun-svg-source';

type NounLabyrinth5703299Props = {
  className?: string | undefined;
  variant?: NounLineArtVariant;
};

export function NounLabyrinth5703299({ className, variant = 'minimal' }: NounLabyrinth5703299Props) {
  return <NounLineArt className={className} variant={variant} definition={nounSvgLabyrinth5703299} dataComponent="noun-labyrinth-5703299" />;
}
