/*
 *
 * `createFullImageUrl`: `@exsys-patient-insurance/helpers`
 *
 */

/**
 * this function deals with full urls or relative ones.
 * @see {@link packages/file-upload-input-field/src/index.tsx} .
 * @example
 * `/exsys/i/imageName.jpg`
 * `http://exsys/i/imageName.jpg`
 * `data:image/png;base64,iVBORw0KGgoAA`
 * `blob:http://localhost:3000/8ac556fc-d875-4195-bf0d-cc113fcf1462`
 */
const createFullImageUrl = (imageUrl: string) => {
  if (!imageUrl) {
    return undefined;
  }

  const isFullImageUrl = /^(data.+;base64|http|blob:http)/gi.test(imageUrl);

  return isFullImageUrl
    ? imageUrl
    : `${process.env.REACT_APP_BASE_URL}${imageUrl}`;
};

export default createFullImageUrl;
