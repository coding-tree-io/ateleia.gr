import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type ThemeTokens = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
};

type PaletteOption = {
  id: string;
  label: string;
  shortNote: string;
  tokens: ThemeTokens;
};

type FontOption = {
  id: string;
  label: string;
  headingFamily: string;
  bodyFamily: string;
  shortNote: string;
};

const paletteOptions: PaletteOption[] = [
  {
    id: 'terra-calm',
    label: 'Terra Calm',
    shortNote: 'Logo-first terracotta with cool accent support.',
    tokens: {
      background: '#FDFEFE',
      foreground: '#2F2A2A',
      card: '#FFFFFF',
      cardForeground: '#2F2A2A',
      popover: '#FFFFFF',
      popoverForeground: '#2F2A2A',
      primary: '#C7392E',
      primaryForeground: '#FFFFFF',
      secondary: '#EFE9E8',
      secondaryForeground: '#2F2A2A',
      muted: '#EFE9E8',
      mutedForeground: '#625251',
      accent: '#5C7A82',
      accentForeground: '#FFFFFF',
      destructive: '#B42318',
      border: '#C0A3A1',
      input: '#E1D1D0',
      ring: '#C7392E',
      chart1: '#C7392E',
      chart2: '#5C7A82',
      chart3: '#F0847B',
      chart4: '#625251',
      chart5: '#C0A3A1',
    },
  },
  {
    id: 'sage-atelier',
    label: 'Sage Atelier',
    shortNote: 'Closer to muted green therapist aesthetics from references.',
    tokens: {
      background: '#F6F7F5',
      foreground: '#2B342E',
      card: '#FFFFFF',
      cardForeground: '#2B342E',
      popover: '#FFFFFF',
      popoverForeground: '#2B342E',
      primary: '#5E7561',
      primaryForeground: '#FFFFFF',
      secondary: '#E6EAE3',
      secondaryForeground: '#2B342E',
      muted: '#EEF1EC',
      mutedForeground: '#5D675F',
      accent: '#4E6A73',
      accentForeground: '#FFFFFF',
      destructive: '#A9342A',
      border: '#C9D1C8',
      input: '#D9DFD6',
      ring: '#5E7561',
      chart1: '#5E7561',
      chart2: '#4E6A73',
      chart3: '#9E7E62',
      chart4: '#7A8578',
      chart5: '#C9D1C8',
    },
  },
  {
    id: 'blue-harbor',
    label: 'Blue Harbor',
    shortNote: 'Cool, clinical clarity with warm grounding accents.',
    tokens: {
      background: '#F7FAFC',
      foreground: '#26343D',
      card: '#FFFFFF',
      cardForeground: '#26343D',
      popover: '#FFFFFF',
      popoverForeground: '#26343D',
      primary: '#3E6072',
      primaryForeground: '#FFFFFF',
      secondary: '#E8EFF2',
      secondaryForeground: '#26343D',
      muted: '#EEF3F6',
      mutedForeground: '#5B6972',
      accent: '#7F4D3C',
      accentForeground: '#FFFFFF',
      destructive: '#A53A2A',
      border: '#C7D6DF',
      input: '#D6E1E8',
      ring: '#3E6072',
      chart1: '#3E6072',
      chart2: '#7F4D3C',
      chart3: '#6B8DA0',
      chart4: '#93A5AF',
      chart5: '#D2A995',
    },
  },
];

const fontOptions: FontOption[] = [
  {
    id: 'nunito',
    label: 'Nunito',
    headingFamily: '"Nunito", "Inter", "Noto Sans", system-ui, sans-serif',
    bodyFamily: '"Nunito", "Inter", "Noto Sans", system-ui, sans-serif',
    shortNote: 'Friendly and rounded for warm, approachable tone.',
  },
  {
    id: 'noto-sans',
    label: 'Noto Sans',
    headingFamily: '"Noto Sans", "Inter", system-ui, sans-serif',
    bodyFamily: '"Noto Sans", "Inter", system-ui, sans-serif',
    shortNote: 'High Greek readability and neutral clinical clarity.',
  },
  {
    id: 'source-sans-3',
    label: 'Source Sans 3',
    headingFamily: '"Source Sans 3", "Inter", "Noto Sans", system-ui, sans-serif',
    bodyFamily: '"Source Sans 3", "Inter", "Noto Sans", system-ui, sans-serif',
    shortNote: 'Balanced editorial style with strong legibility.',
  },
];

const navItems = ['Αρχική', 'Βιογραφικό', 'Υπηρεσίες', 'FAQ', 'Επικοινωνία'];

const serviceCards = [
  {
    title: 'Ατομικές συνεδρίες',
    description: 'Προσωπικός χώρος διερεύνησης με εργαλεία καλλιτεχνικής έκφρασης.',
    artClass: 'bg-gradient-to-br from-primary/30 via-secondary to-muted',
  },
  {
    title: 'Ομαδικές συνεδρίες',
    description: 'Μικρές ομάδες που ενισχύουν σύνδεση, ενσυναίσθηση και κοινή εμπειρία.',
    artClass: 'bg-gradient-to-br from-accent/30 via-secondary to-background',
  },
  {
    title: 'Online συνεδρίες',
    description: 'Εξ αποστάσεως υποστήριξη με σταθερό πλαίσιο και πρακτική οργάνωση.',
    artClass: 'bg-gradient-to-br from-primary/20 via-muted to-accent/20',
  },
];

const faqItems = [
  {
    question: 'Πώς γίνεται η πρώτη συνεδρία;',
    answer: 'Ξεκινάμε με σύντομη χαρτογράφηση αναγκών και συμφωνία για το πλαίσιο συνεργασίας.',
  },
  {
    question: 'Χρειάζεται εμπειρία στην τέχνη;',
    answer: 'Όχι. Η καλλιτεχνική διαδικασία χρησιμοποιείται ως μέσο έκφρασης, όχι ως τεχνική αξιολόγηση.',
  },
  {
    question: 'Υπάρχει online επιλογή;',
    answer: 'Ναι, με σαφή δομή συνεδρίας και πρακτικές οδηγίες για να λειτουργεί ισότιμα με τη δια ζώσης εμπειρία.',
  },
];

const swatches: Array<{ label: string; background: keyof ThemeTokens; foreground: keyof ThemeTokens }> = [
  { label: 'Primary', background: 'primary', foreground: 'primaryForeground' },
  { label: 'Accent', background: 'accent', foreground: 'accentForeground' },
  { label: 'Background', background: 'background', foreground: 'foreground' },
  { label: 'Muted', background: 'muted', foreground: 'foreground' },
  { label: 'Border', background: 'border', foreground: 'foreground' },
  { label: 'Text', background: 'foreground', foreground: 'background' },
];

const defaultPalette = paletteOptions[0]!;
const defaultFont = fontOptions[0]!;

function buildThemeCssVariables(tokens: ThemeTokens): React.CSSProperties {
  return {
    '--background': tokens.background,
    '--foreground': tokens.foreground,
    '--card': tokens.card,
    '--card-foreground': tokens.cardForeground,
    '--popover': tokens.popover,
    '--popover-foreground': tokens.popoverForeground,
    '--primary': tokens.primary,
    '--primary-foreground': tokens.primaryForeground,
    '--secondary': tokens.secondary,
    '--secondary-foreground': tokens.secondaryForeground,
    '--muted': tokens.muted,
    '--muted-foreground': tokens.mutedForeground,
    '--accent': tokens.accent,
    '--accent-foreground': tokens.accentForeground,
    '--destructive': tokens.destructive,
    '--border': tokens.border,
    '--input': tokens.input,
    '--ring': tokens.ring,
    '--chart-1': tokens.chart1,
    '--chart-2': tokens.chart2,
    '--chart-3': tokens.chart3,
    '--chart-4': tokens.chart4,
    '--chart-5': tokens.chart5,
    '--sidebar': tokens.card,
    '--sidebar-foreground': tokens.foreground,
    '--sidebar-primary': tokens.primary,
    '--sidebar-primary-foreground': tokens.primaryForeground,
    '--sidebar-accent': tokens.secondary,
    '--sidebar-accent-foreground': tokens.secondaryForeground,
    '--sidebar-border': tokens.border,
    '--sidebar-ring': tokens.ring,
  } as React.CSSProperties;
}

export function DesignLabIsland() {
  const [activePaletteId, setActivePaletteId] = React.useState(defaultPalette.id);
  const [activeFontId, setActiveFontId] = React.useState(defaultFont.id);

  const activePalette = React.useMemo(
    () => paletteOptions.find((palette) => palette.id === activePaletteId) ?? defaultPalette,
    [activePaletteId]
  );

  const activeFont = React.useMemo(
    () => fontOptions.find((font) => font.id === activeFontId) ?? defaultFont,
    [activeFontId]
  );

  const previewStyle = React.useMemo(
    () =>
      ({
        ...buildThemeCssVariables(activePalette.tokens),
        fontFamily: activeFont.bodyFamily,
      }) as React.CSSProperties,
    [activeFont.bodyFamily, activePalette.tokens]
  );

  return (
    <div data-design-lab style={previewStyle} className="rounded-[2rem] border border-border bg-background p-4 text-foreground shadow-sm md:p-6">
      <section className="rounded-2xl border border-border bg-card p-4 md:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Design Lab</p>
            <h2 data-design-title className="text-xl font-semibold tracking-tight md:text-2xl" style={{ fontFamily: activeFont.headingFamily }}>
              Interactive palette and Greek typography preview
            </h2>
          </div>
          <Badge variant="secondary">Astro island + shadcn components</Badge>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm font-medium">Palette approaches</p>
            <div className="flex flex-wrap gap-2">
              {paletteOptions.map((palette) => {
                const selected = palette.id === activePalette.id;
                return (
                  <Button
                    type="button"
                    key={palette.id}
                    size="sm"
                    variant={selected ? 'default' : 'outline'}
                    className={cn('rounded-full', selected && 'shadow-xs')}
                    onClick={() => setActivePaletteId(palette.id)}
                  >
                    {palette.label}
                  </Button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Active palette: <span data-palette-name className="font-medium text-foreground">{activePalette.label}</span> - {activePalette.shortNote}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Greek font approaches</p>
            <div className="flex flex-wrap gap-2">
              {fontOptions.map((font) => {
                const selected = font.id === activeFont.id;
                return (
                  <Button
                    type="button"
                    key={font.id}
                    size="sm"
                    variant={selected ? 'default' : 'outline'}
                    className={cn('rounded-full', selected && 'shadow-xs')}
                    onClick={() => setActiveFontId(font.id)}
                  >
                    {font.label}
                  </Button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Active font: <span data-font-name className="font-medium text-foreground">{activeFont.label}</span> - {activeFont.shortNote}
            </p>
          </div>
        </div>
      </section>

      <div className="mt-6 space-y-5">
        <Card className="overflow-hidden border-border py-0">
          <CardContent className="p-0">
            <div className="border-b border-border bg-card px-4 py-3 md:px-6">
              <nav className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-sm font-bold text-primary">
                    A
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ fontFamily: activeFont.headingFamily }}>
                      Ατέλεια Art Therapy
                    </p>
                    <p className="text-xs text-muted-foreground">Συμβουλευτική και Ψυχοθεραπεία</p>
                  </div>
                </div>
                <ul className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
                  {navItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </nav>
            </div>

            <section className="relative overflow-hidden px-4 py-8 md:px-8 md:py-12">
              <div className="pointer-events-none absolute -left-10 top-0 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
              <div className="pointer-events-none absolute -right-8 bottom-0 h-36 w-36 rounded-full bg-accent/20 blur-3xl" />

              <div className="relative space-y-4">
                <Badge variant="outline" className="rounded-full">
                  Hero Section
                </Badge>
                <h1 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl" style={{ fontFamily: activeFont.headingFamily }}>
                  Δημιουργία, έκφραση, θεραπεία
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  Μια καθαρή, ήρεμη αισθητική για art therapy site με έμφαση στην εμπιστοσύνη, τη σαφήνεια και την εύκολη
                  κράτηση πρώτης συνεδρίας.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button className="rounded-full px-6">Κλείσε ραντεβού</Button>
                  <Button variant="secondary" className="rounded-full px-6">
                    Μάθε περισσότερα
                  </Button>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>

        <section className="grid gap-4 md:grid-cols-3">
          {serviceCards.map((service) => (
            <Card key={service.title} className="gap-4 border-border py-4">
              <CardHeader className="space-y-3 px-4">
                <div className={cn('h-28 rounded-xl border border-border', service.artClass)} />
                <CardTitle style={{ fontFamily: activeFont.headingFamily }}>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
              <CardFooter className="px-4 pt-0">
                <Button variant="outline" size="sm" className="rounded-full">
                  Δες λεπτομέρειες
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="border-border py-5">
            <CardHeader>
              <CardTitle style={{ fontFamily: activeFont.headingFamily }}>Ποιοι είμαστε</CardTitle>
              <CardDescription>Minimal trust block με βιογραφία και προσέγγιση.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="size-20 shrink-0 rounded-full border border-border bg-muted" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Δουλεύουμε με προσωποκεντρική προσέγγιση και τεχνικές δημιουργικής έκφρασης, σε πλαίσιο αποδοχής και
                  ασφάλειας.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="rounded-full">
                Βιογραφικό
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-border py-5">
            <CardHeader>
              <CardTitle style={{ fontFamily: activeFont.headingFamily }}>FAQ Preview</CardTitle>
              <CardDescription>Πιθανό μοτίβο για συχνές ερωτήσεις στην αρχική ή ξεχωριστή σελίδα.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-lg border border-border bg-background px-3 py-2">
                  <summary className="cursor-pointer text-sm font-medium">{item.question}</summary>
                  <p className="pt-2 text-sm text-muted-foreground">{item.answer}</p>
                </details>
              ))}
            </CardContent>
          </Card>
        </section>

        <Card className="border-border py-5">
          <CardHeader>
            <CardTitle style={{ fontFamily: activeFont.headingFamily }}>Επικοινωνία και ραντεβού</CardTitle>
            <CardDescription>Form block, direct contact info και map placeholder για v1 σύνθεση.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
            <div className="space-y-3">
              <Input id="contact-name" name="name" aria-label="Ονοματεπώνυμο" placeholder="Ονοματεπώνυμο" autoComplete="name" />
              <Input id="contact-email" name="email" aria-label="Email" placeholder="Email" type="email" autoComplete="email" />
              <Input id="contact-phone" name="phone" aria-label="Τηλέφωνο" placeholder="Τηλέφωνο" type="tel" autoComplete="tel" />
              <Textarea id="contact-message" name="message" aria-label="Μήνυμα" placeholder="Μήνυμα" className="min-h-24" />
              <div className="flex flex-wrap gap-2">
                <Button className="rounded-full px-6">Αποστολή</Button>
                <Button variant="outline" className="rounded-full px-6">
                  Κλήση
                </Button>
              </div>
            </div>

            <div className="space-y-3 rounded-xl border border-border bg-muted p-4">
              <p className="text-sm font-medium">Στοιχεία επικοινωνίας</p>
              <p className="text-sm text-muted-foreground">Αθήνα - Online συνεδρίες</p>
              <p className="text-sm text-muted-foreground">+30 69X XXX XXXX</p>
              <p className="text-sm text-muted-foreground">hello@ateleia.gr</p>
              <div className="flex h-32 items-center justify-center rounded-lg border border-border bg-card text-xs text-muted-foreground">
                Placeholder map
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border py-5">
          <CardHeader>
            <CardTitle style={{ fontFamily: activeFont.headingFamily }}>Token swatches</CardTitle>
            <CardDescription>Live output of the active palette selection.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {swatches.map((swatch) => {
              const background = activePalette.tokens[swatch.background];
              const foreground = activePalette.tokens[swatch.foreground];

              return (
                <div key={swatch.label} className="rounded-xl border border-border p-3">
                  <div
                    className="flex h-12 items-center justify-center rounded-md text-xs font-semibold tracking-wide"
                    style={{
                      backgroundColor: background,
                      color: foreground,
                    }}
                  >
                    {swatch.label}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{background}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <section className="rounded-2xl bg-accent p-5 text-accent-foreground md:p-6">
          <p className="text-sm font-semibold">CTA Band Preview</p>
          <p className="mt-1 text-sm/relaxed opacity-90">Σχεδίαση για υψηλή ορατότητα του βασικού conversion event.</p>
        </section>
      </div>
    </div>
  );
}
