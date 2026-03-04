import { therapyPracticeWebsiteContent } from '@/content/therapy-practice-website-content';
import { AbstractFace, OrganicDivider } from '@/components/decorative/ArtShapes';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';

export function About() {
  const { about } = therapyPracticeWebsiteContent;

  return (
    <section id="about" className="therapy-section-shell">
      <ParallaxLayer speed={0.16} className="absolute -left-8 top-4 w-[170px] opacity-45 md:-left-20 md:top-2 md:w-[440px] md:opacity-100">
        <AbstractFace />
      </ParallaxLayer>

      <div className="therapy-section-content-width grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div>
          <h2 className="therapy-section-heading">
            {about.title}
          </h2>

          <OrganicDivider className="my-8 h-4 w-40 md:w-44" />

          <div className="space-y-5">
            {about.bio.map((paragraph, index) => (
              <p
                key={`${index}-${paragraph.slice(0, 24)}`}
                className="therapy-section-paragraph"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <blockquote className="therapy-surface-paper-card p-6 font-serif text-2xl leading-tight text-[var(--tone-ink)] md:p-8 md:text-[1.95rem]">
            «{about.pullQuote}»
          </blockquote>

          <div className="therapy-surface-soft-card p-6 md:p-8">
            <h3 className="font-serif text-2xl font-semibold text-foreground">{about.approach.title}</h3>
            <p className="therapy-section-supporting-copy mt-4">
              {about.approach.description}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
