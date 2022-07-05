/*
 *
 * helpers: `fileHelpers`.
 *
 */
const isImage = (type: string) => {
  if (type) {
    const hasImageString = type.includes("image/");

    const hasImageExt = ["jpg", "jpeg", "png", "gif", "svg", "bmp"].includes(
      type
    );

    return hasImageString || hasImageExt;
  }
  return null;
};

const isPdfFile = (type: string) => ["application/pdf", "pdf"].includes(type);

export const getImgTypeFromFile = (fileData?: File) => {
  if (!fileData) {
    return null;
  }

  const { type } = fileData;

  if (type) {
    const isImageType = isImage(type);
    const isPdfType = isPdfFile(type);

    return isImageType ? type.replace("image/", "") : isPdfType ? "pdf" : null;
  }

  return null;
};

type NormalizeImageType = {
  file: File;
  imageType: string;
};

export const normalizeNativeInputFile = (file: File): NormalizeImageType => {
  const imageType = getImgTypeFromFile(file) || "";
  return { file, imageType };
};
