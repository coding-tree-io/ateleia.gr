import {
  BotanicalCluster,
  ConcentricRings,
  DancingFigures,
  HandCircle,
  PaintSplashes,
} from '@/components/decorative/ArtShapes';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';
import { Button } from '@/components/ui/button';
import { therapyPracticeWebsiteContent } from '@/content/therapy-practice-website-content';

export function Hero() {
  const { hero, whatIs } = therapyPracticeWebsiteContent;

  return (
    <section id="hero" className="therapy-hero-section-shell">
      <div className="pointer-events-none absolute inset-0 flex -translate-y-[14%] items-center justify-center sm:translate-y-0">
        <ConcentricRings className="therapy-decorative-animation-slow-spin w-[clamp(20rem,52vw,52rem)] opacity-[0.38] sm:opacity-[0.24] lg:opacity-[0.28]" />
      </div>

      <ParallaxLayer
        speed={0.08}
        className="pointer-events-none absolute left-[-14%] top-[-8%] w-[clamp(14rem,38vw,42rem)] opacity-60 lg:left-[-10%] lg:top-[-12%] lg:opacity-95"
      >
        <BotanicalCluster />
      </ParallaxLayer>

      <ParallaxLayer
        speed={0.2}
        className="pointer-events-none absolute bottom-[-24%] right-[-16%] w-[clamp(16rem,42vw,48rem)] opacity-55 lg:bottom-[-20%] lg:right-[-12%] lg:opacity-95"
      >
        <DancingFigures />
      </ParallaxLayer>

      <ParallaxLayer
        speed={0.28}
        className="pointer-events-none absolute left-[62%] top-[14%] w-[clamp(4.8rem,12vw,16rem)] opacity-45 sm:left-[60%] sm:top-[12%] lg:left-[58%] lg:top-[13%] lg:opacity-85"
      >
        <PaintSplashes />
      </ParallaxLayer>

      <div className="therapy-section-content-width grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div className="self-end">
          <h1 className="therapy-hero-heading">
            {hero.headline}
          </h1>

          <p className="therapy-hero-summary mt-6">
            {hero.subheadline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button
              asChild
              size="lg"
              className="therapy-primary-call-to-action w-full px-7 sm:w-auto"
            >
              <a href="#contact">{hero.primaryCta}</a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="therapy-secondary-call-to-action w-full px-7 sm:w-auto"
            >
              <a href="#contact">{hero.secondaryCta}</a>
            </Button>
          </div>
        </div>

        <aside className="relative mt-3 lg:mt-0">
          <div className="therapy-surface-attention-glow-animation therapy-surface-paper-card rounded-[1.75rem] p-6 md:rounded-[2rem] md:p-10">
            <p className="therapy-section-overline tracking-[0.16em] text-[var(--tone-teal)]">
              {hero.spotlightEyebrow}
            </p>
            <blockquote className="mt-4 font-serif text-[1.85rem] font-semibold leading-tight text-[var(--tone-ink)] md:text-[2.2rem]">
              «{whatIs.pullQuote.text}»
            </blockquote>
            <p className="therapy-section-supporting-copy mt-5">
              {whatIs.practiceNote}
            </p>
            <p className="therapy-section-overline mt-4 text-primary/80">
              {whatIs.pullQuote.attribution}
            </p>
          </div>

          <ParallaxLayer
            speed={0.3}
            className="pointer-events-none absolute -bottom-8 -left-8 w-[clamp(3.75rem,7vw,6rem)] opacity-70"
          >
            <HandCircle />
          </ParallaxLayer>
        </aside>
      </div>
    </section>
  );
}
