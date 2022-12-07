const fs = require('fs');

const rucksacksFromFile = (path) => {
  return fs.readFileSync(path)
    .toString()
    .split('\n')
    .filter(Boolean);
};

module.exports = {
  rucksacksFromFile
};