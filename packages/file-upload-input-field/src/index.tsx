/*
 *
 * `FileUploadInputField`: `@exsys-patient-insurance/file-upload-input-field`.
 *
 */
import { useCallback, memo } from "react";
import {
  // useOpenCloseActionsWithState,
  useFilesFullUrlsFromRelativePaths,
} from "@exsys-patient-insurance/hooks";
import { UPLOAD_ACCEPTED_EXTENSIONS } from "@exsys-patient-insurance/global-app-constants";
import {
  UploadIconImage,
  HiddenInput,
  UploadWrapper,
  StyledText,
  ImagePlaceHolder,
} from "./styled";
import IProps from "./index.interface";

const FileUploadInputField = ({
  messageLabelId,
  name,
  multiple,
  disabled,
  accept,
  imageUrl,
  uploadIconOrAssetUrl,
  onChange,
  uploadIconWidth,
  uploadIconHeight,
  usePopOverImageDisplayer,
  placeholderIconWrapperFlexDir,
  placeholderIconWrapperGap,
  isPdfFile,
  ...props
}: IProps) => {
  // const { visible, setVisibility } = useOpenCloseActionsWithState();

  const fullImageUrl = useFilesFullUrlsFromRelativePaths(imageUrl);

  const handleChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { files, name: fieldName } = target;

      onChange?.({
        name: fieldName,
        value: files ? (multiple ? files : files[0]) : undefined,
      });
    },
    [multiple, onChange]
  );

  const shouldRenderPreviewer = imageUrl && usePopOverImageDisplayer;

  return (
    <UploadWrapper {...props} borderedWhenHover={!shouldRenderPreviewer}>
      <ImagePlaceHolder
        imageUrl={isPdfFile ? undefined : fullImageUrl}
        placeholderIconWrapperFlexDir={placeholderIconWrapperFlexDir}
        placeholderIconWrapperGap={placeholderIconWrapperGap}
      >
        {fullImageUrl && isPdfFile && (
          <object data={fullImageUrl} width="100%" height="100%">
            {`Your browser does not support pdf files.`}
          </object>
        )}
        {!imageUrl && (
          <>
            {typeof uploadIconOrAssetUrl === "string" ? (
              <UploadIconImage
                alt="upload"
                src={uploadIconOrAssetUrl}
                uploadIconWidth={uploadIconWidth}
                uploadIconHeight={uploadIconHeight}
                hasMessageId={!!messageLabelId}
              />
            ) : (
              uploadIconOrAssetUrl
            )}

            {messageLabelId && (
              <StyledText tag="span">{messageLabelId}</StyledText>
            )}
          </>
        )}
      </ImagePlaceHolder>
      <HiddenInput
        accept={accept}
        onChange={handleChange}
        type="file"
        name={name}
        multiple={multiple}
        disabled={disabled}
      />

      {/* <LazyLoadedImagePreviewer
        shouldMountChunk={shouldRenderPreviewer}
        visible={visible}
        setVisibility={setVisibility}
        fullImageUrl={fullImageUrl}
      /> */}
    </UploadWrapper>
  );
};
FileUploadInputField.defaultProps = {
  name: "file",
  accept: UPLOAD_ACCEPTED_EXTENSIONS.IMAGES,
  width: "43px",
  height: "43px",
  borderraduis: "3px",
  messageLabelId: "clcktoupldfile",
  uploadIconWidth: "42px",
  uploadIconHeight: "33px",
};

export default memo(FileUploadInputField);
