/*
 *
 * Types: `@exsys-clinio/loading-icon`.
 *
 */
import { BaseSvgProps } from "@exsys-clinio/types";

export default interface LoadingIconProps
  extends Omit<BaseSvgProps, "style" | "onClick"> {}
