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
    <section
      id="hero"
      className="relative overflow-hidden px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 md:px-10 md:pb-28 md:pt-28 lg:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 flex -translate-y-[14%] items-center justify-center sm:translate-y-0">
        <ConcentricRings className="w-[clamp(20rem,52vw,52rem)] opacity-[0.38] motion-safe:md:animate-slow-spin sm:opacity-[0.24] lg:opacity-[0.28]" />
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

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div className="self-end">
          <h1 className="animate-fade-up stagger-1 font-serif text-4xl font-bold leading-[1.08] tracking-tight text-balance text-foreground sm:text-5xl md:text-7xl">
            {hero.headline}
          </h1>

          <p className="animate-fade-up stagger-2 mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {hero.subheadline}
          </p>

          <div className="animate-fade-up stagger-3 mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full px-7 shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25 sm:w-auto"
            >
              <a href="#contact">{hero.primaryCta}</a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full rounded-full border-border/60 bg-card/75 px-7 text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-card hover:text-foreground hover:shadow-md sm:w-auto"
            >
              <a href="#contact">{hero.secondaryCta}</a>
            </Button>
          </div>
        </div>

        <aside className="relative mt-3 lg:mt-0">
          <div className="paper-panel rounded-[1.75rem] border border-border/45 p-6 md:animate-card-glow md:rounded-[2rem] md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--tone-teal)]">
              Therapeutic Atelier
            </p>
            <blockquote className="mt-4 font-serif text-[1.85rem] font-semibold leading-tight text-[var(--tone-ink)] md:text-[2.2rem]">
              «{whatIs.pullQuote.text}»
            </blockquote>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              {whatIs.practiceNote}
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">
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
