const fs = require('fs');

const readStacksAndInstructionsFromFile = (path) => {

  const fileContent = fs.readFileSync(path).toString().split('\n');

  const cratesLineIndex = fileContent.findIndex(line => /^[\d\s]+$/.test(line));
  const crateLine = fileContent[cratesLineIndex];
  /**
   * string[]
   */
  const stacks = crateLine.match(/(\d+)/g).map(id => {
    const column = crateLine.indexOf(id);
    const crates = fileContent
      .slice(0, cratesLineIndex)
      .reverse()
      .map(line => line[column])
      .filter(crate => crate != ' ');
    return crates;
  });

  /**
   * Array<{
   *   count: number; Number of crates to move
   *   from: number; From stack index
   *   to: number; Target stack index
   * }>
   */
  const instructions = fileContent.filter(line => /move/.test(line))
    .map(line => {
      const [ _, count, from, to ] = line.match(/(\d+)\sfrom\s(\d+)\sto\s(\d+)/);
      return { 
        count: Number(count),
        from: Number(from)-1, 
        to: Number(to)-1, 
      };
    });

  return { stacks, instructions };
};

module.exports = {
  readStacksAndInstructionsFromFile,
};