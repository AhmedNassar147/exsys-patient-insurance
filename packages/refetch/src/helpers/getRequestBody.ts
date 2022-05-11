/*
 *
 * `getRequestBody`: `@exsys-clinio/refetch`.
 *
 */
import appendFiles from "./appendFiles";
import { BodyShape } from "./../index.interface";

const getRequestBody = (initialBody?: BodyShape, useFormData?: boolean) => {
  if (!Boolean(initialBody)) {
    return null;
  }

  if (useFormData) {
    const { files, fileName } = initialBody!;

    if (!files) {
      throw new Error(`"body.files" should array of files given ${files} `);
    }

    return {
      body: appendFiles(files, fileName),
    };
  }

  return {
    body: JSON.stringify(initialBody),
  };
};
export default getRequestBody;
