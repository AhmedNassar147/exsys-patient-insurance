/*
 *
 * helper: `normalizeSlides`
 *
 */
import { CarouselSlideItemProps } from "@exsys-patient-insurance/types";

export type NormalizeConfig = {
  slides: (string | CarouselSlideItemProps)[];
  doctorName?: string;
  skipUploadedBy?: boolean;
};

const normalizeSlides = ({
  slides,
  doctorName,
  skipUploadedBy,
}: NormalizeConfig) => {
  const length = slides?.length;

  if (!length) {
    return [];
  }

  const [firstItem] = slides;

  if (typeof firstItem === "string" || !firstItem) {
    return [];
  }

  return slides?.map((item, index) => {
    const { image_date, image, key } = item as CarouselSlideItemProps;
    const shouldSkipUploadedBy = skipUploadedBy && !(doctorName && image_date);

    return {
      key: key || key === 0 ? key : index,
      image,
      caption: shouldSkipUploadedBy
        ? ""
        : `__t__upldby  ${doctorName || ""}  ${image_date || ""}`,
    } as CarouselSlideItemProps;
  });
};

export default normalizeSlides;
