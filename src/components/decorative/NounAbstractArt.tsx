import * as React from 'react';

import { NounLineArt, type NounLineArtVariant } from '@/components/decorative/NounLineArt';
import { nounSvgAbstract4348166 } from '@/components/decorative/noun-svg-source';

export type NounAbstractArtVariant = NounLineArtVariant;

type NounAbstractArtProps = {
  className?: string | undefined;
  variant?: NounAbstractArtVariant;
};

export function NounAbstractArt({ className, variant = 'whisper' }: NounAbstractArtProps) {
  return <NounLineArt className={className} variant={variant} definition={nounSvgAbstract4348166} dataComponent="noun-abstract-art-4348166" />;
}
