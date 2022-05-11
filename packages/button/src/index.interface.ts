/*
 *
 * Types: `@exsys-clinio/button`.
 *
 */
import { ValuesOfRecordAsOptions } from "@exsys-clinio/types";
import React from "react";
import { BUTTON_TYPES, BUTTON_SIZES, BUTTON_SHAPES } from "./constants";

export type ButtonTypes = ValuesOfRecordAsOptions<typeof BUTTON_TYPES>;
export type ButtonSizeType = ValuesOfRecordAsOptions<typeof BUTTON_SIZES>;
export type ButtonShapeType = ValuesOfRecordAsOptions<typeof BUTTON_SHAPES>;

export interface BaseProps {
  backgroundcolor?: string;
  blink?: boolean;
  width?: string;
  styleType?: ButtonTypes;
  block?: boolean;
  ghost?: boolean;
  height?: string;
  size?: ButtonSizeType;
  disabled?: boolean;
  loading?: boolean;
  margin?: string;
  shape?: ButtonShapeType;
  padding?: string;
  borderRadius?: string;
  borderWidth?: string;
  minWidth?: string;
  color?: string;
}

export default interface ButtonProps
  extends BaseProps,
    React.PropsWithChildren<{
      className?: string;
      label?: string;
      onClick?: () => void;
      icon?: React.ReactNode;
      type?: ButtonTypes;
      htmlType?: "button" | "submit" | "reset";
      href?: string;
      target?: string;
      title?: string;
      disableTranslation?: boolean;
    }> {}
