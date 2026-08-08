export const THEME_VARIABLES = {
  primaryColor: "--theme-primary",
  secondaryColor: "--theme-secondary",
  hoverColor: "--theme-hover",
  textPrimary: "--theme-text-primary",
  textSecondary: "--theme-text-secondary",
  borderColor: "--theme-border",
  whiteColor: "--theme-white",
  gradientStart: "--theme-gradient-start",
  gradientEnd: "--theme-gradient-end",
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
