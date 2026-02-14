import * as React from 'react';
import { Clock, MapPin, Users, ChevronDown } from 'lucide-react';

import { siteCopy } from '@/content/site-copy';
import { Button } from '@/components/ui/button';
import { DotCluster } from '@/components/decorative/ArtShapes';

function ServiceCard({ service }: { service: (typeof siteCopy.services)[number] }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border/50 bg-card p-6 md:p-8">
      <h3 className="font-serif text-2xl font-semibold text-foreground">
        {service.title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      <div className="mt-6 space-y-3">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <Users className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
          <span><span className="font-medium text-foreground">{'Ιδανικό για: '}</span>{service.idealFor}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4 shrink-0 text-accent" aria-hidden="true" />
          <span>{service.format}{' / '}{service.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-accent" aria-hidden="true" />
          <span>{service.location}</span>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-secondary/50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Τι να περιμένετε
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {service.whatToExpect}
        </p>
      </div>
    </div>
  );
}

function FaqAccordion() {
  return (
    <div className="mt-16">
      <h3 className="font-serif text-2xl font-semibold text-foreground">
        {siteCopy.faqTitle}
      </h3>
      <div className="mt-6 space-y-2">
        {siteCopy.faqItems.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-border/50 bg-card transition-shadow hover:shadow-sm"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-foreground">
              {item.question}
              <ChevronDown
                className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="px-5 pb-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative bg-secondary/50 px-5 py-16 md:px-8 md:py-24">
      <DotCluster className="absolute left-6 top-10 w-20 text-primary" />

      <div className="relative mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground text-balance md:text-4xl">
          {siteCopy.servicesTitle}
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {siteCopy.services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        <FaqAccordion />

        {/* CTA block */}
        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-border/40 bg-card p-8 text-center md:p-10">
          <h3 className="font-serif text-2xl font-semibold text-foreground">
            {'Έτοιμοι να ξεκινήσετε;'}
          </h3>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            {'Επικοινωνήστε μαζί μου για να προγραμματίσουμε μια πρώτη γνωριμία.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-7">
              <a href="#contact">{'Κλείστε ραντεβού'}</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-7">
              <a href={`mailto:${siteCopy.contact.contactItems[0].value}`}>
                {siteCopy.contact.contactItems[0].value}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-7">
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
