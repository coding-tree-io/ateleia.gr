import * as React from 'react';

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

export function HomePageScaffold() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground">
      <Navigation />
      <main className="relative overflow-x-clip overflow-y-visible">
        <Hero />
        <PaintedEdgeDivider className="painted-divider -mt-1 h-6 w-full opacity-50 md:h-10 md:opacity-60" />

        <WhatIs />
        <PaintedEdgeDivider className="painted-divider -mt-1 h-5 w-full rotate-180 opacity-45 md:h-8 md:opacity-55" />

        <Benefits />
        <PaintedEdgeDivider className="painted-divider -mt-1 h-5 w-full opacity-45 md:h-8 md:opacity-55" />

        <WhoIsItFor />
        <PaintedEdgeDivider className="painted-divider -mt-1 h-5 w-full rotate-180 opacity-45 md:h-8 md:opacity-55" />

        <HowItWorks />
        <PaintedEdgeDivider className="painted-divider -mt-1 h-5 w-full opacity-45 md:h-8 md:opacity-55" />

        <Trust />
        <PaintedEdgeDivider className="painted-divider -mt-1 h-5 w-full rotate-180 opacity-45 md:h-8 md:opacity-55" />

        <About />
        <PaintedEdgeDivider className="painted-divider -mt-1 h-5 w-full opacity-45 md:h-8 md:opacity-55" />

        <Services />
        <PaintedEdgeDivider className="painted-divider -mt-1 h-5 w-full rotate-180 opacity-45 md:h-8 md:opacity-55" />

        <Resources />
        <PaintedEdgeDivider className="painted-divider -mt-1 h-5 w-full opacity-45 md:h-8 md:opacity-55" />

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
