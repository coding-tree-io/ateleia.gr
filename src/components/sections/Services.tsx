import { ChevronDown, Clock, MapPin, Users } from 'lucide-react';

import { ConcentricRings, PaintSplashes } from '@/components/decorative/ArtShapes';
import { GrowthThreadIllustration } from '@/components/decorative/GrowthThreadIllustration';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';
import { Button } from '@/components/ui/button';
import {
  therapyPracticeWebsiteContent,
  type ContactChannel,
  type TherapyServiceOffering,
} from '@/content/therapy-practice-website-content';

type TherapyServiceCardProps = {
  therapyServiceOffering: TherapyServiceOffering;
};

function TherapyServiceCard({ therapyServiceOffering }: TherapyServiceCardProps) {
  return (
    <article className="group paper-panel flex flex-col rounded-3xl border border-border/45 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:p-9">
      <h3 className="break-words font-serif text-2xl font-bold text-foreground md:text-3xl">
        {therapyServiceOffering.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        {therapyServiceOffering.description}
      </p>

      <div className="mt-7 space-y-3">
        <div className="flex items-start gap-3 text-sm text-muted-foreground">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/25 text-[var(--tone-ink)]">
            <Users className="size-4" aria-hidden="true" />
          </div>
          <span>
            <span className="font-semibold text-foreground">{'Ιδανικό για: '}</span>
            {therapyServiceOffering.idealFor}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/25 text-[var(--tone-ink)]">
            <Clock className="size-4" aria-hidden="true" />
          </div>
          <span>
            {therapyServiceOffering.format}
            {' / '}
            {therapyServiceOffering.duration}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/25 text-[var(--tone-ink)]">
            <MapPin className="size-4" aria-hidden="true" />
          </div>
          <span>{therapyServiceOffering.location}</span>
        </div>
      </div>

      <div className="mt-7 rounded-2xl border border-border/40 bg-secondary/55 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Τι να περιμένετε</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {therapyServiceOffering.whatToExpect}
        </p>
      </div>
    </article>
  );
}

function FrequentlyAskedQuestionsSection() {
  const { frequentlyAskedQuestionsTitle, frequentlyAskedQuestions } = therapyPracticeWebsiteContent;

  return (
    <div className="mt-16 md:mt-20">
      <h3 className="font-serif text-2xl font-bold text-foreground md:text-3xl">{frequentlyAskedQuestionsTitle}</h3>

      <div className="mt-8 space-y-3">
        {frequentlyAskedQuestions.map((frequentlyAskedQuestion) => (
          <details
            key={frequentlyAskedQuestion.question}
            className="group rounded-2xl border border-border/40 bg-card/70 transition-all duration-300 hover:shadow-sm open:shadow-md"
          >
            <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 px-5 py-3 text-base font-semibold text-foreground [&::-webkit-details-marker]:hidden md:px-6 md:py-4">
              {frequentlyAskedQuestion.question}
              <ChevronDown
                className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="px-5 pb-4 md:px-6 md:pb-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {frequentlyAskedQuestion.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function findFirstContactChannelByHrefPrefix(
  contactChannels: readonly ContactChannel[],
  hrefPrefix: string
): ContactChannel | undefined {
  return contactChannels.find((contactChannel) => contactChannel.href.startsWith(hrefPrefix));
}

export function Services() {
  const {
    servicesTitle,
    services,
    trust: { pullQuote: trustPullQuote },
    contact: { contactItems: contactChannels },
    hero: { primaryCta: primaryContactCallToActionLabel },
  } = therapyPracticeWebsiteContent;

  const emailContactChannel = findFirstContactChannelByHrefPrefix(contactChannels, 'mailto:');
  const telephoneContactChannel = findFirstContactChannelByHrefPrefix(contactChannels, 'tel:');

  return (
    <section
      id="services"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28"
    >
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

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-7 lg:grid-cols-[1.04fr_0.96fr] lg:items-end">
          <h2 className="font-serif text-3xl font-bold leading-tight text-balance text-foreground md:text-4xl lg:text-5xl">
            {servicesTitle}
          </h2>
          <p className="rounded-2xl border border-border/45 bg-card/70 p-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            {trustPullQuote}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
          {services.map((therapyServiceOffering) => (
            <TherapyServiceCard
              key={therapyServiceOffering.title}
              therapyServiceOffering={therapyServiceOffering}
            />
          ))}
        </div>

        <FrequentlyAskedQuestionsSection />

        <div className="paper-panel mt-16 flex flex-col items-center gap-5 rounded-3xl border border-border/45 p-7 text-center md:mt-20 md:p-12">
          <h3 className="font-serif text-2xl font-bold text-foreground md:text-3xl">{'Έτοιμοι να ξεκινήσετε;'}</h3>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            {'Επικοινωνήστε μαζί μου για να προγραμματίσουμε μια πρώτη γνωριμία.'}
          </p>
          <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/30 sm:w-auto"
            >
              <a href="#contact">{primaryContactCallToActionLabel}</a>
            </Button>

            {emailContactChannel && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full rounded-full border-border/60 bg-card/60 transition-all duration-300 hover:border-accent sm:w-auto"
              >
                <a href={emailContactChannel.href}>{emailContactChannel.value}</a>
              </Button>
            )}

            {telephoneContactChannel && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full rounded-full border-border/60 bg-card/60 transition-all duration-300 hover:border-accent sm:w-auto"
              >
                <a href={telephoneContactChannel.href}>{telephoneContactChannel.value}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
