/*
 *
 * Types: `@exsys-patient-insurance/labeled-view-like-input`.
 *
 */
import type { LabeledInputProps } from "@exsys-patient-insurance/labeled-input";
import type { ColorsType } from "@exsys-patient-insurance/types";

export interface LabeledViewLikeInputProps extends LabeledInputProps {
  minWidth?: string;
  padding?: string;
  bordered?: boolean;
  align?: string;
  ellipsis?: "true";
  lineheight?: string;
  justify?: string;
  onClick?: () => void;
  color?: ColorsType;
}
