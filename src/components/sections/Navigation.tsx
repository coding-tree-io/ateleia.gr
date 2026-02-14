import * as React from 'react';
import { Menu, X } from 'lucide-react';

import { siteCopy } from '@/content/site-copy';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 md:px-8">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group" aria-label="Αρχική">
          <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            {siteCopy.brandName}
          </span>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {siteCopy.brandSubtitle}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Κύρια πλοήγηση">
          {siteCopy.navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Button
          asChild
          className="hidden rounded-full px-5 md:inline-flex"
        >
          <a href="#contact">{siteCopy.hero.primaryCta}</a>
        </Button>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          className="border-t border-border/40 bg-background px-5 pb-6 pt-4 md:hidden"
          aria-label="Κινητή πλοήγηση"
        >
          <div className="flex flex-col gap-3">
            {siteCopy.navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="mt-2 rounded-full">
              <a href="#contact" onClick={() => setOpen(false)}>
                {siteCopy.hero.primaryCta}
              </a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
