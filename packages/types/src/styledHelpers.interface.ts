/*
 *
 * Types: `styled-helpers`.
 *
 */
import { fontSizes, spacings, colors } from "@exsys-clinio/theme-values";

export interface EllipsisCssHelperProps {
  ellipsis?: "true";
}

export type FontSizeType = keyof typeof fontSizes;

export type SpacingsType = keyof typeof spacings;

export type ColorsType = keyof typeof colors;

export interface TextFontSizeProps {
  fontSize?: FontSizeType;
}
