/*
 *
 * Package: `@exsys-patient-insurance/files-gallery`.
 *
 */
import { memo, useCallback } from "react";
import { useFilesFullUrlsFromRelativePaths } from "@exsys-patient-insurance/hooks";
import DeleteIcon from "@exsys-patient-insurance/delete-icon";
import { GalleryWrapper, GalleryItemView, StyledButton } from "./styled";
import FilesGalleryProps, { GalleryItemProps } from "./index.interface";

const FilesGallery = <T extends GalleryItemProps>({
  dataSource,
  width,
  gap,
  justify,
  margin,
  padding,
  itemWidth,
  itemHeight,
  itemKeyPropName,
  fileUrlKeyPropName,
  onDeleteFile,
  onSelectItem,
  bordered,
}: FilesGalleryProps<T>) => {
  const filesFullPaths = useFilesFullUrlsFromRelativePaths(
    dataSource,
    fileUrlKeyPropName
  );
  const handleItemAction = useCallback(
    (fileData: T, actionType: "select" | "delete", currentFileIndex: number) =>
      () => {
        if (onDeleteFile && actionType === "delete") {
          onDeleteFile(fileData, currentFileIndex);
        }

        if (onSelectItem && actionType === "select") {
          onSelectItem(fileData, currentFileIndex);
        }
      },
    [onDeleteFile, onSelectItem]
  );

  return (
    <GalleryWrapper
      width={width}
      gap={gap}
      padding={padding}
      margin={margin}
      justify={justify}
      bordered={bordered}
    >
      {filesFullPaths?.map((fileData: T, currentFileIndex: number) => {
        let fileUrl = fileData as unknown as string;
        let fileKey = `${currentFileIndex}`;

        if (typeof fileData === "object" && fileUrlKeyPropName) {
          const {
            [fileUrlKeyPropName]: fileUrlMisleadingType,
            [itemKeyPropName]: key,
          } = fileData;

          fileUrl = fileUrlMisleadingType as string;
          fileKey = key as string;
        }

        const isPdfFile = fileUrl.endsWith(".pdf");
        const selectHandler = handleItemAction(
          fileData,
          "select",
          currentFileIndex
        );

        return (
          <GalleryItemView
            itemHeight={itemHeight}
            itemWidth={itemWidth}
            key={fileKey}
          >
            {isPdfFile && (
              <object
                data={fileUrl}
                width="100%"
                children="Your browser does not support pdf files."
                onClick={selectHandler}
                height={itemHeight}
              />
            )}

            {!isPdfFile && !!fileUrl && (
              <img
                src={fileUrl}
                alt="gallery-item"
                loading="lazy"
                width="100%"
                height="100%"
                onClick={selectHandler}
              />
            )}

            {onDeleteFile && (
              <StyledButton
                type="danger"
                icon={<DeleteIcon />}
                shape="circle"
                size="small"
                onClick={handleItemAction(fileData, "delete", currentFileIndex)}
              />
            )}
          </GalleryItemView>
        );
      })}
    </GalleryWrapper>
  );
};
FilesGallery.defaultProps = {
  gap: "10px",
  width: "100%",
  padding: "10px",
  margin: "10px 0 0",
  itemWidth: "110px",
  itemHeight: "110px",
  justify: "flex-start",
  bordered: true,
};

// @ts-ignore we will fix this when moving to the new structure.
export default memo(FilesGallery) as typeof FilesGallery;
