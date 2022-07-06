/*
 *
 * Types: `@exsys-patient-insurance/modal-carousel`.
 *
 */
import {
  CarouselProps,
  CarouselSlideItemProps,
} from "@exsys-patient-insurance/types";

export interface CarouselDotsView {
  active?: boolean;
}

export interface ModalTitleProps {
  title: React.ReactNode;
  caption: string;
  onDelete?: () => void;
  data: (CarouselSlideItemProps | string)[];
  activeSlide: number;
  onDotClicked: (index: number) => () => void;
}

export interface ModalCarouselProps extends CarouselProps {
  title: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  width?: string;
  fullScreen?: boolean;
  htmlDetails?: string;
  useImagesGallery?: boolean;
  destroyOnClose?: boolean;
  onDelete?: (currentItemData: CarouselSlideItemProps) => void;
  disableMouseDownSwipe?: boolean;
}
