/**
 * Theme configuration for the application.
 *
 * This file is the ONLY place where themes are created and exported.
 * All components import lightTheme / darkTheme from here.
 *
 * Values come from .specify/memory/design-language.md.
 * NEVER use webLightTheme or webDarkTheme directly.
 */

import {
  createLightTheme,
  createDarkTheme,
  BrandVariants,
  Theme,
} from "@fluentui/react-components";

// --- Brand Palette ---
// Source: Fluent 2 Web Figma Kit (default palette)
// To customize: update .specify/memory/design-language.md Section 1
// and regenerate this file, or modify values below directly.
const brandVariants: BrandVariants = {
  10: "#061724",
  20: "#082338",
  30: "#0A2E4A",
  40: "#0C3B5E",
  50: "#0E4775",
  60: "#0F548C",
  70: "#115EA3",
  80: "#0F6CBD",
  90: "#2886DE",
  100: "#479FEF",
  110: "#62ABF5",
  120: "#77B7F7",
  130: "#96C6FA",
  140: "#B4D6FA",
  150: "#CFE4FA",
  160: "#EBF3FC",
};

// --- Light Theme ---
export const lightTheme: Theme = {
  ...createLightTheme(brandVariants),

  // ─── Typography Overrides ───
  // fontFamilyBase: "'Inter', 'Segoe UI', sans-serif",

  // ─── Spacing Overrides ───
  // spacingHorizontalM: "10px",

  // ─── Shape Overrides ───
  // borderRadiusMedium: "6px",

  // ─── Semantic Color Overrides ───
  // colorStatusDangerForeground1: "#B10E1C",
};

// --- Dark Theme ---
export const darkTheme: Theme = {
  ...createDarkTheme(brandVariants),

  // Apply same structural overrides (typography, spacing, shape)
  // fontFamilyBase: "'Inter', 'Segoe UI', sans-serif",
};
