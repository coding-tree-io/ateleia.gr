import * as React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

import { siteCopy } from '@/content/site-copy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { OrganicBlob1 } from '@/components/decorative/ArtShapes';

export function Contact() {
  return (
    <section id="contact" className="relative bg-secondary/50 px-5 py-16 md:px-8 md:py-24">
      <OrganicBlob1 className="absolute -right-32 bottom-0 w-96 text-accent" />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr]">
          {/* Left: info */}
          <div>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground text-balance md:text-4xl">
              {siteCopy.contact.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {siteCopy.contact.description}
            </p>

            {/* Direct contact */}
            <div className="mt-8 space-y-4">
              {siteCopy.contact.contactItems.map((item) => {
                const Icon = item.label === 'Email' ? Mail : Phone;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 text-base text-foreground transition-colors hover:text-primary"
                  >
                    <Icon className="size-5 shrink-0 text-accent" aria-hidden="true" />
                    <span className="font-medium">{item.value}</span>
                  </a>
                );
              })}

              {siteCopy.contact.addresses.map((addr, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                  <span>{addr}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs leading-relaxed text-muted-foreground/80">
              {siteCopy.contact.availabilityNote}
            </p>
          </div>

          {/* Right: form */}
          <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {siteCopy.contact.formLabels.name}
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Το ονοματεπώνυμό σας"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {siteCopy.contact.formLabels.email}
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="email@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {siteCopy.contact.formLabels.message}
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  placeholder="Γράψτε το μήνυμά σας..."
                  className="min-h-28"
                />
              </div>

              {/* Consent */}
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-1 size-4 shrink-0 rounded border-border accent-primary"
                />
                <span className="text-xs leading-relaxed text-muted-foreground">
                  {siteCopy.contact.formLabels.consent}
                </span>
              </label>

              <Button type="submit" className="w-full rounded-full">
                {siteCopy.contact.formLabels.submit}
              </Button>
            </form>

            <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground/70">
              {siteCopy.contact.privacyNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
