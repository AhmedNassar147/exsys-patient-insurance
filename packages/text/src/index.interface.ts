/*
 *
 * Types: `@exsys-clinio/text`.
 *
 */
import { TextFontSizeProps, EllipsisCssHelperProps } from "@exsys-clinio/types";

export interface TextPropsStyleSheet
  extends TextFontSizeProps,
    EllipsisCssHelperProps {
  color?: string;
  align?: string;
  margin?: string;
  width?: string;
  weight?: string;
  padding?: string;
  flex?: string | number;
  colon?: boolean;
  cursor?: string;
  lineheight?: string;
  indent?: string;
  lines?: number;
}

export interface BaseTextProps {
  children: React.ReactNode;
  tag?: "fragment" | string;
  className?: string;
  disableTranslation?: boolean;
  [key: string]: any;
}

export interface TextProps extends TextPropsStyleSheet, BaseTextProps {}
