/*
 *
 * Types: `@exsys-clinio/async-awaiter`.
 *
 */
import { FlexProps } from "@exsys-clinio/flex";

export default interface Props {
  height?: string;
  children: React.ReactNode;
  loading?: boolean;
  noData?: boolean;
  noDataText?: string;
  setWrapperAsColumn?: boolean;
  wrapperProps?: FlexProps;
  margin?: string;
  noWrapper?: boolean;
}
