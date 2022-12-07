const path = require('path');
const { resolvePairsFromFile } = require('./resolve-pairs-from-file');

/**
 * [ 
 *  [ [ from_0a, to_0a ], [ from_0b, to_0b ] ] ]
 * ...
 * ]
 */
const listOfPairs = resolvePairsFromFile(path.resolve(__dirname, './input-04.txt'));

const overlappingPairs = listOfPairs.filter(([range0, range1]) => {
  const overlap = range0[1] >= range1[0] && range0[0] <= range1[1];
  return overlap;
});

console.log(`${overlappingPairs.length} overlaps`);