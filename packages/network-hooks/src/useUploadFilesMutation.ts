/*
 *
 * `useUploadFilesMutation`: `@exsys-patient-insurance/network-hooks`.
 *
 */
import { useCallback, useState, useRef } from "react";
import { normalizeNativeInputFile } from "@exsys-patient-insurance/helpers";
import { useAppConfigStore } from "@exsys-patient-insurance/app-config-store";
import {
  UploadingFileItemShape,
  UploadFilesActionOptions,
  RecordType,
  UploadFileListFromDirectOption,
} from "@exsys-patient-insurance/types";
import useBasicMutation from "./useBasicMutation";

type UploadedFileDataType = {
  baseFileUrl: string;
  fullFileUrlDoNotUse: string;
};

const createUniqueId = (length?: number) => {
  const len: number = length || 8;
  const timestamp: number = +new Date();

  let uniqueId = "";

  const _getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const ts: string = timestamp.toString();
  const parts: string[] = ts.split("").reverse();

  for (let i = 0; i < len; ++i) {
    const index: number = _getRandomInt(0, parts.length - 1);
    uniqueId += parts[index];
  }

  return uniqueId;
};

const createUniqueFileName = (name: string) =>
  `${name.replace(/\..+/, "")}-${createUniqueId(10)}`;

const useUploadFilesMutation = () => {
  const [uploadedFilesData, setUploadedFiles] = useState<
    RecordType<UploadedFileDataType>
  >({});

  const { addNotification } = useAppConfigStore();

  const uploadedFilesBaseUrlsRef = useRef<string[]>([]);

  const { mutate, loading } = useBasicMutation({
    method: "post",
    apiId: "POST_EXSYS_UPLOAD_FILE",
    useFormData: true,
  });

  const handleUploadOneFile = useCallback(
    async (
      {
        file: _file,
        directory,
        customUniqueFileNameOrFn,
        fieldName,
        onFinished,
      }: UploadingFileItemShape,
      showNotification?: boolean
    ) => {
      const { file } = normalizeNativeInputFile(_file);
      const { name } = file;

      let uniqueFileName =
        customUniqueFileNameOrFn instanceof Function
          ? customUniqueFileNameOrFn(name)
          : customUniqueFileNameOrFn || createUniqueFileName(name);

      uniqueFileName = `\\${uniqueFileName}`;
      await mutate({
        params: {
          ...(directory ? { dir: directory } : null),
          imageFileName: uniqueFileName,
        },
        body: {
          files: [file],
        },
        cb: ({ apiValues }) => {
          const {
            baseFileUrl,
            fileUrl: fullFileUrlDoNotUse,
            status,
          } = apiValues;

          if (status !== "success") {
            addNotification({
              type: "error",
              message: "flssve",
            });
            return;
          }

          onFinished?.({
            apiValues,
            uniqueFileName,
          });

          if (showNotification) {
            addNotification({
              type: "success",
              message: "succmsg",
            });
          }

          uploadedFilesBaseUrlsRef.current = [
            ...uploadedFilesBaseUrlsRef.current,
            baseFileUrl,
          ];
          setUploadedFiles((previous) => ({
            ...previous,
            [fieldName]: {
              baseFileUrl,
              fullFileUrlDoNotUse,
            },
          }));
        },
      });
    },
    [mutate]
  );

  const handleUploadMultipleFiles = useCallback(
    async (
      filesData: UploadFilesActionOptions | UploadFileListFromDirectOption
    ) => {
      let finalFilesData = filesData as UploadFilesActionOptions;
      //NOTE, if you want to upload only one file just use `handleUploadOneFile`.
      // 1- you can pass only the `files` if the it's shape like `UploadingFileItemShape[]`.

      if (!finalFilesData) {
        throw new Error(
          `Are you uploading empty files ??? given ${finalFilesData}`
        );
      }

      const wasOriginalFilesDataIsAnObjectNotArray = !Array.isArray(filesData);

      if (wasOriginalFilesDataIsAnObjectNotArray) {
        const { files, ...otherFileProps } =
          filesData as UploadFileListFromDirectOption;

        if (!(files instanceof FileList)) {
          throw new Error(
            `you must provide files as \`FileList\` type ??? given ${typeof files}`
          );
        }

        const filesArray = Array.from(files);

        finalFilesData = filesArray.map((currentFile: File) => ({
          file: currentFile,
          ...otherFileProps,
        }));
      }

      const filesCount = finalFilesData?.length;
      const isOnlyFile =
        filesCount === 1 && !wasOriginalFilesDataIsAnObjectNotArray;

      if (isOnlyFile) {
        throw new Error(
          `Don't use \`handleUploadMultipleFiles\` for one file ,
            if you want to upload one file just use \`handleUploadOneFile\`.
          `
        );
      }

      if (!finalFilesData) {
        throw new Error(
          `Are you uploading empty files ??? given ${JSON.stringify(
            finalFilesData
          )}`
        );
      }

      await Promise.all(
        finalFilesData.map((fileData, index) => {
          return handleUploadOneFile(fileData, filesCount - 1 === index);
        })
      );
    },
    [handleUploadOneFile]
  );

  return {
    handleUploadMultipleFiles,
    handleUploadOneFile,
    uploading: loading,
    uploadedFilesData,
    uploadedFilesBaseUrlsRef,
  };
};

export default useUploadFilesMutation;
