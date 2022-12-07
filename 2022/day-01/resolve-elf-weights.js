const fs = require('fs');
const path = require('path');

const resolveElfWeightsSorted = (relativeFilePath) => {
    const inputRaw = fs.readFileSync(path.resolve(__dirname, relativeFilePath));
    const elves = inputRaw
    .toString()
    .split('\n')
    .reduce((acc, line) => {
        const index = Object.keys(acc).length + (!line ? 1 : 0);
        const sum = (acc[index] ?? 0) + Number(line);
        return { ...acc, [index]: sum };
    }, {});
    return Object.entries(elves).sort((a, b) => b[1] - a[1])
        .map(([index, weight]) => ({ index, weight }))
};

module.exports = {
    resolveElfWeightsSorted,
}