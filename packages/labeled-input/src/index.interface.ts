/*
 *
 * Types: `@exsys-clinio/labeled-input`.
 *
 */
import { StringNumber } from "@exsys-clinio/types";

export type LabeledInputPropType = "inlined" | undefined;

export interface BaseLabeledInputProps {
  margin?: string;
  width?: string;
  height?: string;
  error?: string;
  className?: string;
  hidden?: boolean;
  labelmarginstart?: string;
}

export interface LabelProps {
  type?: LabeledInputPropType;
  left?: "true" | "false";
  labelmarginstart?: string;
  righttoleft: "true" | "false";
}

export interface LabeledInputProps
  extends BaseLabeledInputProps,
    React.PropsWithChildren<{
      type?: LabeledInputPropType;
      value?: StringNumber;
      label: string;
      useErrorHint?: boolean;
      forceFloatingLabel?: boolean;
    }> {}
