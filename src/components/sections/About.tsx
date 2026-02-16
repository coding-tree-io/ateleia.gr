import { therapyPracticeWebsiteContent } from '@/content/therapy-practice-website-content';
import { AbstractFace, OrganicDivider } from '@/components/decorative/ArtShapes';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';

export function About() {
  const { about } = therapyPracticeWebsiteContent;

  return (
    <section id="about" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28">
      <ParallaxLayer speed={0.16} className="absolute -left-8 top-4 w-[170px] opacity-45 md:-left-20 md:top-2 md:w-[440px] md:opacity-100">
        <AbstractFace />
      </ParallaxLayer>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div>
          <h2 className="font-serif text-3xl font-bold leading-tight text-balance text-foreground md:text-4xl lg:text-5xl">
            {about.title}
          </h2>

          <OrganicDivider className="my-8 h-4 w-40 md:w-44" />

          <div className="space-y-5">
            {about.bio.map((paragraph, index) => (
              <p
                key={`${index}-${paragraph.slice(0, 24)}`}
                className="text-base leading-[1.78] text-muted-foreground md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <blockquote className="paper-panel rounded-3xl border border-border/45 p-6 font-serif text-2xl leading-tight text-[var(--tone-ink)] md:p-8 md:text-[1.95rem]">
            «{about.pullQuote}»
          </blockquote>

          <div className="rounded-3xl border border-border/45 bg-card/70 p-6 md:p-8">
            <h3 className="font-serif text-2xl font-semibold text-foreground">{about.values.title}</h3>
            <div className="mt-5 grid gap-3">
              {about.values.items.map((value) => (
                <article
                  key={value.title}
                  className="rounded-2xl border border-border/45 bg-secondary/45 p-4 transition-colors duration-300 hover:bg-secondary/70"
                >
                  <h4 className="text-sm font-semibold text-foreground">{value.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border/45 bg-card/70 p-6 md:p-8">
            <h3 className="font-serif text-2xl font-semibold text-foreground">{about.approach.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {about.approach.description}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
