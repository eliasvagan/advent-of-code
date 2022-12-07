// Day 1 task 2
const { resolveElfWeightsSorted } = require("./resolve-elf-weights");

const topThreeSum = resolveElfWeightsSorted('./input-01.txt')
    .slice(0, 3)
    .reduce((sum, elf) => sum + elf.weight, 0);

console.log({ topThreeSum });