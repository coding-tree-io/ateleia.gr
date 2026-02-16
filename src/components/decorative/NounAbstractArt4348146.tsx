import * as React from 'react';

import { NounLineArt, type NounLineArtVariant } from '@/components/decorative/NounLineArt';
import { nounSvgAbstract4348146 } from '@/components/decorative/noun-svg-source';

type NounAbstractArt4348146Props = {
  className?: string | undefined;
  variant?: NounLineArtVariant;
};

export function NounAbstractArt4348146({ className, variant = 'vivid' }: NounAbstractArt4348146Props) {
  return <NounLineArt className={className} variant={variant} definition={nounSvgAbstract4348146} dataComponent="noun-abstract-art-4348146" />;
}
