/*
 *
 * Types: `@exsys-patient-insurance/labeled-view-like-input`.
 *
 */
import { LabeledInputProps } from "@exsys-patient-insurance/labeled-input";

export interface LabeledViewLikeInputProps extends LabeledInputProps {
  minWidth?: string;
  padding?: string;
  bordered?: boolean;
  align?: string;
  ellipsis?: "true";
  lineheight?: string;
  justify?: string;
}
