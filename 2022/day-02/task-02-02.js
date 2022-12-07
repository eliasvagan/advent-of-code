const path = require('path');
const { resolveTotalScore } = require('./resolve-total-score.js');
const { roundsFromFile } = require('./rounds-from-file.js');

const rounds = roundsFromFile(path.resolve(__dirname, './input-02.txt'));

const baseScores = { 
  X: 0, // Lose
  Y: 3, // Draw
  Z: 6  // Win
};

/** 
 * Rock + lose = 3 points (scissor), rock + draw = 1 (rock), rock + win = 2 points (paper)
 * Paper + lose =  1 point (rock), paper + draw = 2 (paper), paper + win = 3 (scissor)
 * Scissor + lose = 2 points (paper), scissor + draw = 3 (scissor), scissor + win = 1 (rock)
 */
const relationShips = {
  'A': { 'X': 3, 'Y': 1, 'Z': 2 }, 
  'B': { 'X': 1, 'Y': 2, 'Z': 3 },
  'C': { 'X': 2, 'Y': 3, 'Z': 1 },
};

console.log('Sum: ', resolveTotalScore(rounds, baseScores, relationShips));