import { Fragment } from 'react';

import { PaintedEdgeDivider } from '@/components/decorative/ArtShapes';
import { About } from '@/components/sections/About';
import { Benefits } from '@/components/sections/Benefits';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Navigation } from '@/components/sections/Navigation';
import { Resources } from '@/components/sections/Resources';
import { Services } from '@/components/sections/Services';
import { Trust } from '@/components/sections/Trust';
import { WhatIs } from '@/components/sections/WhatIs';
import { WhoIsItFor } from '@/components/sections/WhoIsItFor';

const topDividerClassName = 'painted-divider -mt-1 h-3 w-full opacity-28 md:h-10 md:opacity-60';
const sectionDividerClassName = 'painted-divider -mt-1 h-2 w-full opacity-22 md:h-8 md:opacity-55';
const sectionDividerInvertedClassName =
  'painted-divider -mt-1 h-2 w-full rotate-180 opacity-22 md:h-8 md:opacity-55';
const homePageSectionSequence = [
  { id: 'what-is', SectionComponent: WhatIs, dividerClassName: sectionDividerInvertedClassName },
  { id: 'benefits', SectionComponent: Benefits, dividerClassName: sectionDividerClassName },
  { id: 'who-is-it-for', SectionComponent: WhoIsItFor, dividerClassName: sectionDividerInvertedClassName },
  { id: 'how-it-works', SectionComponent: HowItWorks, dividerClassName: sectionDividerClassName },
  { id: 'trust', SectionComponent: Trust, dividerClassName: sectionDividerInvertedClassName },
  { id: 'about', SectionComponent: About, dividerClassName: sectionDividerClassName },
  { id: 'services', SectionComponent: Services, dividerClassName: sectionDividerInvertedClassName },
  { id: 'resources', SectionComponent: Resources, dividerClassName: sectionDividerClassName },
] as const;

export function HomePageScaffold() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground">
      <Navigation />
      <main className="relative overflow-x-clip overflow-y-visible">
        <Hero />
        <PaintedEdgeDivider className={topDividerClassName} />
        {homePageSectionSequence.map(({ id, SectionComponent, dividerClassName }) => (
          <Fragment key={id}>
            <SectionComponent />
            <PaintedEdgeDivider className={dividerClassName} />
          </Fragment>
        ))}

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
