export const THEME_VARIABLES = {
  primaryColor: "--theme-primary",
  secondaryColor: "--theme-secondary",
  hoverColor: "--theme-hover",

  textPrimary: "--theme-text-primary",
  textSecondary: "--theme-text-secondary",

  borderColor: "--theme-border",

  gradientStart: "--theme-gradient-start",
  gradientEnd: "--theme-gradient-end",

  searchBarBackgroundColor: "--theme-search-bar-background",
  searchBarButtonBackgroundColor: "--theme-search-bar-button-background",

  footerBackgroundColor: "--theme-footer-background",
  footerTextColor: "--theme-footer-text",

  websiteBackgroundColor: "--theme-website-background",

  whiteColor: "--theme-white",
};

export const getThemeCSSVariables = (theme) => {
  if (!theme) {
    return {};
  }

  const variables = {};

  Object.entries(THEME_VARIABLES).forEach(([apiKey, cssVariable]) => {
    const value = theme?.[apiKey];

    if (value) {
      variables[cssVariable] = value;
    }
  });

  return variables;
};
