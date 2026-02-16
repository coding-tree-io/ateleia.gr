import { Menu } from 'lucide-react';

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

type NavigationEntry = {
  label: string;
  href: string;
};

type MobileNavigationMenuProps = {
  brandName: string;
  brandSubtitle: string;
  primaryActionLabel: string;
  navigationEntries: readonly NavigationEntry[];
};

export function MobileNavigationMenu({
  brandName,
  brandSubtitle,
  primaryActionLabel,
  navigationEntries,
}: MobileNavigationMenuProps) {
  return (
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
          {navigationEntries.map((navigationEntry) => (
            <SheetClose asChild key={navigationEntry.label}>
              <a
                href={navigationEntry.href}
                className="flex min-h-11 items-center rounded-xl border border-border/40 bg-card/65 px-4 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                {navigationEntry.label}
              </a>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto pt-5">
          <SheetClose asChild>
            <Button asChild className="w-full rounded-full text-base">
              <a href="#contact">{primaryActionLabel}</a>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
