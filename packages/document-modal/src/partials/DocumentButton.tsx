/*
 *
 * Component: `DocumentButton`.
 *
 */
import { memo } from "react";
import Button, { ButtonTypes } from "@exsys-patient-insurance/button";
import PrinterIcon from "@exsys-patient-insurance/printer-icon";

interface PdfDocumentButtonProps {
  icon?: React.ReactNode;
  onClick?: () => void;
  width?: string;
  block?: boolean;
  usePrintIcon?: boolean;
  iconType?: ButtonTypes;
  disabled?: boolean;
  buttonLabel?: string;
}

const DocumentButton = ({
  onClick,
  icon,
  width,
  block,
  usePrintIcon,
  iconType,
  disabled,
  buttonLabel,
}: PdfDocumentButtonProps) => (
  <Button
    onClick={onClick}
    icon={icon}
    width={width}
    block={block}
    type={usePrintIcon ? "primary" : iconType}
    disabled={disabled}
    label={buttonLabel}
  >
    {icon || !usePrintIcon ? null : (
      <PrinterIcon width="1.2em" height="1.2em" />
    )}
  </Button>
);
DocumentButton.defaultProps = {
  width: "50px",
  iconType: "default",
};

export default memo(DocumentButton);
