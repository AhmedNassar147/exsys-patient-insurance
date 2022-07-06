/*
 *
 * Package: `@exsys-patient-insurance/carousel`.
 *
 */
import { memo, useCallback, forwardRef } from "react";
import SwipeViews from "@exsys-patient-insurance/swipe-views";
import createLazyLoadedComponent from "@exsys-patient-insurance/react-lazy";
import {
  isObjHasData,
  createFullImageUrl,
} from "@exsys-patient-insurance/helpers";
import {
  CarouselProps,
  SwipeViewsRef,
  SwipeViewRefValuesType,
} from "@exsys-patient-insurance/types";

const LazyLoadedZoom = createLazyLoadedComponent(
  () =>
    import(
      "@exsys-patient-insurance/zoom" /* webpackChunkName: "exsys-patient-insurance.zoom" */
    )
);

const BASE_64 = "data:image/jpeg;base64,";

const Carousel = (
  { data, useBase64, useZoom, ...props }: CarouselProps,
  carouselRef: SwipeViewsRef
) => {
  const getImagSrc = useCallback(
    (image: string) =>
      useBase64 ? BASE_64 + image : createFullImageUrl(image),
    [useBase64]
  );

  if (!data || !data?.length) {
    return null;
  }

  return (
    <SwipeViews {...props} ref={carouselRef}>
      {data.map((item, currentIndex) => {
        let itemSrc: string = item as string;
        let caption: string = "";

        if (typeof item !== "string" && isObjHasData(item)) {
          itemSrc = item.image;
          caption = item.caption || "";
        }

        const imageFileUrl = getImagSrc(itemSrc);

        if (!itemSrc) {
          return null;
        }

        if (itemSrc.includes("pdf")) {
          return (
            <object
              data={itemSrc}
              width="100%"
              height="100%"
              key={currentIndex}
              children="Your browser does not support pdf files."
            />
          );
        }

        const ImageComponent = (
          <img
            src={imageFileUrl}
            key={currentIndex}
            alt="modal-carousel-pic"
            width="100%"
          />
        );

        return useZoom ? (
          <LazyLoadedZoom
            key={currentIndex}
            shouldMountChunk
            fileUrl={imageFileUrl}
            leftSideText={caption}
          >
            {ImageComponent}
          </LazyLoadedZoom>
        ) : (
          ImageComponent
        );
      })}
    </SwipeViews>
  );
};

export default memo(
  // @ts-ignore ignore react `forwardRef` don't work well.
  forwardRef<SwipeViewRefValuesType | undefined, CarouselProps>(Carousel)
);
