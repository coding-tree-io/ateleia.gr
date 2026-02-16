import { Menu } from 'lucide-react';

import { createLogoImageUrl } from '@/config/site-branding';
import { therapyPracticeWebsiteContent } from '@/content/therapy-practice-website-content';
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

const headerClassName = 'sticky top-0 z-50 border-b border-border/45 bg-background/90 shadow-sm';

export function Navigation() {
  const {
    brandName,
    brandSubtitle,
    navigationItems,
    hero: { primaryCta },
  } = therapyPracticeWebsiteContent;

  const logoImageUrl = createLogoImageUrl();

  return (
    <header className={headerClassName}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 md:px-10">
        <a href="#hero" className="group flex min-h-11 min-w-0 items-center gap-3 py-0.5" aria-label="Αρχική">
          <img
            src={logoImageUrl}
            alt="Λογότυπο Ατέλεια"
            className="h-10 w-16 shrink-0 rounded-lg border border-border/60 bg-card/85 object-contain px-1 shadow-sm"
          />
          <div className="min-w-0">
            <span className="block truncate font-serif text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
              {brandName}
            </span>
            <span className="hidden truncate text-[11px] tracking-[0.12em] text-muted-foreground sm:inline">
              {brandSubtitle}
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Κύρια πλοήγηση">
          {navigationItems.map((navigationItem) => (
            <a
              key={navigationItem.label}
              href={navigationItem.href}
              className="relative inline-flex min-h-11 items-center px-1.5 text-sm font-semibold text-muted-foreground transition-colors duration-300 hover:text-foreground after:absolute after:bottom-1 after:left-1.5 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-[calc(100%-0.75rem)]"
            >
              {navigationItem.label}
            </a>
          ))}
        </nav>

        <Button asChild className="hidden rounded-full px-6 md:inline-flex">
          <a href="#contact">{primaryCta}</a>
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
              <SheetTitle>{brandName}</SheetTitle>
              <SheetDescription>{brandSubtitle}</SheetDescription>
            </SheetHeader>

            <nav className="mt-6 flex flex-col gap-2" aria-label="Κινητή πλοήγηση">
              {navigationItems.map((navigationItem) => (
                <SheetClose asChild key={navigationItem.label}>
                  <a
                    href={navigationItem.href}
                    className="flex min-h-11 items-center rounded-xl border border-border/40 bg-card/65 px-4 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    {navigationItem.label}
                  </a>
                </SheetClose>
              ))}
            </nav>

            <div className="mt-auto pt-5">
              <SheetClose asChild>
                <Button asChild className="w-full rounded-full text-base">
                  <a href="#contact">{primaryCta}</a>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
