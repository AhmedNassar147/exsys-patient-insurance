/*
 *
 * Types: `@exsys-clinio/close-icon`.
 *
 */
export default interface CloseIconProps {
  color?: string;
  hoverColor?: string;
  width?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  disabled?: boolean;
  margin?: string;
  size?: string;
}
