import { therapyPracticeWebsiteContent } from '@/content/therapy-practice-website-content';
import { AbstractFace, HandCircle } from '@/components/decorative/ArtShapes';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';

export function WhoIsItFor() {
  const { whoIsItFor } = therapyPracticeWebsiteContent;

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28">
      <ParallaxLayer speed={0.15} className="absolute -right-8 -top-8 w-[180px] opacity-45 md:-right-16 md:-top-10 md:w-[430px] md:opacity-100">
        <AbstractFace />
      </ParallaxLayer>
      <ParallaxLayer speed={0.22} className="absolute left-[6%] top-[8%] w-14 opacity-55 md:left-[8%] md:top-[10%] md:w-24 md:opacity-100">
        <HandCircle />
      </ParallaxLayer>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <h2 className="font-serif text-3xl font-bold leading-tight text-balance text-foreground md:text-4xl lg:text-5xl">
          {whoIsItFor.title}
        </h2>

        <ul className="space-y-5 rounded-3xl border border-border/45 bg-card/72 p-6 md:p-9" role="list">
          {whoIsItFor.items.map((item) => (
            <li key={item} className="flex items-start gap-4 text-base leading-relaxed text-muted-foreground">
              <span className="mt-2.5 flex size-2.5 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
              <span className="break-words md:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
