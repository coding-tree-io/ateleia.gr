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

      <div className="therapy-section-content-width grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-12">
        <div className="space-y-7 lg:pr-8">
          <h2 className="therapy-section-heading">
            {whatIs.title}
          </h2>

          <OrganicDivider className="h-4 w-44 sm:w-52" />

          <div className="therapy-surface-paper-card p-6 md:p-8">
            <p className="font-serif text-2xl leading-tight text-[var(--tone-ink)] md:text-3xl">
              «{whatIs.pullQuote.text}»
            </p>
            <p className="therapy-section-overline mt-4 text-[var(--tone-ochre)]">
              {whatIs.pullQuote.attribution}
            </p>
          </div>
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

          <aside className="therapy-surface-soft-card p-5 md:p-6">
            <p className="therapy-section-overline text-[var(--tone-teal)]">{whatIs.practiceNoteLabel}</p>
            <p className="therapy-section-supporting-copy mt-3">{whatIs.practiceNote}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
