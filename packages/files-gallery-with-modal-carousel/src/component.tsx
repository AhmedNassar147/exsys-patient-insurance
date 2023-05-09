/*
 *
 * `FilesGalleryWithModalCarousel`: `@exsys-patient-insurance/files-gallery-with-modal-carousel`.
 *
 */
import { memo, useState, useCallback } from "react";
import ModalCarousel, {
  useNormalizeSlides,
} from "@exsys-patient-insurance/modal-carousel";
import { useOpenCloseActionsWithState } from "@exsys-patient-insurance/hooks";
import FilesGallery from "@exsys-patient-insurance/files-gallery";
import { FilesGalleryWithModalCarouselProps } from "./index.interface";

const FilesGalleryWithModalCarousel = ({
  dataSource,
  itemKeyPropName,
  fileUrlKeyPropName,
  onDeleteFile,
  title,
  modalFullScreen,
  htmlDetails,
  itemHeight,
  itemWidth,
  bordered,
  padding,
  margin,
  gap,
  loop,
}: FilesGalleryWithModalCarouselProps) => {
  const [currentIndex, onIndexChanged] = useState(0);

  const slides = useNormalizeSlides({
    slides: dataSource,
    skipUploadedBy: true,
  });
  const { visible, handleOpen, handleClose } = useOpenCloseActionsWithState();

  const handleModalCarouselShow = useCallback(
    (_: unknown, currentIndex: number) => {
      onIndexChanged(currentIndex);
      handleOpen();
    },
    [handleOpen]
  );

  return (
    <>
      <FilesGallery
        shouldMountChunk
        dataSource={dataSource}
        itemKeyPropName={itemKeyPropName}
        fileUrlKeyPropName={fileUrlKeyPropName}
        onDeleteFile={onDeleteFile}
        onSelectItem={handleModalCarouselShow}
        itemHeight={itemHeight}
        itemWidth={itemWidth}
        bordered={bordered}
        padding={padding}
        margin={margin}
        gap={gap}
      />
      <ModalCarousel
        visible={visible}
        data={slides}
        title={title || "gallery"}
        initialActiveIndex={currentIndex}
        onClose={handleClose}
        fullScreen={modalFullScreen}
        htmlDetails={htmlDetails}
        loop={loop}
        useZoom
        useImagesGallery
      />
    </>
  );
};

FilesGalleryWithModalCarousel.defaultProps = {
  loop: true,
};

export default memo(FilesGalleryWithModalCarousel);
