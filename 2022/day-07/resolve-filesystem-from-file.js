const fs = require('fs');

class File {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
}

class Directory {
  constructor(name, parentDirectory) {
    this.name = name;
    this.parentDirectory = parentDirectory; // Directory (undefined for root)
    this.totalSize = 0;
    this.subDirectories = []; // Directory[]
    this.files = []; // File[]
  }

  /**
   * Make tree of directory
   * @returns {string}
   */
  toString() {
    let str = this.name;
    let depth = 0;
    let remaining = [this];
    let next = undefined;
    while(remaining.length > 0) {
      next.a
      str += '-'.repeat(depth) + remaining.length;
    }
  }


  /**
   * Add file
   * 
   * @param {File} file 
   */
  addFile(file) {
    this.files.push(file);
    this.totalSize += file.size;
    
    // Update parent dir sizes
    let currentDir = this.parentDirectory;
    while(currentDir) {
      currentDir.totalSize += file.size;
      currentDir = currentDir.parentDirectory;
    }
  }

  /**
   * Add directory
   * 
   * @param {Directory} directory 
   */
  addDirectory(directory) {
    this.subDirectories.push(directory);
    // Update parent dir sizes
    let currentDir = this.parentDirectory;
    while(currentDir) {
      currentDir.totalSize += directory.totalSize;
      currentDir = currentDir.parentDirectory;
    }
  }

  /**
   * Find subdirectories that match a predicate
   * 
   * @param {(Directory) => boolean} predicate 
   * @returns {Directory[]} 
   */
  findDirectories(predicate) {
    const found = [];
    const unsearched = [this];
    while(unsearched.length) {
      const next = unsearched.pop();
      if (predicate(next)) {
        found.push(next);
      }
      unsearched.push(...next.subDirectories);
    }
    return found;
  }
}

class Action {
  constructor(rawInput) {
    this.rawInput = rawInput;
    for (const [exp, op] of [
      [ /^\$\scd/, 'change-directory' ],
      [ /^(?:\$\sls|$)/, 'do-nothing' ],
      [ /^dir/, 'add-directory' ],
      [ /^\d+/, 'add-file' ],
      [ /.*/, 'unknown-operation' ]
    ]) {
      if (exp.test(rawInput)) {
        return this.operation = op;
      }
    }
  }

  /**
   * Act out action from a directory, then return new active directory
   * 
   * @param {Directory} workingDir 
   * @returns {Directory} new working directory
   */
  act(workingDir) {
    switch(this.operation) {
      case 'change-directory': {
        const [_, targetDir] = this.rawInput.match(/\$\scd\s([\w./]+)/);
        if (targetDir === '/') return workingDir; // No support for root directory yet
        if (targetDir === '..') return workingDir.parentDirectory; // Go up
        return workingDir.findDirectories(dir => dir.name === targetDir)[0]; // Go down
      }
      case 'do-nothing': {
        return workingDir;
      }
      case 'add-directory': {
        const [_, newDirName] = this.rawInput.match(/dir\s(\w+)/);
        workingDir.addDirectory(new Directory(newDirName, workingDir));
        return workingDir;
      }
      case 'add-file': {
        const [_, size, name] = this.rawInput.match(/(\d+)\s(\w+\.?\w+)/);
        workingDir.addFile(new File(name, Number(size)));
        return workingDir;
      }
      case 'unknown-operation': {
        throw Error(`Encountered unknown operation for "${this.rawInput}"`);
      }
    }
  }

}
/**
 * 
 * @param {string} path Absolute path
 * @returns {Directory} The root directory
 */
const resolveFilesystemFromFile = (path) => {
  const lines = fs.readFileSync(path).toString().split('\n');
  
  const rootDir = new Directory('/', undefined);

  let workingDir = rootDir;
  for (const line of lines) {
    const action = new Action(line);
    workingDir = action.act(workingDir);
  }
  return rootDir;
}

module.exports = {
  resolveFilesystemFromFile,
}