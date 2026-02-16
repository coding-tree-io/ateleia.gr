import { therapyPracticeWebsiteContent } from '@/content/therapy-practice-website-content';
import { createCreditsPageUrl, createLogoImageUrl } from '@/config/site-branding';
import { ThreadedAlphaWordmark } from '@/components/brand/ThreadedAlphaWordmark';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const creditsPageUrl = createCreditsPageUrl();
  const logoImageUrl = createLogoImageUrl();
  const { brandName, brandSubtitle, navigationItems, footer } = therapyPracticeWebsiteContent;

  return (
    <footer className="relative border-t border-border/60 bg-background/95 px-4 py-10 sm:px-6 md:px-10 md:py-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-primary/10 to-transparent opacity-30" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-center gap-5 text-center">
          <a
            href="#hero"
            aria-label="Επιστροφή στην αρχή"
            className="group inline-flex min-h-11 items-center gap-3 rounded-2xl px-2 py-1.5 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <img
              src={logoImageUrl}
              alt={`Λογότυπο ${brandName}`}
              className="h-10 w-16 shrink-0 rounded-lg border border-border/55 bg-card/85 object-contain px-1 shadow-sm"
            />
            <div className="text-left">
              <ThreadedAlphaWordmark className="text-2xl" />
              <span className="text-xs tracking-[0.12em] text-muted-foreground">
                {brandSubtitle}
              </span>
            </div>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-1.5" aria-label="Πλοήγηση υποσέλιδου">
            {navigationItems.map((navigationItem) => (
              <a
                key={navigationItem.label}
                href={navigationItem.href}
                className="inline-flex min-h-11 items-center rounded-full border border-transparent px-3 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:border-border/60 hover:bg-secondary/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {navigationItem.label}
              </a>
            ))}
            <a
              href={creditsPageUrl}
              className="inline-flex min-h-11 items-center rounded-full border border-transparent px-3 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:border-border/60 hover:bg-secondary/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Credits
            </a>
          </nav>
        </div>

        <div className="mx-auto mt-7 flex w-full max-w-6xl flex-col items-center gap-3 border-t border-border/45 pt-5 text-center md:flex-row md:flex-wrap md:justify-between md:text-left">
          <p className="text-sm text-muted-foreground">{footer.copyright}</p>

          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {brandName}. Με επιφύλαξη παντός δικαιώματος.
            </p>
            <coding-tree-attribution
              className="origin-center scale-[0.82]"
              theme="default"
              size="sm"
              href="https://github.com/coding-tree-io"
            ></coding-tree-attribution>
          </div>
        </div>
      </div>
    </footer>
  );
}
