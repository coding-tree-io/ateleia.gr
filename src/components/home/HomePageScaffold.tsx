import * as React from 'react';

import { Navigation } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/Hero';
import { WhatIs } from '@/components/sections/WhatIs';
import { Benefits } from '@/components/sections/Benefits';
import { WhoIsItFor } from '@/components/sections/WhoIsItFor';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Trust } from '@/components/sections/Trust';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Resources } from '@/components/sections/Resources';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { PaintedEdgeDivider } from '@/components/decorative/ArtShapes';

export function HomePageScaffold() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navigation />
      <main className="relative overflow-hidden">
        <Hero />
        <PaintedEdgeDivider className="painted-divider h-10 w-full -mt-1 opacity-60" />

        <WhatIs />
        <PaintedEdgeDivider className="painted-divider h-8 w-full -mt-1 rotate-180 opacity-55" />

        <Benefits />
        <PaintedEdgeDivider className="painted-divider h-8 w-full -mt-1 opacity-55" />

        <WhoIsItFor />
        <PaintedEdgeDivider className="painted-divider h-8 w-full -mt-1 rotate-180 opacity-55" />

        <HowItWorks />
        <PaintedEdgeDivider className="painted-divider h-8 w-full -mt-1 opacity-55" />

        <Trust />
        <PaintedEdgeDivider className="painted-divider h-8 w-full -mt-1 rotate-180 opacity-55" />

        <About />
        <PaintedEdgeDivider className="painted-divider h-8 w-full -mt-1 opacity-55" />

        <Services />
        <PaintedEdgeDivider className="painted-divider h-8 w-full -mt-1 rotate-180 opacity-55" />

        <Resources />
        <PaintedEdgeDivider className="painted-divider h-8 w-full -mt-1 opacity-55" />

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
