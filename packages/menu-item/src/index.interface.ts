/*
 *
 * Types: `@exsys-clinio/menu-item`.
 *
 */
export interface MenuItemProps
  extends React.PropsWithChildren<{
    height?: string;
    disabled?: boolean;
    selected?: boolean;
    onClick?: () => void;
    padding?: string;
    className?: string;
    selectedColor?: string;
    margin?: string;
    bordered?: boolean;
    width?: string;
    hideCheckIcon?: boolean;
    title?: string;
  }> {}
