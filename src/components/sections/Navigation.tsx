import * as React from 'react';
import { Menu } from 'lucide-react';

import { siteCopy } from '@/content/site-copy';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Navigation() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logoSrc = `${import.meta.env.BASE_URL}images/client-review/logo.png`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-border/45 bg-background/90 shadow-sm backdrop-blur-xl' : 'bg-background/65 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 md:px-10">
        <a href="#hero" className="group flex min-h-11 min-w-0 items-center gap-3 py-0.5" aria-label="Αρχική">
          <img
            src={logoSrc}
            alt="Λογότυπο Ατέλεια"
            className="h-10 w-16 shrink-0 rounded-lg border border-border/60 bg-card/85 object-contain px-1 shadow-sm"
          />
          <div className="min-w-0">
            <span className="block truncate font-serif text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
              {siteCopy.brandName}
            </span>
            <span className="hidden truncate text-[11px] tracking-[0.12em] text-muted-foreground sm:inline">
              {siteCopy.brandSubtitle}
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Κύρια πλοήγηση">
          {siteCopy.navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative inline-flex min-h-11 items-center px-1.5 text-sm font-semibold text-muted-foreground transition-colors duration-300 hover:text-foreground after:absolute after:bottom-1 after:left-1.5 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-[calc(100%-0.75rem)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button asChild className="hidden rounded-full px-6 md:inline-flex">
          <a href="#contact">{siteCopy.hero.primaryCta}</a>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="inline-flex rounded-xl border-border/55 bg-card/80 md:hidden"
              aria-label="Άνοιγμα μενού"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="flex flex-col border-border/60 bg-background/95 pt-14">
            <SheetHeader>
              <SheetTitle>{siteCopy.brandName}</SheetTitle>
              <SheetDescription>{siteCopy.brandSubtitle}</SheetDescription>
            </SheetHeader>

            <nav className="mt-6 flex flex-col gap-2" aria-label="Κινητή πλοήγηση">
              {siteCopy.navItems.map((item) => (
                <SheetClose asChild key={item.label}>
                  <a
                    href={item.href}
                    className="flex min-h-11 items-center rounded-xl border border-border/40 bg-card/65 px-4 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    {item.label}
                  </a>
                </SheetClose>
              ))}
            </nav>

            <div className="mt-auto pt-5">
              <SheetClose asChild>
                <Button asChild className="w-full rounded-full text-base">
                  <a href="#contact">{siteCopy.hero.primaryCta}</a>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
