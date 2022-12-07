const fs = require('fs');

const resolvePairsFromFile = (path) => {
  const inputRaw = fs.readFileSync(path).toString();
  return inputRaw.split('\n')
    .filter(Boolean)
    .map(line => (
      line.split(',')
        .map(side => side.split('-')
          .map(v => Number(v))
        )
      )
    );
}

module.exports = {
  resolvePairsFromFile
}