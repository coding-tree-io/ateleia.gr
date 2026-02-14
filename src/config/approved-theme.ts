export type ApprovedTheme = {
  paletteName: string;
  typography: {
    stylesheetUrl: string;
    headingFamily: string;
    bodyFamily: string;
  };
};

export const approvedTheme: ApprovedTheme = {
  paletteName: 'Terracotta Calm',
  typography: {
    stylesheetUrl:
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Nunito:wght@400;500;600;700&display=swap',
    headingFamily: '"Cormorant Garamond", Georgia, serif',
    bodyFamily: '"Nunito", "Noto Sans", system-ui, sans-serif',
  },
};
