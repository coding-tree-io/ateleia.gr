import * as React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

import { siteCopy } from '@/content/site-copy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PaintSplashes } from '@/components/decorative/ArtShapes';
import { useReveal } from '@/hooks/use-reveal';

export function Contact() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="contact" ref={ref} className="reveal relative overflow-hidden px-6 py-20 md:px-10 md:py-28" style={{ background: 'linear-gradient(180deg, var(--secondary) 0%, var(--background) 100%)' }}>
      <PaintSplashes className="absolute -right-24 top-0 w-[500px] text-accent animate-gentle-float" />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          {/* Left: info */}
          <div>
            <h2 className="font-serif text-3xl font-bold leading-tight text-foreground text-balance md:text-4xl lg:text-5xl">
              {siteCopy.contact.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              {siteCopy.contact.description}
            </p>

            {/* Direct contact */}
            <div className="mt-10 space-y-5">
              {siteCopy.contact.contactItems.map((item) => {
                const Icon = item.label === 'Email' ? Mail : Phone;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-4 text-base text-foreground transition-colors duration-300 hover:text-primary"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <span className="font-semibold">{item.value}</span>
                  </a>
                );
              })}

              {siteCopy.contact.addresses.map((addr, i) => (
                <div key={i} className="flex items-start gap-4 text-sm text-muted-foreground">
                  <div className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <MapPin className="size-5" aria-hidden="true" />
                  </div>
                  <span className="pt-2.5">{addr}</span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs leading-relaxed text-muted-foreground/70">
              {siteCopy.contact.availabilityNote}
            </p>
          </div>

          {/* Right: form */}
          <div className="rounded-3xl border border-border/30 bg-card/90 p-7 shadow-lg shadow-primary/5 backdrop-blur-sm md:p-9">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                >
                  {siteCopy.contact.formLabels.name}
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Το ονοματεπώνυμό σας"
                  className="rounded-xl border-border/40 bg-background/60"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
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
                  className="rounded-xl border-border/40 bg-background/60"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                >
                  {siteCopy.contact.formLabels.message}
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  placeholder="Γράψτε το μήνυμά σας..."
                  className="min-h-32 rounded-xl border-border/40 bg-background/60"
                />
              </div>

              {/* Consent */}
              <label className="flex cursor-pointer items-start gap-3">
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

              <Button type="submit" className="w-full rounded-full py-6 text-base shadow-lg shadow-primary/10 transition-shadow hover:shadow-xl hover:shadow-primary/20">
                {siteCopy.contact.formLabels.submit}
              </Button>
            </form>

            <p className="mt-5 text-center text-[11px] leading-relaxed text-muted-foreground/60">
              {siteCopy.contact.privacyNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
