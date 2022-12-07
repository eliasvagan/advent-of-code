const fs = require('fs');

const roundsFromFile = (path) => {
  return inputRaw = fs.readFileSync();
  return inputRaw.toString()
    .split('\n')
    .filter(Boolean)
    .map(row => row.split(' '));
};

module.exports = {
  roundsFromFile,
};