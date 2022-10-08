/*
 *
 * Types: `@exsys-patient-insurance/text`.
 *
 */
import {
  TextFontSizeProps,
  EllipsisCssHelperProps,
} from "@exsys-patient-insurance/types";

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

export interface TitleProps extends TextProps {
  bottomborder?: boolean | "true";
  bordercolor?: string;
  center?: boolean;
}
