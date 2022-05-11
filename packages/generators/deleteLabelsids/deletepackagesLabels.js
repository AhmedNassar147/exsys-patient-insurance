const fs = require("fs");
const path = require("path");
const directory = "packages";

const fileName = "labelIds.json";

try {
  const folders = fs.readdirSync(directory);

  for (const folder of folders) {
    // console.log(folder);
    const folderPath = path.join(directory, folder);
    const subFolders = fs.readdirSync(folderPath);
    for (const subFolder of subFolders) {
      const subFolderPath = path.join(folderPath, subFolder);
      if (subFolder === "src") {
        const files = fs.readdirSync(subFolderPath);
        for (const file of files) {
          if (fileName === file) {
            console.log(`found ${fileName} in -> ${path.join(subFolderPath)}`);
            fs.unlink(path.join(subFolderPath, file), err => {
              if (err) throw err;
              else console.log(`Successfully deleted the file`);
            });
          }
        }
      }
    }
  }

  // fs.unlinkSync(pathToFile);
} catch (err) {
  console.log({ err });
  throw err;
}
