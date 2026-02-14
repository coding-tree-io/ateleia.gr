import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { WavyDivider } from '@/components/decorative/ArtShapes';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-5 pt-0 pb-8 md:px-8">
      <WavyDivider className="mb-8 w-full text-border" />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        {/* Brand */}
        <span className="font-serif text-lg font-semibold text-foreground">
          {siteCopy.brandName}
        </span>
        <p className="text-xs text-muted-foreground">
          {siteCopy.footer.copyright}
        </p>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-4" aria-label="Πλοήγηση υποσέλιδου">
          {siteCopy.navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Built by */}
        <p className="text-[11px] text-muted-foreground/60">
          {siteCopy.footer.builtBy}{' '}
          <a
            href={siteCopy.footer.builtByLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            {siteCopy.footer.builtByLink.label}
          </a>
          {` \u00A9 ${year}`}
        </p>
      </div>
    </footer>
  );
}
