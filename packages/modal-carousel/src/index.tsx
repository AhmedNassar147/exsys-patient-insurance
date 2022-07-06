/*
 *
 * Package: `@exsys-patient-insurance/modal-carousel`.
 *
 */
import { memo, useMemo, useRef, useCallback, useState } from "react";
import Flex from "@exsys-patient-insurance/flex";
import { isObjHasData } from "@exsys-patient-insurance/helpers";
import { useCreateSwipeActionsFromRef } from "@exsys-patient-insurance/swipe-views";
import Carousel from "@exsys-patient-insurance/carousel";
import Modal from "@exsys-patient-insurance/modal";
import {
  SwipeViewRefValuesType,
  CarouselSlideItemProps,
  RecordType,
} from "@exsys-patient-insurance/types";
import TitleView from "./partials/TitleView";
import CarouselWIthGalleryIndicators from "./partials/CarouselWIthGalleryIndicators";
import useNormalizeSlides from "./hooks/useNormalizeSlides";
import { ModalCarouselProps } from "./index.interface";

const ModalCarousel = ({
  visible,
  onClose,
  title,
  onIndexChanged,
  initialActiveIndex,
  data,
  width,
  onDelete,
  fullScreen,
  useZoom,
  htmlDetails,
  useImagesGallery,
  destroyOnClose,
  ...props
}: ModalCarouselProps) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(
    () => initialActiveIndex || 0
  );
  const swipeRef = useRef<SwipeViewRefValuesType | undefined>();

  const { goToSlide } = useCreateSwipeActionsFromRef(swipeRef);
  const normalizedImagesForGallery = useNormalizeSlides({
    slides: data,
    skipUploadedBy: true,
  });

  const isDataExsist = !!(data && data.length);

  const shouldLoadGallery = !!(
    useImagesGallery && normalizedImagesForGallery.length
  );

  const handleIndexChanged = useCallback(
    (currentIndex: number) => {
      onIndexChanged?.(currentIndex);

      setCurrentItemIndex(currentIndex);
    },
    [onIndexChanged]
  );

  const onDotClicked = useCallback(
    (dotIndex: number) => () => {
      if (currentItemIndex !== dotIndex) {
        handleIndexChanged(dotIndex);
        goToSlide(dotIndex);
      }
    },
    [currentItemIndex, goToSlide, handleIndexChanged]
  );

  const renderTitle = useMemo(() => {
    let caption = "",
      itemData = {};

    if (isDataExsist) {
      const item = data.find((_: any, idx: number) => idx === currentItemIndex);

      if (item && typeof item !== "string" && isObjHasData(item)) {
        const { image, ...rest } = item;
        caption = rest.caption || "";
        itemData = rest;
      }
    }

    const handleDelete = onDelete
      ? () => onDelete(itemData as CarouselSlideItemProps)
      : undefined;

    return (
      <TitleView
        title={title}
        caption={!useZoom ? caption : ""}
        onDelete={handleDelete}
        data={data}
        onDotClicked={onDotClicked}
        activeSlide={currentItemIndex}
      />
    );
  }, [
    isDataExsist,
    onDelete,
    title,
    useZoom,
    data,
    onDotClicked,
    currentItemIndex,
  ]);

  const onSelectItemFromGallery = useCallback(
    (_: RecordType, selectedIndex: number) => {
      onDotClicked(selectedIndex)();
    },
    [onDotClicked]
  );

  const allCarouselProps = {
    data,
    onIndexChanged,
    initialActiveIndex,
    useZoom,
    ...props,
  };

  return (
    <Modal
      width={width}
      fullScreen={fullScreen}
      title={renderTitle}
      noFooter
      visible={visible}
      onClose={onClose}
      usePortal
      destroyOnClose={destroyOnClose}
    >
      {useImagesGallery ? (
        <Flex width="100%" justify="space-between" height="100%">
          <CarouselWIthGalleryIndicators
            width={htmlDetails ? "69%" : "100%"}
            ref={swipeRef}
            shouldLoadGallery={shouldLoadGallery}
            normalizedImagesForGallery={normalizedImagesForGallery}
            onSelectItemFromGallery={onSelectItemFromGallery}
            {...allCarouselProps}
          />

          {htmlDetails && (
            <Flex
              overflow="auto"
              width="30%"
              height="100%"
              column="true"
              dangerouslySetInnerHTML={{ __html: htmlDetails }}
            />
          )}
        </Flex>
      ) : (
        <Carousel ref={swipeRef} {...allCarouselProps} />
      )}
    </Modal>
  );
};
ModalCarousel.defaultProps = {
  initialActiveIndex: 0,
  width: "900px",
  fullScreen: true,
  destroyOnClose: true,
};

export default memo(ModalCarousel);
export { default as useNormalizeSlides } from "./hooks/useNormalizeSlides";
