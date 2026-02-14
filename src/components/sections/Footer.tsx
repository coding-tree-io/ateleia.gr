import * as React from 'react';

import { siteCopy } from '@/content/site-copy';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background/95 px-6 py-10 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <p className="text-center text-sm leading-relaxed text-muted-foreground md:text-left">
          {siteCopy.footer.builtBy}{' '}
          <a
            href={siteCopy.footer.builtByLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-primary"
          >
            {siteCopy.footer.builtByLink.label}
          </a>
          .
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6" aria-label="Πλοήγηση υποσέλιδου">
          {siteCopy.navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-6xl flex-col items-center gap-2 border-t border-border/45 pt-5 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-sm text-muted-foreground">{siteCopy.footer.copyright}</p>
        <p className="text-sm text-muted-foreground">© {year} {siteCopy.brandName}. Με επιφύλαξη παντός δικαιώματος.</p>
      </div>
    </footer>
  );
}
