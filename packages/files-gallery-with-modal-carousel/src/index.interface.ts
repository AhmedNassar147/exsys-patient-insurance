/*
 *
 * Types: `@exsys-patient-insurance/files-gallery-with-modal-carousel`.
 *
 */
import { CarouselSlideItemProps } from "@exsys-patient-insurance/types";
import { FilesGalleryProps } from "@exsys-patient-insurance/files-gallery";

export interface FilesGalleryWithModalCarouselProps
  extends Omit<
    FilesGalleryProps<CarouselSlideItemProps>,
    "onSelectItem" | "dataSource"
  > {
  dataSource: CarouselSlideItemProps[];
  title?: string;
  modalFullScreen?: boolean;
  htmlDetails?: string;
  loop?: boolean;
}
