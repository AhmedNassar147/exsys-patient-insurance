/*
 *
 * Types: `@exsys-patient-insurance/tag`.
 *
 */

export default interface TagProps
  extends React.PropsWithChildren<{
    color?: string;
    closable?: boolean;
    onClose?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    margin?: string;
    height?: string;
  }> {}
