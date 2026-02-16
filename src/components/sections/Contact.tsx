import { Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';

import { BotanicalCluster } from '@/components/decorative/ArtShapes';
import { GuidingLabyrinthIllustration } from '@/components/decorative/GuidingLabyrinthIllustration';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { therapyPracticeWebsiteContent } from '@/content/therapy-practice-website-content';

function selectContactChannelIconByHref(contactChannelHref: string): LucideIcon {
  if (contactChannelHref.startsWith('mailto:')) {
    return Mail;
  }

  return Phone;
}

export function Contact() {
  const {
    title,
    description,
    contactItems,
    addresses,
    availabilityNote,
    privacyNote,
    mapPlaceholder,
    formLabels,
  } = therapyPracticeWebsiteContent.contact;

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28"
    >
      <ParallaxLayer
        speed={0.16}
        className="absolute -right-10 -top-6 w-[220px] opacity-45 md:-right-24 md:-top-8 md:w-[560px] md:opacity-100"
      >
        <BotanicalCluster />
      </ParallaxLayer>
      <ParallaxLayer
        speed={0.09}
        className="pointer-events-none absolute -left-8 bottom-[-8%] w-[132px] opacity-45 md:-left-10 md:bottom-[-10%] md:w-[320px] md:opacity-50"
      >
        <GuidingLabyrinthIllustration variant="minimal" className="md:animate-gentle-float" />
      </ParallaxLayer>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <div>
            <h2 className="font-serif text-3xl font-bold leading-tight text-balance text-foreground md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>

            <div className="mt-9 space-y-5">
              {contactItems.map((contactChannel) => {
                const ContactChannelIcon = selectContactChannelIconByHref(contactChannel.href);

                return (
                  <a
                    key={contactChannel.label}
                    href={contactChannel.href}
                    className="group flex min-h-11 items-center gap-4 text-base text-foreground transition-colors duration-300 hover:text-primary"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/25 text-[var(--tone-ink)] transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <ContactChannelIcon className="size-5" aria-hidden="true" />
                    </div>
                    <span className="font-semibold">{contactChannel.value}</span>
                  </a>
                );
              })}

              {addresses.map((address) => (
                <div key={address} className="flex items-start gap-4 text-sm text-muted-foreground">
                  <div className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/25 text-[var(--tone-ink)]">
                    <MapPin className="size-5" aria-hidden="true" />
                  </div>
                  <span className="pt-2.5">{address}</span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
              {availabilityNote}
            </p>
          </div>

          <div className="space-y-5">
            <div className="paper-panel rounded-3xl border border-border/45 p-6 md:p-9">
              <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    {formLabels.name}
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Το ονοματεπώνυμό σας"
                    className="rounded-xl border-border/45 bg-background/70"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    {formLabels.email}
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="email@example.com"
                    className="rounded-xl border-border/45 bg-background/70"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    {formLabels.message}
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    placeholder="Γράψτε το μήνυμά σας..."
                    className="min-h-32 rounded-xl border-border/45 bg-background/70"
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 size-11 shrink-0 rounded border-border accent-primary"
                  />
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    {formLabels.consent}
                  </span>
                </label>

                <Button
                  type="submit"
                  className="w-full rounded-full text-base shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
                >
                  {formLabels.submit}
                </Button>
              </form>

              <p className="mt-5 text-center text-[11px] leading-relaxed text-muted-foreground">
                {privacyNote}
              </p>
            </div>

            <div className="rounded-3xl border border-border/45 bg-card/65 p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--tone-teal)]">
                Google Maps
              </p>
              <div className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-dashed border-border/65 bg-background/75 p-4 text-center text-sm leading-relaxed text-muted-foreground">
                {mapPlaceholder}
              </div>
              <Button asChild variant="outline" className="mt-3 w-full rounded-full border-border/55 bg-card/60">
                <a href="https://maps.google.com/?q=Αθήνα" target="_blank" rel="noopener noreferrer">
                  Άνοιγμα χάρτη
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
