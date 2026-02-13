import * as React from 'react';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

type PaintingLayer = {
  pageWash: string;
  heroWash: string;
  brushStroke: string;
};

type PaletteOption = {
  id: string;
  label: string;
  subtitle: string;
  source: 'logo' | 'alternative' | 'artistic';
  tokens: ThemeTokens;
  paintingLayer?: PaintingLayer;
};

type FontOption = {
  id: string;
  label: string;
  subtitle: string;
  headingFamily: string;
  bodyFamily: string;
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type ViewMode = 'desktop' | 'mobile';

type ClientReviewIslandProps = {
  baseUrl: string;
};

const paletteOptions: PaletteOption[] = [
  {
    id: 'logo-terra-calm',
    label: 'Terracotta Calm',
    subtitle: 'Θερμή ισορροπία με καθαρές ουδέτερες επιφάνειες.',
    source: 'logo',
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
    id: 'logo-soft-rose',
    label: 'Peach Serenity',
    subtitle: 'Πιο απαλή θερμή εκδοχή με ήπιες αντιθέσεις.',
    source: 'logo',
    tokens: {
      background: '#FEFCFB',
      foreground: '#332A29',
      card: '#FFFFFF',
      cardForeground: '#332A29',
      popover: '#FFFFFF',
      popoverForeground: '#332A29',
      primary: '#A75A52',
      primaryForeground: '#FFFFFF',
      secondary: '#F2E9E7',
      secondaryForeground: '#332A29',
      muted: '#F4ECEA',
      mutedForeground: '#6A5451',
      accent: '#4F6D70',
      accentForeground: '#FFFFFF',
      destructive: '#A43A30',
      border: '#CCB3AE',
      input: '#E8D8D4',
      ring: '#A75A52',
      chart1: '#A75A52',
      chart2: '#4F6D70',
      chart3: '#D68E87',
      chart4: '#7B6762',
      chart5: '#CCB3AE',
    },
  },
  {
    id: 'logo-deep-earth',
    label: 'Deep Terracotta',
    subtitle: 'Πιο βαθιά και σταθερή θερμή ταυτότητα.',
    source: 'logo',
    tokens: {
      background: '#FCFAF9',
      foreground: '#312928',
      card: '#FFFFFF',
      cardForeground: '#312928',
      popover: '#FFFFFF',
      popoverForeground: '#312928',
      primary: '#8D3A33',
      primaryForeground: '#FFFFFF',
      secondary: '#ECE3E0',
      secondaryForeground: '#312928',
      muted: '#F0E8E5',
      mutedForeground: '#6A5652',
      accent: '#4F6A71',
      accentForeground: '#FFFFFF',
      destructive: '#932C24',
      border: '#BEA29D',
      input: '#DECBC6',
      ring: '#8D3A33',
      chart1: '#8D3A33',
      chart2: '#4F6A71',
      chart3: '#C3726A',
      chart4: '#6F5A56',
      chart5: '#BEA29D',
    },
  },
  {
    id: 'alt-sage-harmony',
    label: 'Sage Light',
    subtitle: 'Πράσινη-ήρεμη αισθητική με φυσικό χαρακτήρα.',
    source: 'alternative',
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
    id: 'alt-mint-copper-breeze',
    label: 'Mint Copper Breeze',
    subtitle: 'Απαλό πράσινο, χαλκός και απαλό μπλε πάνω σε ήρεμο ουδέτερο φόντο.',
    source: 'alternative',
    tokens: {
      background: '#F4F2EE',
      foreground: '#273235',
      card: '#FCFBF8',
      cardForeground: '#273235',
      popover: '#FCFBF8',
      popoverForeground: '#273235',
      primary: '#5F7D67',
      primaryForeground: '#FFFFFF',
      secondary: '#E5EEF4',
      secondaryForeground: '#273235',
      muted: '#ECE7DF',
      mutedForeground: '#625E58',
      accent: '#83563E',
      accentForeground: '#FFFFFF',
      destructive: '#A63A2C',
      border: '#C9C5BD',
      input: '#DDD7CF',
      ring: '#5F7D67',
      chart1: '#5F7D67',
      chart2: '#83563E',
      chart3: '#6F8FA8',
      chart4: '#C98265',
      chart5: '#B7C4B4',
    },
    paintingLayer: {
      pageWash:
        'radial-gradient(52% 46% at 10% 16%, rgba(95, 125, 103, 0.16) 0%, rgba(95, 125, 103, 0) 72%), radial-gradient(50% 44% at 88% 18%, rgba(111, 143, 168, 0.16) 0%, rgba(111, 143, 168, 0) 74%), radial-gradient(44% 40% at 20% 82%, rgba(201, 130, 101, 0.14) 0%, rgba(201, 130, 101, 0) 74%), linear-gradient(160deg, rgba(244, 242, 238, 0.98), rgba(236, 231, 223, 0.98))',
      heroWash:
        'linear-gradient(120deg, rgba(95, 125, 103, 0.52) 0%, rgba(111, 143, 168, 0.34) 45%, rgba(131, 86, 62, 0.38) 100%)',
      brushStroke:
        'linear-gradient(130deg, rgba(95, 125, 103, 0.22) 0%, rgba(111, 143, 168, 0.18) 42%, rgba(201, 130, 101, 0.20) 100%)',
    },
  },
  {
    id: 'art-iris-studio',
    label: 'Iris Studio',
    subtitle: 'Καλλιτεχνική ισορροπία μπλε-βιολετί με θερμές πινελιές.',
    source: 'artistic',
    tokens: {
      background: '#F8F7FB',
      foreground: '#232133',
      card: '#FFFFFF',
      cardForeground: '#232133',
      popover: '#FFFFFF',
      popoverForeground: '#232133',
      primary: '#4E4A8D',
      primaryForeground: '#FFFFFF',
      secondary: '#E9E6F5',
      secondaryForeground: '#232133',
      muted: '#EFEDF7',
      mutedForeground: '#5B5774',
      accent: '#A14B2A',
      accentForeground: '#FFFFFF',
      destructive: '#A4342C',
      border: '#C8C2DD',
      input: '#DCD6EB',
      ring: '#4E4A8D',
      chart1: '#4E4A8D',
      chart2: '#A14B2A',
      chart3: '#7570BF',
      chart4: '#7C789A',
      chart5: '#C8C2DD',
    },
  },
  {
    id: 'art-peacock-mosaic',
    label: 'Petrol Mosaic',
    subtitle: 'Πιο τολμηρή παλέτα με πετρόλ βάση και μουσταρδί έμφαση.',
    source: 'artistic',
    tokens: {
      background: '#F7FAF8',
      foreground: '#1F2E2D',
      card: '#FFFFFF',
      cardForeground: '#1F2E2D',
      popover: '#FFFFFF',
      popoverForeground: '#1F2E2D',
      primary: '#0F6B6A',
      primaryForeground: '#FFFFFF',
      secondary: '#E4EFEA',
      secondaryForeground: '#1F2E2D',
      muted: '#EAF2EF',
      mutedForeground: '#4E6665',
      accent: '#8A4F17',
      accentForeground: '#FFFFFF',
      destructive: '#A13A2D',
      border: '#BED2CC',
      input: '#D0E1DC',
      ring: '#0F6B6A',
      chart1: '#0F6B6A',
      chart2: '#8A4F17',
      chart3: '#4A8F8E',
      chart4: '#7F6F45',
      chart5: '#BED2CC',
    },
  },
];

const fontOptions: FontOption[] = [
  {
    id: 'nunito',
    label: 'Nunito',
    subtitle: 'Πιο φιλική και απαλή γραφή.',
    headingFamily: '"Nunito", "Noto Sans", system-ui, sans-serif',
    bodyFamily: '"Nunito", "Noto Sans", system-ui, sans-serif',
  },
  {
    id: 'noto-sans',
    label: 'Noto Sans',
    subtitle: 'Καθαρή και ουδέτερη ανάγνωση στα ελληνικά.',
    headingFamily: '"Noto Sans", system-ui, sans-serif',
    bodyFamily: '"Noto Sans", system-ui, sans-serif',
  },
  {
    id: 'source-sans-3',
    label: 'Source Sans 3',
    subtitle: 'Ισορροπημένη γραφή με πιο εκδοτικό ύφος.',
    headingFamily: '"Source Sans 3", "Noto Sans", system-ui, sans-serif',
    bodyFamily: '"Source Sans 3", "Noto Sans", system-ui, sans-serif',
  },
  {
    id: 'gfs-neohellenic',
    label: 'GFS Neohellenic',
    subtitle: 'Ελληνικός χαρακτήρας με ήπια, σύγχρονη αίσθηση.',
    headingFamily: '"GFS Neohellenic", "Noto Sans", system-ui, sans-serif',
    bodyFamily: '"GFS Neohellenic", "Noto Sans", system-ui, sans-serif',
  },
  {
    id: 'gfs-didot',
    label: 'GFS Didot',
    subtitle: 'Κλασική ελληνική κομψότητα με πιο καλλιτεχνικό τόνο.',
    headingFamily: '"GFS Didot", "Noto Serif", serif',
    bodyFamily: '"GFS Didot", "Noto Serif", serif',
  },
  {
    id: 'fira-sans',
    label: 'Fira Sans',
    subtitle: 'Σύγχρονη γεωμετρία με πολύ καθαρή ανάγνωση σε ελληνικά κείμενα.',
    headingFamily: '"Fira Sans", "Noto Sans", system-ui, sans-serif',
    bodyFamily: '"Fira Sans", "Noto Sans", system-ui, sans-serif',
  },
  {
    id: 'noto-serif',
    label: 'Noto Serif',
    subtitle: 'Ήπιο editorial ύφος για πιο λογοτεχνικό και ζεστό τόνο.',
    headingFamily: '"Noto Serif", serif',
    bodyFamily: '"Noto Serif", serif',
  },
];

const navItems = ['Αρχική', 'Ποιοι Είμαστε', 'Υπηρεσίες', 'FAQ', 'Επικοινωνία'];

const serviceItems = [
  {
    title: 'Ατομικές συνεδρίες',
    description: 'Προσωπικός χώρος έκφρασης με δημιουργικές τεχνικές.',
  },
  {
    title: 'Ομαδικές συνεδρίες',
    description: 'Μικρές ομάδες με στόχο σύνδεση και ενσυναίσθηση.',
  },
  {
    title: 'Online συνεδρίες',
    description: 'Σταθερή θεραπευτική δομή με ευελιξία χώρου και χρόνου.',
  },
];

const faqItems: FaqItem[] = [
  {
    id: 'first-meeting',
    question: 'Πώς γίνεται η πρώτη συνάντηση;',
    answer: 'Με μια σύντομη γνωριμία, στόχους συνεργασίας και πρακτικές λεπτομέρειες για το πλαίσιο των συνεδριών.',
  },
  {
    id: 'art-experience',
    question: 'Χρειάζεται εμπειρία στην τέχνη;',
    answer: 'Όχι. Η τέχνη λειτουργεί ως μέσο έκφρασης και διερεύνησης, όχι ως αξιολόγηση καλλιτεχνικής ικανότητας.',
  },
  {
    id: 'online-start',
    question: 'Μπορούμε να ξεκινήσουμε online;',
    answer: 'Ναι, με σταθερή ώρα, σαφή δομή και ασφαλές θεραπευτικό πλαίσιο, ακριβώς όπως και στις δια ζώσης συνεδρίες.',
  },
];

const defaultPalette = paletteOptions[0]!;
const defaultFont = fontOptions[0]!;
const paletteIds = paletteOptions.map((item) => item.id);
const fontIds = fontOptions.map((item) => item.id);
const viewModes: ViewMode[] = ['desktop', 'mobile'];

function parseChoice<T extends string>(value: string | null, allowed: T[], fallback: T): T {
  if (value && allowed.includes(value as T)) {
    return value as T;
  }

  return fallback;
}

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

function getPaletteSourceLabel(source: PaletteOption['source']) {
  if (source === 'logo') {
    return 'Με βάση τα χρώματα του λογοτύπου';
  }

  if (source === 'artistic') {
    return 'Καλλιτεχνική πρόταση με θεωρία χρωμάτων';
  }

  return 'Εναλλακτική πρόταση';
}

async function writeToClipboard(text: string) {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
    throw new Error('Clipboard API is not available.');
  }

  await navigator.clipboard.writeText(text);
}

export function ClientReviewIsland({ baseUrl }: ClientReviewIslandProps) {
  const [paletteId, setPaletteId] = React.useState(defaultPalette.id);
  const [fontId, setFontId] = React.useState(defaultFont.id);
  const [viewMode, setViewMode] = React.useState<ViewMode>('desktop');
  const [hydratedFromQuery, setHydratedFromQuery] = React.useState(false);
  const [copyState, setCopyState] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [openFaqId, setOpenFaqId] = React.useState(faqItems[0]!.id);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setPaletteId(parseChoice(params.get('palette'), paletteIds, defaultPalette.id));
    setFontId(parseChoice(params.get('font'), fontIds, defaultFont.id));
    setViewMode(parseChoice(params.get('view'), viewModes, 'desktop'));
    setHydratedFromQuery(true);
  }, []);

  React.useEffect(() => {
    if (!hydratedFromQuery) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    params.set('palette', paletteId);
    params.set('font', fontId);
    params.set('view', viewMode);

    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
  }, [fontId, hydratedFromQuery, paletteId, viewMode]);

  React.useEffect(() => {
    if (copyState === 'idle') {
      return;
    }

    const timeout = window.setTimeout(() => setCopyState('idle'), 2200);
    return () => window.clearTimeout(timeout);
  }, [copyState]);

  const activePalette = React.useMemo(
    () => paletteOptions.find((palette) => palette.id === paletteId) ?? defaultPalette,
    [paletteId]
  );

  const activeFont = React.useMemo(() => fontOptions.find((font) => font.id === fontId) ?? defaultFont, [fontId]);
  const activePaintingLayer = activePalette.paintingLayer;

  const islandStyle = React.useMemo(
    () =>
      ({
        ...buildThemeCssVariables(activePalette.tokens),
        fontFamily: activeFont.bodyFamily,
      }) as React.CSSProperties,
    [activeFont.bodyFamily, activePalette.tokens]
  );

  const previewCanvasStyle = React.useMemo<React.CSSProperties | undefined>(() => {
    if (!activePaintingLayer) {
      return undefined;
    }

    return {
      backgroundColor: activePalette.tokens.background,
      backgroundImage: activePaintingLayer.pageWash,
    };
  }, [activePaintingLayer, activePalette.tokens.background]);

  const heroOverlayStyle = React.useMemo<React.CSSProperties>(
    () => ({
      backgroundImage:
        activePaintingLayer?.heroWash ?? 'linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.15))',
    }),
    [activePaintingLayer]
  );

  const brushStrokeStyle = React.useMemo<React.CSSProperties | undefined>(() => {
    if (!activePaintingLayer) {
      return undefined;
    }

    return {
      backgroundColor: activePalette.tokens.muted,
      backgroundImage: activePaintingLayer.brushStroke,
      backgroundBlendMode: 'multiply',
    };
  }, [activePaintingLayer, activePalette.tokens.muted]);

  const isMobileFrame = viewMode === 'mobile';
  const heroImageSrc = `${baseUrl}images/client-review/hero-therapy-4k.jpg`;
  const logoSrc = `${baseUrl}images/client-review/logo.png`;

  async function handleCopySelections() {
    try {
      await writeToClipboard(window.location.href);
      setCopyState('success');
    } catch {
      setCopyState('error');
    }
  }

  function handleFaqToggle(id: string) {
    setOpenFaqId((current) => (current === id ? '' : id));
  }

  return (
    <div style={islandStyle} className="space-y-5 text-foreground">
      <section className="rounded-2xl border border-border bg-card p-4 md:p-6">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold leading-tight md:text-2xl" style={{ fontFamily: activeFont.headingFamily }}>
              Επιλέξτε ύφος για την πρώτη έκδοση της ιστοσελίδας
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Δοκιμάστε χρώματα και γραμματοσειρές, δείτε την ίδια σελίδα σε επιφάνεια υπολογιστή ή κινητού και όταν
              καταλήξετε πατήστε «Αντιγραφή συνδέσμου επιλογών».
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">7 χρωματικές παλέτες</Badge>
              <Badge variant="secondary">7 γραμματοσειρές</Badge>
              <Badge variant="secondary">Προεπισκόπηση σε υπολογιστή/κινητό</Badge>
            </div>
          </div>

          <Card className="border-border py-4">
            <CardHeader className="space-y-2 px-4">
              <CardTitle className="text-base" style={{ fontFamily: activeFont.headingFamily }}>
                Βήματα
              </CardTitle>
              <CardDescription>Σύντομη διαδικασία για να δώσετε τελική κατεύθυνση.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 px-4 text-sm text-muted-foreground">
              <p>1. Δοκιμάστε όλες τις παλέτες και τις 7 γραμματοσειρές.</p>
              <p>2. Ελέγξτε την ίδια σελίδα σε επιφάνεια υπολογιστή και κινητό.</p>
              <p>3. Πατήστε «Αντιγραφή συνδέσμου επιλογών» από το επάνω πλαίσιο.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="sticky top-2 z-40 rounded-2xl border border-border bg-card/95 p-4 backdrop-blur md:p-6">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm font-medium">Χρωματική παλέτα</p>
            <div className="flex flex-wrap gap-2">
              {paletteOptions.map((palette) => {
                const isSelected = palette.id === activePalette.id;

                return (
                  <Button
                    key={palette.id}
                    type="button"
                    size="sm"
                    variant={isSelected ? 'default' : 'outline'}
                    className="rounded-full"
                    onClick={() => setPaletteId(palette.id)}
                  >
                    {palette.label}
                  </Button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Τρέχουσα επιλογή: <span className="font-medium text-foreground">{activePalette.label}</span> -{' '}
              {activePalette.subtitle}
            </p>
            <p className="text-xs text-muted-foreground">Προέλευση: {getPaletteSourceLabel(activePalette.source)}</p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button type="button" className="rounded-full px-6" onClick={handleCopySelections}>
                Αντιγραφή συνδέσμου επιλογών
              </Button>
              {copyState === 'success' && <p className="text-sm text-primary">Ο σύνδεσμος αντιγράφηκε.</p>}
              {copyState === 'error' && <p className="text-sm text-destructive">Δεν έγινε αντιγραφή. Δοκιμάστε ξανά.</p>}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Γραμματοσειρά</p>
            <div className="flex flex-wrap gap-2">
              {fontOptions.map((font) => {
                const isSelected = font.id === activeFont.id;

                return (
                  <Button
                    key={font.id}
                    type="button"
                    size="sm"
                    variant={isSelected ? 'default' : 'outline'}
                    className="rounded-full"
                    onClick={() => setFontId(font.id)}
                  >
                    {font.label}
                  </Button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Τρέχουσα επιλογή: <span className="font-medium text-foreground">{activeFont.label}</span> - {activeFont.subtitle}
            </p>

            <div className="pt-1">
              <p className="mb-2 text-sm font-medium">Προβολή</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={viewMode === 'desktop' ? 'default' : 'outline'}
                  className="rounded-full"
                  onClick={() => setViewMode('desktop')}
                >
                  Επιφάνεια υπολογιστή
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={viewMode === 'mobile' ? 'default' : 'outline'}
                  className="rounded-full"
                  onClick={() => setViewMode('mobile')}
                >
                  Κινητό
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div
        className={cn(
          'w-full',
          isMobileFrame && 'mx-auto max-w-[430px] rounded-[2rem] border border-border bg-card p-2 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.45)]'
        )}
      >
        <section
          className={cn('overflow-hidden rounded-[1.25rem] border border-border bg-background text-foreground')}
          style={previewCanvasStyle}
        >
          <div className={cn('border-b border-border bg-card', isMobileFrame ? 'px-3 py-3' : 'px-4 py-3 md:px-6')}>
            <nav className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img src={logoSrc} alt="Λογότυπο Ατέλεια" className="size-10 rounded-full border border-border bg-white object-cover" />
                <div>
                  <p className="text-sm font-semibold" style={{ fontFamily: activeFont.headingFamily }}>
                    Ατέλεια
                  </p>
                  <p className="text-xs text-muted-foreground">Συμβουλευτική και Ψυχοθεραπεία</p>
                </div>
              </div>

              <ul className={cn('items-center gap-4 text-sm text-muted-foreground', isMobileFrame ? 'hidden' : 'hidden md:flex')}>
                {navItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </nav>
          </div>

          <section className={cn('relative overflow-hidden border-b border-border', isMobileFrame ? 'min-h-[280px]' : 'min-h-[360px]')}>
            <img src={heroImageSrc} alt="Δείγμα φωτογραφίας για το κεντρικό τμήμα" className="h-full w-full object-cover" loading="eager" />
            <div className="absolute inset-0" style={heroOverlayStyle} />
            <div className={cn('absolute inset-x-0 bottom-0', isMobileFrame ? 'p-3' : 'p-4 md:p-8')}>
              <div className="max-w-2xl rounded-xl bg-black/30 p-4 backdrop-blur-sm">
                <Badge variant="secondary" className="mb-3 bg-white/20 text-white hover:bg-white/20">
                  Δείγμα κεντρικής εικόνας (δωρεάν φωτογραφία)
                </Badge>
                <h1
                  className={cn('font-semibold leading-tight text-white', isMobileFrame ? 'text-2xl' : 'text-2xl md:text-4xl')}
                  style={{ fontFamily: activeFont.headingFamily }}
                >
                  Δημιουργία, έκφραση, θεραπεία
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90">
                  Ένα ήρεμο, καθαρό και ανθρώπινο πρώτο βλέμμα για την ιστοσελίδα.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button className="rounded-full px-5">Κλείσε ραντεβού</Button>
                  <Button variant="secondary" className="rounded-full px-5">
                    Μάθε περισσότερα
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className={cn('space-y-5', isMobileFrame ? 'px-3 py-4' : 'px-4 py-6 md:px-6 md:py-8')}>
            <div className={cn('grid gap-4', isMobileFrame ? 'grid-cols-1' : 'md:grid-cols-3')}>
              {serviceItems.map((service) => (
                <Card key={service.title} className="h-full gap-3 border-border py-4">
                  <CardHeader className="px-4">
                    <div
                      className="mb-3 flex h-28 items-center justify-center rounded-lg border border-border bg-muted text-center text-xs text-muted-foreground"
                      style={brushStrokeStyle}
                    >
                      Placeholder εικόνας υπηρεσίας
                    </div>
                    <CardTitle className="text-base" style={{ fontFamily: activeFont.headingFamily }}>
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pt-0">
                    <p className="min-h-12 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className={cn('grid gap-4', isMobileFrame ? 'grid-cols-1' : 'lg:grid-cols-[1.05fr_0.95fr]')}>
              <Card className="border-border py-4">
                <CardHeader className="px-4">
                  <CardTitle className="text-lg" style={{ fontFamily: activeFont.headingFamily }}>
                    Ποιοι Είμαστε
                  </CardTitle>
                  <CardDescription>Δείγμα ενότητας γνωριμίας.</CardDescription>
                </CardHeader>
                <CardContent className="px-4">
                  <div className={cn('flex gap-3', isMobileFrame ? 'flex-col' : 'flex-col md:flex-row md:items-center')}>
                    <div
                      className="flex size-20 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-[11px] text-muted-foreground"
                      style={brushStrokeStyle}
                    >
                      Placeholder
                      <br />
                      φωτογραφίας
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Σύντομη ανθρώπινη παρουσίαση με έμφαση στην ασφάλεια, τη σύνδεση και τη θεραπευτική σχέση.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border py-4">
                <CardHeader className="px-4">
                  <CardTitle className="text-lg" style={{ fontFamily: activeFont.headingFamily }}>
                    Συχνές Ερωτήσεις
                  </CardTitle>
                  <CardDescription>Δείγμα διαδραστικής διάταξης FAQ.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 px-4">
                  {faqItems.map((item) => {
                    const isOpen = openFaqId === item.id;

                    return (
                      <div key={item.id} className="overflow-hidden rounded-lg border border-border bg-background">
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-auto w-full justify-between rounded-none px-3 py-3 text-left"
                          onClick={() => handleFaqToggle(item.id)}
                          aria-expanded={isOpen}
                        >
                          <span className="text-sm font-semibold">{item.question}</span>
                          <span className="text-base font-semibold text-muted-foreground">{isOpen ? '-' : '+'}</span>
                        </Button>
                        {isOpen && (
                          <div className="border-t border-border px-3 py-3">
                            <p className="text-sm text-muted-foreground">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            <Card className="border-border py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-lg" style={{ fontFamily: activeFont.headingFamily }}>
                  Επικοινωνία
                </CardTitle>
                <CardDescription>Δείγμα πραγματικής φόρμας επικοινωνίας.</CardDescription>
              </CardHeader>
              <CardContent className={cn('grid gap-4 px-4', isMobileFrame ? 'grid-cols-1' : 'lg:grid-cols-[1fr_0.9fr]')}>
                <form className="space-y-3" onSubmit={(event) => event.preventDefault()}>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-medium text-muted-foreground">
                      Ονοματεπώνυμο
                    </label>
                    <Input id="contact-name" name="name" placeholder="Το ονοματεπώνυμό σας" autoComplete="name" />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-medium text-muted-foreground">
                      Email
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="text-xs font-medium text-muted-foreground">
                      Τηλέφωνο
                    </label>
                    <Input id="contact-phone" name="phone" type="tel" placeholder="+30 69X XXX XXXX" autoComplete="tel" />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-medium text-muted-foreground">
                      Μήνυμα
                    </label>
                    <Textarea id="contact-message" name="message" placeholder="Γράψτε το μήνυμά σας" className="min-h-28" />
                  </div>

                  <div className="pt-1">
                    <Button type="submit" className="rounded-full px-6">
                      Αποστολή αιτήματος
                    </Button>
                  </div>
                </form>

                <div className="space-y-3 rounded-lg border border-border bg-muted p-3" style={brushStrokeStyle}>
                  <p className="text-sm font-medium">Στοιχεία επικοινωνίας</p>

                  <div className="space-y-2">
                    <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                      <MapPin className="size-4" />
                      <span>Placeholder διεύθυνσης</span>
                    </a>
                    <a
                      href="tel:+3069XXXXXXX"
                      className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Phone className="size-4" />
                      <span>+30 69X XXX XXXX</span>
                    </a>
                    <a
                      href="mailto:hello@ateleia.gr"
                      className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Mail className="size-4" />
                      <span>hello@ateleia.gr</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="icon" className="rounded-full">
                      <a href="https://wa.me/3069XXXXXXX" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                        <MessageCircle className="size-4" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="icon" className="rounded-full">
                      <a href="https://t.me/username" target="_blank" rel="noreferrer" aria-label="Telegram">
                        <Send className="size-4" />
                      </a>
                    </Button>
                  </div>

                  <div
                    className="flex h-28 items-center justify-center rounded-md border border-border bg-card text-xs text-muted-foreground"
                    style={brushStrokeStyle}
                  >
                    Placeholder χάρτη
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </section>
      </div>
    </div>
  );
}
