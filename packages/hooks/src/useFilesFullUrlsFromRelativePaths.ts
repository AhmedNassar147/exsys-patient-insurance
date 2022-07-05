/*
 *
 * Hook: `useFilesFullUrlsFromRelativePaths`.
 *
 */
import { useMemo } from "react";
import { createFullImageUrl } from "@exsys-patient-insurance/helpers";
import { RecordType, StringNumber } from "@exsys-patient-insurance/types";

const useFilesFullUrlsFromRelativePaths = <
  T extends string | (RecordType<StringNumber | string> | string)[]
>(
  filesRelativeUrls?: T,
  fileUrlKeyPropName?: string
): T =>
  useMemo(() => {
    if (
      !filesRelativeUrls ||
      !(Array.isArray(filesRelativeUrls) && filesRelativeUrls.length)
    ) {
      return filesRelativeUrls as T;
    }

    if (typeof filesRelativeUrls === "string") {
      return createFullImageUrl(filesRelativeUrls as string) as T;
    }

    const filesFullPaths = filesRelativeUrls.map(
      (fileRelativePathOrObject: RecordType<StringNumber> | string) => {
        if (typeof fileRelativePathOrObject === "string") {
          return createFullImageUrl(fileRelativePathOrObject);
        }

        if (!fileUrlKeyPropName) {
          throw new Error(
            "`fileUrlKeyPropName` must be set when `filesRelativeUrls` is array of objects."
          );
        }

        const relativeUrl =
          fileRelativePathOrObject[
            fileUrlKeyPropName as keyof typeof fileRelativePathOrObject
          ];

        return {
          ...fileRelativePathOrObject,
          [fileUrlKeyPropName as string]: createFullImageUrl(
            relativeUrl as string
          ),
        };
      }
    );

    return filesFullPaths as T;
  }, [fileUrlKeyPropName, filesRelativeUrls]);

export default useFilesFullUrlsFromRelativePaths;
