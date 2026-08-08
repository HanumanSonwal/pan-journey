"use client";

import { useTheme } from "@/modules/theme/hooks/useTheme";
import { useEffect } from "react";

const THEME_VARIABLES = {
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

export default function useApplyTheme() {
  const { theme } = useTheme();

  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;

    Object.entries(THEME_VARIABLES).forEach(([key, cssVariable]) => {
      const value = theme[key];

      if (value) {
        root.style.setProperty(cssVariable, value);
      }
    });

    /* Temporary until backend provides these */
    root.style.setProperty("--theme-border-gradient-start", "#72C0F0");

    root.style.setProperty("--theme-border-gradient-end", "#0F6A75");

    console.log("✅ Theme Applied", theme);

    console.log(
  "Primary Variable =",
  getComputedStyle(document.documentElement)
    .getPropertyValue("--theme-primary")
);
  }, [theme]);
}
