const path = require('path');
const { resolveTotalScore } = require('./resolve-total-score.js');
const { roundsFromFile } = require('./rounds-from-file.js');

const rounds = roundsFromFile(path.resolve(__dirname, './input-01.txt'));

const baseScores = { 
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3  // Scissor
};

/**
 * rock + rock = draw, rock + paper = win, rock + scissor = lose
 * lose = 0, draw = 3, win = 6
 */
const relationShips = {
  'A': { 'X': 3, 'Y': 6, 'Z': 0 },
  'B': { 'X': 0, 'Y': 3, 'Z': 6 },
  'C': { 'X': 6, 'Y': 0, 'Z': 3 },
};

console.log('Sum: ', resolveTotalScore(rounds, baseScores, relationShips));