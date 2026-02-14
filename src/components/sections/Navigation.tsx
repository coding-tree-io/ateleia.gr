import * as React from 'react';
import { Menu, X } from 'lucide-react';

import { siteCopy } from '@/content/site-copy';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-border/40 bg-background/80 shadow-sm backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        {/* Brand */}
        <a href="#" className="group flex items-center gap-3" aria-label="Αρχική">
          <span className="font-serif text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {siteCopy.brandName}
          </span>
          <span className="hidden text-xs tracking-wide text-muted-foreground sm:inline">
            {siteCopy.brandSubtitle}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Κύρια πλοήγηση">
          {siteCopy.navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Button asChild className="hidden rounded-full px-6 md:inline-flex">
          <a href="#contact">{siteCopy.hero.primaryCta}</a>
        </Button>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-foreground transition-colors hover:bg-secondary md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav
          className="border-t border-border/30 bg-background/95 px-6 pb-6 pt-4 backdrop-blur-xl"
          aria-label="Κινητή πλοήγηση"
        >
          <div className="flex flex-col gap-1">
            {siteCopy.navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="mt-3 rounded-full">
              <a href="#contact" onClick={() => setOpen(false)}>
                {siteCopy.hero.primaryCta}
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
