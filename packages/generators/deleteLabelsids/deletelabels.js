const fs = require("fs");
const path = require("path");
const directory = "app/src/Pages";

const fileName = "labelIds.json";

try {
  const folders = fs.readdirSync(directory);

  for (const folder of folders) {
    // console.log(folder);
    const folderPath = path.join(directory, folder);
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      // console.log(file);

      if (fileName === file) {
        console.log(`found ${fileName} in -> ${path.join(folderPath)}`);
        fs.unlink(path.join(folderPath, file), err => {
          if (err) throw err;
          else console.log(`Successfully deleted the file`);
        });
      }
    }
  }

  // fs.unlinkSync(pathToFile);
} catch (err) {
  console.log({ err });
  throw err;
}
