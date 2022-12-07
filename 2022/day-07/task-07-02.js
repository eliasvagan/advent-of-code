const path = require("path");
const { resolveFilesystemFromFile } = require("./resolve-filesystem-from-file");

const rootDirectory = resolveFilesystemFromFile(path.resolve(__dirname, './input-07.txt'));

const maxDiskSpace = 70000000;
const requiredFreeSpace = 30000000;
const usedSpace = rootDirectory.totalSize;

const possibleDeletions = rootDirectory.findDirectories(dir => usedSpace - dir.totalSize < maxDiskSpace - requiredFreeSpace);
const bestDeletion = possibleDeletions.sort((a, b) => a.totalSize - b.totalSize)[0];

console.log({ bestDeletion });