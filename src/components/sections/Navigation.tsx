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

  const logoSrc = `${import.meta.env.BASE_URL}images/client-review/logo.png`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-border/45 bg-background/82 shadow-sm backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#hero" className="group flex items-center gap-3" aria-label="Αρχική">
          <img
            src={logoSrc}
            alt="Λογότυπο Ατέλεια"
            className="size-10 rounded-xl border border-border/60 bg-card/85 object-cover shadow-sm"
          />
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-serif text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {siteCopy.brandName}
            </span>
            <span className="hidden truncate text-[11px] tracking-[0.12em] text-muted-foreground sm:inline">
              {siteCopy.brandSubtitle}
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Κύρια πλοήγηση">
          {siteCopy.navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-sm font-semibold text-muted-foreground transition-colors duration-300 hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button asChild className="hidden rounded-full px-6 shadow-md shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 md:inline-flex">
          <a href="#contact">{siteCopy.hero.primaryCta}</a>
        </Button>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-foreground transition-colors hover:bg-secondary md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="overflow-hidden transition-all duration-300 ease-in-out md:hidden">
          <nav className="border-t border-border/35 bg-background/95 px-6 pb-6 pt-4 backdrop-blur-xl" aria-label="Κινητή πλοήγηση">
            <div className="flex flex-col gap-1">
              {siteCopy.navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-4 py-3 text-base font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button asChild className="mt-3 rounded-full shadow-md shadow-primary/15">
                <a href="#contact" onClick={() => setOpen(false)}>
                  {siteCopy.hero.primaryCta}
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
