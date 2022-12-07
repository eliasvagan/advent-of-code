const path = require('path');
const { rucksacksFromFile } = require('./rucksacks-from-file');

const rucksacks = rucksacksFromFile(path.resolve(__dirname, './input-03.txt'));

/**
 * { a: 1, b: 2, ... A: 27, B: 28, ... }
 */
const priorities = [
  ...new Array(26).fill('a'.charCodeAt(0)),
  ...new Array(26).fill('A'.charCodeAt(0)),
].reduce((mappings, base, i) => ({ ...mappings, [String.fromCharCode(base+(i%26))]: + i + 1 }), {});

const misplacedItems = rucksacks.map(content => {
  const [ comp0, comp1 ] = [ 
    content.slice(0, content.length/2), 
    content.slice(content.length/2, content.length)
  ];
  const matcher = new RegExp(`[${comp0}]`);
  return comp1.match(matcher)[0];
});

const misplacedSum = misplacedItems.reduce((sum, item) => sum + priorities[item], 0);

console.log({ misplacedSum });
