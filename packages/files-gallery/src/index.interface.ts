/*
 *
 * Types: `@exsys-patient-insurance/files-gallery`.
 *
 */
import { StringNumber, RecordType } from "@exsys-patient-insurance/types";

export interface WrapperProps {
  width?: string;
  gap?: string;
  padding?: string;
  margin?: string;
  justify?: string;
  bordered?: boolean;
}

export interface GalleryItemViewProps {
  itemWidth?: string;
  itemHeight?: string;
}

export type GalleryItemProps = RecordType<StringNumber>;

type SelectAction<T> = (fileData: T, currentFileIndex: number) => void;

export default interface FilesGalleryProps<T extends GalleryItemProps>
  extends WrapperProps,
    GalleryItemViewProps {
  dataSource?: T[];
  itemKeyPropName: string;
  fileUrlKeyPropName?: string;
  onDeleteFile?: SelectAction<T>;
  onSelectItem?: SelectAction<T>;
}
