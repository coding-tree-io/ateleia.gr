export type ApprovedThemeTokens = {
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

export type ApprovedTheme = {
  paletteName: 'Terracotta Calm';
  fontName: 'Nunito';
  typography: {
    stylesheetUrl: string;
    headingFamily: string;
    bodyFamily: string;
  };
  tokens: ApprovedThemeTokens;
};

// Frozen client-approved direction.
export const approvedTheme: ApprovedTheme = {
  paletteName: 'Terracotta Calm',
  fontName: 'Nunito',
  typography: {
    stylesheetUrl: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap',
    headingFamily: '"Nunito", "Noto Sans", system-ui, sans-serif',
    bodyFamily: '"Nunito", "Noto Sans", system-ui, sans-serif',
  },
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
};

export function buildApprovedThemeCssVariables(tokens: ApprovedThemeTokens): Record<string, string> {
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
  };
}
