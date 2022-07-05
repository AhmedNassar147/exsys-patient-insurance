/*
 *
 * Types: `@exsys-patient-insurance/file-upload-input-field`.
 *
 */
import { onChangeEvent } from "@exsys-patient-insurance/types";

export interface UploadWrapperProps {
  width?: string;
  height?: string;
  flex?: number;
  dashed?: boolean;
  border?: string;
  borderraduis?: string;
  backgroundcolor?: string;
  margin?: string;
}

export interface PlaceholderProps {
  imageUrl?: string;
  placeholderIconWrapperFlexDir?: string;
  placeholderIconWrapperGap?: string;
}

export interface UploadIconProps {
  uploadIconWidth?: string;
  uploadIconHeight?: string;
  hasMessageId?: boolean;
}

export default interface IProps
  extends UploadWrapperProps,
    PlaceholderProps,
    Omit<UploadIconProps, "hasMessageId"> {
  multiple?: boolean;
  name?: string;
  messageLabelId: string;
  accept?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  uploadIconOrAssetUrl?: string | React.ReactNode;
  onChange?: onChangeEvent;
  usePopOverImageDisplayer?: boolean;
  isPdfFile?: boolean;
}
