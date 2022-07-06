/*
 *
 * Component: `CarouselWIthGalleryIndicators`.
 *
 */
import { memo, forwardRef, useState, useCallback } from "react";
import Flex from "@exsys-patient-insurance/flex";
import Carousel from "@exsys-patient-insurance/carousel";
import Button from "@exsys-patient-insurance/button";
import FilesGallery from "@exsys-patient-insurance/files-gallery";
import PausePlayIcon from "@exsys-patient-insurance/pause-play-icon";
import {
  RecordType,
  CarouselSlideItemProps,
  CarouselProps,
  SwipeViewsRef,
} from "@exsys-patient-insurance/types";

type CarouselWIthGalleryIndicatorsPropType = CarouselProps & {
  width?: string;
  shouldLoadGallery?: boolean;
  normalizedImagesForGallery: CarouselSlideItemProps[];
  onSelectItemFromGallery: (
    currentSelectedGalleryItem: RecordType,
    selectedIndex: number
  ) => void;
};

const CarouselWIthGalleryIndicators = (
  {
    width = "100%",
    shouldLoadGallery,
    normalizedImagesForGallery,
    data,
    onSelectItemFromGallery,
    loop,
    ...carouselProps
  }: CarouselWIthGalleryIndicatorsPropType,
  carouselRef: SwipeViewsRef
) => {
  const [hasLoopEnabled, setLoopState] = useState(() => loop || false);

  const toggleLoop = useCallback(
    () => setLoopState((previous) => !previous),
    []
  );

  return (
    <Flex width={width} height="100%" overflow="auto" column="true">
      <Flex
        width="100%"
        height={shouldLoadGallery ? `calc(100% - 95px)` : "100%"}
      >
        <Carousel
          ref={carouselRef}
          data={data}
          {...carouselProps}
          loop={hasLoopEnabled}
        />
      </Flex>

      {shouldLoadGallery && (
        <Flex
          width="100%"
          height="auto"
          align="center"
          gap="10px"
          wrap="true"
          margin="10px 0 0"
        >
          <FilesGallery
            shouldMountChunk={shouldLoadGallery}
            dataSource={normalizedImagesForGallery}
            itemKeyPropName="key"
            fileUrlKeyPropName="image"
            itemHeight="40px"
            itemWidth="40px"
            padding="6px"
            margin="0"
            justify="center"
            width="95%"
            onSelectItem={onSelectItemFromGallery}
          />

          <Button
            icon={<PausePlayIcon type={hasLoopEnabled ? "pause" : "play"} />}
            type="primary"
            size="large"
            shape="circle"
            onClick={toggleLoop}
          />
        </Flex>
      )}
    </Flex>
  );
};

// @ts-ignore ignore react `forwardRef` don't work well.
export default memo(forwardRef(CarouselWIthGalleryIndicators));
