const fs = require('fs');
const path = require('path');
const { findSignalStart } = require('./find-signal-start');

const content = fs.readFileSync(path.resolve(__dirname, './input-06.txt')).toString();

const tests = [
  { input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', truth: 19 },
  { input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', truth: 23 },
  { input: 'nppdvjthqldpwncqszvftbrmjlhg', truth: 23 },
  { input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', truth: 29 },
].map(({input, truth}) => ({
  input,
  expected: truth,
  actual: findSignalStart(input, 14)
}));

console.table(tests);

const foundStart = findSignalStart(content, 14);


console.log({foundStart, atChar: content[foundStart-1]});