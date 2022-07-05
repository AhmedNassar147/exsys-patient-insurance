/*
 *
 * file-upload: `@exsys-patient-insurance/types`
 *
 */
import { RecordTypeWithAnyValue } from "./base.interface";

type FinishUploadingValuesType = {
  apiValues: RecordTypeWithAnyValue;
  uniqueFileName: string;
};

export type UploadingFileItemShape = {
  file: File;
  directory?: string;
  customUniqueFileNameOrFn?: ((currentFileName: string) => string) | string;
  fieldName: string;
  onFinished?: (data: FinishUploadingValuesType) => void;
};

export type UploadFileListFromDirectOption = Omit<
  UploadingFileItemShape,
  "file"
> & {
  files: FileList;
};
export type UploadFilesActionOptions = UploadingFileItemShape[];
