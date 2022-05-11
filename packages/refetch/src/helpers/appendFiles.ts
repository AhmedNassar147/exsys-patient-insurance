/*
 *
 * `appendFiles`: `@exsys-clinio/refetch`.
 *
 */
const appendFiles = (files: File[], fileName: string = "image") => {
  const filesArr = Array.from(files);
  const formData = new FormData();

  filesArr.forEach((file) => {
    formData.append(fileName, file);
  });

  return formData;
};

export default appendFiles;
