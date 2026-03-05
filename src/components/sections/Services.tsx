import { Clock, Users } from 'lucide-react';

import { ConcentricRings, PaintSplashes } from '@/components/decorative/ArtShapes';
import { GrowthThreadIllustration } from '@/components/decorative/GrowthThreadIllustration';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import type { TherapyService } from '@/content/services';
import { therapyPracticeWebsiteContent } from '@/content/therapy-practice-website-content';

type TherapyServiceCardProps = {
  service: TherapyService;
};

type ServicesProps = {
  services: TherapyService[];
};

function TherapyServiceCard({ service }: TherapyServiceCardProps) {
  const {
    servicesSection: { audienceLabel, expectationsLabel },
  } = therapyPracticeWebsiteContent;
  const serviceMeta = [service.format, service.duration].filter(Boolean).join(' / ');

  return (
    <Card asChild className="therapy-surface-paper-card-interactive group">
      <article className="flex flex-col p-6 md:p-9">
        <h3 className="break-words font-serif text-2xl font-bold text-foreground md:text-3xl">{service.title}</h3>
        <p className="therapy-section-paragraph mt-4">{service.description}</p>

        <div className="mt-7 space-y-3">
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/25 text-[var(--tone-ink)]">
              <Users className="size-4" aria-hidden="true" />
            </div>
            <span>
              <span className="font-semibold text-foreground">{`${audienceLabel}: `}</span>
              {service.idealFor.join(' · ')}
            </span>
          </div>

          {serviceMeta ? (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/25 text-[var(--tone-ink)]">
                <Clock className="size-4" aria-hidden="true" />
              </div>
              <span>{serviceMeta}</span>
            </div>
          ) : null}
        </div>

        {service.whatToExpect.length > 0 ? (
          <Card asChild className="therapy-surface-supporting-card mt-7 p-5">
            <div>
              <p className="therapy-section-overline tracking-widest text-muted-foreground">{expectationsLabel}</p>
              <ul className="therapy-section-supporting-copy mt-3 space-y-2">
                {service.whatToExpect.map((item: string) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="pt-1 text-[var(--tone-ink)]">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ) : null}
      </article>
    </Card>
  );
}

function FrequentlyAskedQuestionsSection() {
  const { frequentlyAskedQuestionsTitle, frequentlyAskedQuestions } = therapyPracticeWebsiteContent;

  return (
    <div className="mt-16 md:mt-20">
      <h3 className="font-serif text-2xl font-bold text-foreground md:text-3xl">{frequentlyAskedQuestionsTitle}</h3>

      <Accordion type="multiple" className="mt-8 space-y-3">
        {frequentlyAskedQuestions.map((frequentlyAskedQuestion) => (
          <AccordionItem
            key={frequentlyAskedQuestion.question}
            value={frequentlyAskedQuestion.question}
            className="therapy-surface-expandable-card group border-0"
          >
            <AccordionTrigger className="min-h-11 cursor-pointer px-5 py-3 text-base font-semibold text-foreground hover:no-underline md:px-6 md:py-4">
              {frequentlyAskedQuestion.question}
            </AccordionTrigger>
            <AccordionContent className="px-5 md:px-6 md:pb-5">
              <p className="therapy-section-supporting-copy">
                {frequentlyAskedQuestion.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function Services({ services }: ServicesProps) {
  const { servicesTitle } = therapyPracticeWebsiteContent;

  return (
    <section id="services" className="therapy-section-shell">
      <ParallaxLayer
        speed={0.18}
        className="absolute -right-16 -top-16 w-[260px] opacity-45 md:-right-32 md:-top-24 md:w-[660px] md:opacity-100"
      >
        <ConcentricRings />
      </ParallaxLayer>
      <ParallaxLayer
        speed={0.12}
        className="absolute -left-10 top-[7%] w-[120px] opacity-50 md:-left-24 md:w-[300px] md:opacity-100"
      >
        <GrowthThreadIllustration variant="vivid" />
      </ParallaxLayer>
      <ParallaxLayer
        speed={0.24}
        className="absolute -left-14 bottom-[-14%] w-[220px] opacity-45 md:-left-24 md:bottom-[-16%] md:w-[520px] md:opacity-100"
      >
        <PaintSplashes />
      </ParallaxLayer>

      <div className="therapy-section-content-width">
        <div className="max-w-3xl">
          <h2 className="therapy-section-heading">
            {servicesTitle}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
          {services.map((service) => (
            <TherapyServiceCard key={service.id} service={service} />
          ))}
        </div>

        <FrequentlyAskedQuestionsSection />
      </div>
    </section>
  );
}
