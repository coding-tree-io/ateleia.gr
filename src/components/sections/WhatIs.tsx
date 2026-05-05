import { therapyPracticeWebsiteContent } from '@/content/therapy-practice-website-content';
import { OrganicDivider, PaintSplashes } from '@/components/decorative/ArtShapes';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';

export function WhatIs() {
  const { whatIs } = therapyPracticeWebsiteContent;

  return (
    <section className="therapy-section-shell">
      <ParallaxLayer speed={0.1} className="absolute -right-12 top-4 w-[170px] opacity-45 md:-right-20 md:top-2 md:w-[460px] md:opacity-100">
        <PaintSplashes />
      </ParallaxLayer>

      <div className="therapy-section-content-width grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
        <div className="space-y-7 lg:pr-8">
          <h2 className="therapy-section-heading">
            {whatIs.title}
          </h2>

          <OrganicDivider className="h-4 w-44 sm:w-52" />
        </div>

        <div className="space-y-6">
          {whatIs.paragraphs.map((paragraph, index) => (
            <p
              key={`${index}-${paragraph.slice(0, 24)}`}
              className="therapy-section-paragraph"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
