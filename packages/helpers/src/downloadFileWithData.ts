/*
 *
 * Helper: `downloadFileWithData`.
 *
 */
interface DownloadFileWithDataProps {
  fileName: string;
  fileContents?: BlobPart;
  fileType?: string;
}

const downloadFileWithData = ({
  fileName,
  fileContents,
  fileType,
}: DownloadFileWithDataProps) => {
  if (!fileContents) {
    return;
  }

  const _URL = window.URL || window.webkitURL;
  const textFileAsBlob = new Blob([fileContents], {
    type: fileType || "text/json",
  });

  const downloadLink = document.createElement("a");
  const fileUrl = _URL.createObjectURL(textFileAsBlob);

  downloadLink.download = fileName;
  downloadLink.href = fileUrl;
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);

  downloadLink.onclick = () => {
    downloadLink.remove();
    setTimeout(() => _URL.revokeObjectURL(fileUrl), 65);
  };

  downloadLink.click();
};

export default downloadFileWithData;
