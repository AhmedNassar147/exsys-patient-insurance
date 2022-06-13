/*
 *
 * Types: `@exsys-patient-insurance/image`
 *
 */
import { SpacingsType } from "@exsys-patient-insurance/types";

export interface WrapperProps {
  width?: SpacingsType;
  height?: SpacingsType;
  borderRadius?: string;
}

export interface VisibilityProps extends Pick<WrapperProps, "borderRadius"> {
  visible?: boolean;
}

export default interface AvatarProps extends WrapperProps {
  src: string;
  alt: string;
}
