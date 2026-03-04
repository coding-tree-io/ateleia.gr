import { therapyPracticeWebsiteContent } from '@/content/therapy-practice-website-content';
import { AbstractFace, HandCircle } from '@/components/decorative/ArtShapes';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';

export function WhoIsItFor() {
  const { whoIsItFor } = therapyPracticeWebsiteContent;

  return (
    <section className="therapy-section-shell">
      <ParallaxLayer speed={0.15} className="absolute -right-8 -top-8 w-[180px] opacity-45 md:-right-16 md:-top-10 md:w-[430px] md:opacity-100">
        <AbstractFace />
      </ParallaxLayer>
      <ParallaxLayer speed={0.22} className="absolute left-[6%] top-[8%] w-14 opacity-55 md:left-[8%] md:top-[10%] md:w-24 md:opacity-100">
        <HandCircle />
      </ParallaxLayer>

      <div className="therapy-section-content-width grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <h2 className="therapy-section-heading">
          {whoIsItFor.title}
        </h2>

        <ul className="therapy-surface-soft-card space-y-5 p-6 md:p-9" role="list">
          {whoIsItFor.items.map((item) => (
            <li key={item} className="therapy-section-paragraph flex items-start gap-4">
              <span className="mt-2.5 flex size-2.5 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
              <span className="break-words">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
