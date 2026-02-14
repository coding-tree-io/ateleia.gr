import * as React from 'react';
import { Clock, MapPin, Users, ChevronDown } from 'lucide-react';

import { siteCopy } from '@/content/site-copy';
import { Button } from '@/components/ui/button';
import { CanvasBrush, ConcentricRings, PaintSplashes } from '@/components/decorative/ArtShapes';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';
import { useReveal } from '@/hooks/use-reveal';

function ServiceCard({ service }: { service: (typeof siteCopy.services)[number] }) {
  return (
    <article className="reveal-child group paper-panel flex flex-col rounded-3xl border border-border/45 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl md:p-9">
      <h3 className="font-serif text-2xl font-bold text-foreground md:text-3xl">{service.title}</h3>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{service.description}</p>

      <div className="mt-7 space-y-3">
        <div className="flex items-start gap-3 text-sm text-muted-foreground">
          <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/25 text-[var(--tone-ink)]">
            <Users className="size-3.5" aria-hidden="true" />
          </div>
          <span>
            <span className="font-semibold text-foreground">{'Ιδανικό για: '}</span>
            {service.idealFor}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/25 text-[var(--tone-ink)]">
            <Clock className="size-3.5" aria-hidden="true" />
          </div>
          <span>
            {service.format}
            {' / '}
            {service.duration}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/25 text-[var(--tone-ink)]">
            <MapPin className="size-3.5" aria-hidden="true" />
          </div>
          <span>{service.location}</span>
        </div>
      </div>

      <div className="mt-7 rounded-2xl border border-border/40 bg-secondary/55 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Τι να περιμένετε</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.whatToExpect}</p>
      </div>
    </article>
  );
}

function FaqAccordion() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="reveal mt-20">
      <h3 className="font-serif text-2xl font-bold text-foreground md:text-3xl">{siteCopy.faqTitle}</h3>
      <div className="mt-8 space-y-3">
        {siteCopy.faqItems.map((item) => (
          <details
            key={item.question}
            className="reveal-child group rounded-2xl border border-border/40 bg-card/70 backdrop-blur-sm transition-all duration-300 hover:shadow-sm open:shadow-md"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown
                className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="px-6 pb-5">
              <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  const ref = useReveal<HTMLElement>();
  const [emailContact, phoneContact] = siteCopy.contact.contactItems;

  return (
    <section id="services" ref={ref} className="reveal relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <ParallaxLayer speed={0.18} className="absolute -right-32 -top-24 w-[560px] md:w-[660px]">
        <ConcentricRings />
      </ParallaxLayer>
      <ParallaxLayer speed={0.12} className="absolute -left-24 top-[8%] hidden w-[300px] lg:block">
        <CanvasBrush />
      </ParallaxLayer>
      <ParallaxLayer speed={0.24} className="absolute -left-24 bottom-[-16%] w-[400px] md:w-[520px]">
        <PaintSplashes />
      </ParallaxLayer>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-7 lg:grid-cols-[1.04fr_0.96fr] lg:items-end">
          <h2 className="font-serif text-3xl font-bold leading-tight text-foreground text-balance md:text-4xl lg:text-5xl">
            {siteCopy.servicesTitle}
          </h2>
          <p className="rounded-2xl border border-border/45 bg-card/70 p-5 text-sm leading-relaxed text-muted-foreground backdrop-blur-sm md:text-base">
            {siteCopy.trust.pullQuote}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {siteCopy.services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        <FaqAccordion />

        <div className="paper-panel mt-20 flex flex-col items-center gap-5 rounded-3xl border border-border/45 p-8 text-center md:p-12">
          <h3 className="font-serif text-2xl font-bold text-foreground md:text-3xl">{'Έτοιμοι να ξεκινήσετε;'}</h3>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            {'Επικοινωνήστε μαζί μου για να προγραμματίσουμε μια πρώτη γνωριμία.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/30">
              <a href="#contact">{'Κλείστε ραντεβού'}</a>
            </Button>
            {emailContact && (
              <Button asChild variant="outline" size="lg" className="rounded-full border-border/60 bg-card/60 px-8 transition-all duration-300 hover:border-accent">
                <a href={`mailto:${emailContact.value}`}>{emailContact.value}</a>
              </Button>
            )}
            {phoneContact && (
              <Button asChild variant="outline" size="lg" className="rounded-full border-border/60 bg-card/60 px-8 transition-all duration-300 hover:border-accent">
                <a href={phoneContact.href}>{phoneContact.value}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
