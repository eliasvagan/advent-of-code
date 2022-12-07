const path = require("path");
const { readStacksAndInstructionsFromFile } = require("./read-stacks-and-instructions-from-file");


const { stacks, instructions } = readStacksAndInstructionsFromFile(path.resolve(__dirname, './input-05.txt'));

for (let i = 0; i < instructions.length; i++) {
  const { count, from, to } = instructions[i];
  for (let remaining = count; remaining > 0; remaining--) {
    let crate = stacks[from].pop();
    if (!crate) {
      throw Error('Undefined crate');
    }
    stacks[to].push(crate);
  }
}

const topCrates = stacks.map(stack => stack[stack.length-1]).join('');

console.log({stacks, topCrates});
