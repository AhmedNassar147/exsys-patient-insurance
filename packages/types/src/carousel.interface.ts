/*
 *
 * carousel: `@exsys-patient-insurance/types`.
 *
 */
import { SwipeViewsProps } from "./swipe-views.interface";

export type CarouselSlideItemProps = {
  image: string;
  key?: string | number;
  image_date?: string;
  caption?: string;
  [x: string]: any;
};

export type CarouselProps = Omit<SwipeViewsProps, "children" | "width"> & {
  data: (CarouselSlideItemProps | string)[];
  useBase64?: boolean;
  useZoom?: boolean;
};

export type ItemImagesAndHtmlDataPropType = {
  htmlDetails: string;
  data: CarouselSlideItemProps[];
};
