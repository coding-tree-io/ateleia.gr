import * as React from 'react';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';

import { approvedTheme, buildApprovedThemeCssVariables } from '@/config/approved-theme';
import { siteCopy } from '@/content/site-copy';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type HomePageScaffoldProps = {
  baseUrl: string;
};

export function HomePageScaffold({ baseUrl }: HomePageScaffoldProps) {
  const heroImageSrc = `${baseUrl}images/client-review/hero-therapy-4k.jpg`;
  const logoSrc = `${baseUrl}images/client-review/logo.png`;

  const pageStyle = {
    ...buildApprovedThemeCssVariables(approvedTheme.tokens),
    fontFamily: approvedTheme.typography.bodyFamily,
    backgroundColor: approvedTheme.tokens.background,
  } as React.CSSProperties;

  const heroOverlayStyle = {
    backgroundImage: 'linear-gradient(120deg, rgba(20, 24, 28, 0.56) 0%, rgba(20, 24, 28, 0.34) 55%, rgba(20, 24, 28, 0.16) 100%)',
  } as React.CSSProperties;

  return (
    <div style={pageStyle} className="space-y-8 text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="Λογότυπο Ατέλεια" className="size-10 rounded-full border border-border bg-white object-cover" />
            <div>
              <p className="text-sm font-semibold" style={{ fontFamily: approvedTheme.typography.headingFamily }}>
                {siteCopy.brandName}
              </p>
              <p className="text-xs text-muted-foreground">{siteCopy.brandSubtitle}</p>
            </div>
          </div>

          <nav className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
            {siteCopy.navItems.map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>

          <Button className="hidden rounded-full px-5 md:inline-flex">{siteCopy.hero.primaryCta}</Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl space-y-8 px-4 pb-10 md:px-6 md:pb-14">
        <section className="relative overflow-hidden rounded-3xl border border-border">
          <img src={heroImageSrc} alt="Δείγμα φωτογραφίας για το κεντρικό τμήμα" className="h-[420px] w-full object-cover md:h-[520px]" />
          <div className="absolute inset-0" style={heroOverlayStyle} />
          <div className="absolute inset-0 flex items-end p-4 md:p-8">
            <div className="max-w-2xl rounded-2xl bg-black/35 p-5 backdrop-blur-sm md:p-7">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white hover:bg-white/20">
                {siteCopy.hero.badge}
              </Badge>
              <h1
                className="text-3xl font-semibold leading-tight text-white md:text-5xl"
                style={{ fontFamily: approvedTheme.typography.headingFamily }}
              >
                {siteCopy.hero.title}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">{siteCopy.hero.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button className="rounded-full px-6">{siteCopy.hero.primaryCta}</Button>
                <Button variant="secondary" className="rounded-full px-6">
                  {siteCopy.hero.secondaryCta}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold" style={{ fontFamily: approvedTheme.typography.headingFamily }}>
            {siteCopy.servicesTitle}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {siteCopy.services.map((service) => (
              <Card key={service.title} className="h-full gap-3 border-border py-4">
                <CardHeader className="px-4">
                  <div className="mb-3 flex h-28 items-center justify-center rounded-lg border border-border bg-muted text-center text-xs text-muted-foreground">
                    {service.imagePlaceholder}
                  </div>
                  <CardTitle className="text-base" style={{ fontFamily: approvedTheme.typography.headingFamily }}>
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pt-0">
                  <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="border-border py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-xl" style={{ fontFamily: approvedTheme.typography.headingFamily }}>
                {siteCopy.about.title}
              </CardTitle>
              <CardDescription>{siteCopy.about.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start">
                <div className="flex size-20 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-[11px] text-muted-foreground">
                  Placeholder
                  <br />
                  φωτογραφίας
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{siteCopy.about.paragraphOne}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{siteCopy.about.paragraphTwo}</p>
            </CardContent>
          </Card>

          <Card className="border-border py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-xl" style={{ fontFamily: approvedTheme.typography.headingFamily }}>
                {siteCopy.faqTitle}
              </CardTitle>
              <CardDescription>{siteCopy.faqDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 px-4">
              {siteCopy.faqItems.map((item) => (
                <details key={item.question} className="rounded-lg border border-border bg-background p-3">
                  <summary className="cursor-pointer text-sm font-semibold">{item.question}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                </details>
              ))}
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="border-border py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-xl" style={{ fontFamily: approvedTheme.typography.headingFamily }}>
                {siteCopy.contact.title}
              </CardTitle>
              <CardDescription>{siteCopy.contact.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 px-4 lg:grid-cols-[1fr_0.9fr]">
              <form className="space-y-3" onSubmit={(event) => event.preventDefault()}>
                <div className="space-y-1.5">
                  <label htmlFor="homepage-contact-name" className="text-xs font-medium text-muted-foreground">
                    {siteCopy.contact.formLabels.name}
                  </label>
                  <Input id="homepage-contact-name" name="name" placeholder="Το ονοματεπώνυμό σας" autoComplete="name" />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="homepage-contact-email" className="text-xs font-medium text-muted-foreground">
                    {siteCopy.contact.formLabels.email}
                  </label>
                  <Input
                    id="homepage-contact-email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="homepage-contact-phone" className="text-xs font-medium text-muted-foreground">
                    {siteCopy.contact.formLabels.phone}
                  </label>
                  <Input id="homepage-contact-phone" name="phone" type="tel" placeholder="+30 69X XXX XXXX" autoComplete="tel" />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="homepage-contact-message" className="text-xs font-medium text-muted-foreground">
                    {siteCopy.contact.formLabels.message}
                  </label>
                  <Textarea
                    id="homepage-contact-message"
                    name="message"
                    placeholder="Γράψτε το μήνυμά σας"
                    className="min-h-28"
                  />
                </div>

                <Button type="submit" className="rounded-full px-6">
                  {siteCopy.contact.formLabels.submit}
                </Button>
              </form>

              <div className="space-y-3 rounded-lg border border-border bg-muted p-3">
                <p className="text-sm font-medium">{siteCopy.contact.infoTitle}</p>

                <div className="space-y-2">
                  {siteCopy.contact.contactItems.map((item) => {
                    const isAddress = item.label === 'Διεύθυνση';
                    const isPhone = item.label === 'Τηλέφωνο';
                    const Icon = isAddress ? MapPin : isPhone ? Phone : Mail;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Icon className="size-4" />
                        <span>{item.value}</span>
                      </a>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href="https://wa.me/3069XXXXXXX" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                      <MessageCircle className="size-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href="https://t.me/username" target="_blank" rel="noreferrer" aria-label="Telegram">
                      <Send className="size-4" />
                    </a>
                  </Button>
                </div>

                <div
                  className={cn(
                    'flex h-28 items-center justify-center rounded-md border border-border bg-card text-center text-xs text-muted-foreground'
                  )}
                >
                  Placeholder χάρτη
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
