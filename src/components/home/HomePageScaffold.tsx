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

export function HomePageScaffold() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navigation />
      <main>
        <Hero />
        <WhatIs />
        <Benefits />
        <WhoIsItFor />
        <HowItWorks />
        <Trust />
        <About />
        <Services />
        <Resources />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
