import { ShieldCheck } from 'lucide-react';

import { therapyPracticeWebsiteContent } from '@/content/therapy-practice-website-content';

export function Trust() {
  const { trust } = therapyPracticeWebsiteContent;

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
            {trust.title}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{trust.intro}</p>
        </div>

        <div
          className="no-scrollbar mt-8 overflow-x-auto pb-2 outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2"
          role="region"
          aria-label="Σημεία εμπιστοσύνης"
          tabIndex={0}
        >
          <div className="flex w-max gap-4 pr-6">
            {trust.markers.map((marker) => (
              <article
                key={marker.title}
                className="paper-panel min-w-[17.5rem] max-w-[17.5rem] rounded-3xl border border-border/45 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg md:min-w-[19rem] md:max-w-[19rem]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent/25 text-[var(--tone-ink)]">
                    <ShieldCheck className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{marker.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{marker.description}</p>
              </article>
            ))}
          </div>
        </div>

        <blockquote className="mt-8 rounded-2xl border border-border/45 bg-card/70 p-6 text-base leading-relaxed text-[var(--tone-ink)] md:text-lg">
          «{trust.pullQuote}»
        </blockquote>
      </div>
    </section>
  );
}
