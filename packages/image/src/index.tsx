/*
 *
 * Package: `@exsys-patient-insurance/image`
 *
 */
import { useState, useCallback, useRef, useEffect, memo } from "react";
import {
  Container,
  BaseImage,
  SmoothNoImage,
  Loader,
  SmoothPlaceHolder,
} from "./styled";
import ImageProps from "./index.interface";

const ImageComponent = ({
  alt,
  src,
  width,
  height,
  borderRadius,
}: ImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isValidSrc, setIsValidSrc] = useState(true);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const showImage = useCallback(() => setImageLoaded(true), []);
  const handleError = useCallback(() => setIsValidSrc(false), []);

  useEffect(() => {
    if (isValidSrc) {
      new Image().src = src;
    }

    if (imageRef.current?.complete) {
      showImage();
    }
  }, [src, showImage, isValidSrc]);

  return (
    <Container width={width} height={height} borderRadius={borderRadius}>
      {isValidSrc ? (
        <BaseImage
          ref={imageRef}
          visible={imageLoaded}
          borderRadius={borderRadius}
          src={src}
          alt={alt}
          onLoad={showImage}
          loading="lazy"
          onError={handleError}
        />
      ) : (
        <SmoothNoImage borderRadius={borderRadius} title={alt}>
          {alt?.[0] ?? ""}
        </SmoothNoImage>
      )}

      {isValidSrc && !imageLoaded && (
        <SmoothPlaceHolder>
          <Loader borderRadius={borderRadius} />
        </SmoothPlaceHolder>
      )}
    </Container>
  );
};

export default memo(ImageComponent);
