import * as React from 'react';
import { Clock, MapPin, Users, ChevronDown } from 'lucide-react';

import { siteCopy } from '@/content/site-copy';
import { Button } from '@/components/ui/button';
import { ConcentricRings } from '@/components/decorative/ArtShapes';
import { useReveal } from '@/hooks/use-reveal';

function ServiceCard({ service }: { service: (typeof siteCopy.services)[number] }) {
  return (
    <div className="reveal-child group flex flex-col rounded-3xl border border-border/30 bg-card/80 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 md:p-9">
      <h3 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
        {service.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      <div className="mt-7 space-y-3">
        <div className="flex items-start gap-3 text-sm text-muted-foreground">
          <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Users className="size-3.5" aria-hidden="true" />
          </div>
          <span><span className="font-semibold text-foreground">{'Ιδανικό για: '}</span>{service.idealFor}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Clock className="size-3.5" aria-hidden="true" />
          </div>
          <span>{service.format}{' / '}{service.duration}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <MapPin className="size-3.5" aria-hidden="true" />
          </div>
          <span>{service.location}</span>
        </div>
      </div>

      <div className="mt-7 rounded-2xl bg-secondary/60 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Τι να περιμένετε
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {service.whatToExpect}
        </p>
      </div>
    </div>
  );
}

function FaqAccordion() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="reveal mt-20">
      <h3 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
        {siteCopy.faqTitle}
      </h3>
      <div className="mt-8 space-y-3">
        {siteCopy.faqItems.map((item) => (
          <details
            key={item.question}
            className="reveal-child group rounded-2xl border border-border/30 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-sm open:shadow-md"
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

  return (
    <section id="services" ref={ref} className="reveal relative overflow-hidden px-6 py-20 md:px-10 md:py-28" style={{ background: 'linear-gradient(180deg, var(--secondary) 0%, var(--background) 100%)' }}>
      <ConcentricRings className="absolute -right-32 -top-32 w-[500px] text-primary animate-slow-spin md:w-[600px]" />

      <div className="relative mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl font-bold leading-tight text-foreground text-balance md:text-4xl lg:text-5xl">
          {siteCopy.servicesTitle}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {siteCopy.services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        <FaqAccordion />

        {/* CTA block */}
        <div className="mt-20 flex flex-col items-center gap-5 rounded-3xl border border-border/30 bg-card/80 p-8 text-center backdrop-blur-sm md:p-12">
          <h3 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            {'Έτοιμοι να ξεκινήσετε;'}
          </h3>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            {'Επικοινωνήστε μαζί μου για να προγραμματίσουμε μια πρώτη γνωριμία.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/10">
              <a href="#contact">{'Κλείστε ραντεβού'}</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-border/60 px-8">
              <a href={`mailto:${siteCopy.contact.contactItems[0].value}`}>
                {siteCopy.contact.contactItems[0].value}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-border/60 px-8">
              <a href={siteCopy.contact.contactItems[1].href}>
                {siteCopy.contact.contactItems[1].value}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
