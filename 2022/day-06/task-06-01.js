const fs = require('fs');
const path = require('path');
const { findSignalStart } = require('./find-signal-start');

const content = fs.readFileSync(path.resolve(__dirname, './input-06.txt')).toString();

const tests = [
  { input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', truth: 5 },
  { input: 'nppdvjthqldpwncqszvftbrmjlhg', truth: 6 },
  { input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', truth: 10 },
  { input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', truth: 11 },
].map(({input, truth}) => ({
  input,
  expected: truth,
  actual: findSignalStart(input, 4)
}));

console.table(tests);

const foundStart = findSignalStart(content, 4);


console.log({foundStart, atChar: content[foundStart-1]});

