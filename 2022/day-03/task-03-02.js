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

const badges = new Array(rucksacks.length / 3)
  .fill()
  .map((_, i) => [ rucksacks[i*3] , rucksacks[i*3 + 1], rucksacks[i*3 + 2] ])
  .map(members => {
    for (const exp of members.map(m => new RegExp('.*([' + m  + '}]).*\_.*\\1.*\_.*\\1.*'))) {
      const combined = members.join('_');
      if (exp.test(combined)) {
        const match = combined.match(exp)[1]
        return match;
      }
    }
  });

const sumBadges = badges.reduce((sum, badge) => sum + priorities[badge], 0);

console.log(badges);
console.log({ sumBadges });