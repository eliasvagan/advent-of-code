const path = require("path");
const { resolveFilesystemFromFile } = require("./resolve-filesystem-from-file");

const rootDirectory = resolveFilesystemFromFile(path.resolve(__dirname, './input-07.txt'));

const directoriesUnder100KB = rootDirectory.findDirectories((dir) => dir.totalSize <= 100000);
const directoriesUnder100KBSum = directoriesUnder100KB.reduce((sum, dir) => sum + dir.totalSize, 0);

console.table(directoriesUnder100KB);
console.log({ directoriesUnder100KBSum });