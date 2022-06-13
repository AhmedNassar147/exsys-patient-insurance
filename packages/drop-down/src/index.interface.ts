/*
 *
 * Types: `@exsys-patient-insurance/drop-down`.
 *
 */
export interface InternalTriggerProps {
  triggerWidth?: string;
  margin?: string;
  disabled?: boolean;
}

export interface DropDownProps extends InternalTriggerProps {
  tabIndex?: number;
  className?: string;
  onOpen?: () => void;
  onBeforeClose?: () => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  zIndex?: number;
  menuWidth?: string;
  usePortal?: boolean;
  subtractionSidesValue?: string;
}

export type DropdownValuesForRefType = {
  openDropdown: () => void;
  closeDropdown: () => void;
};

export type DropdownRefType = React.MutableRefObject<
  DropdownValuesForRefType | undefined
>;
