/**
 * 
 * @param {['A' | 'B' | 'C', 'X', 'Y', 'Z'][]} rounds
 * @param {Object{
 *  X: number;
 *  Y: number;
 *  Z: number;
 * }} baseScores 
 * @param {Object{
 *  A: { X: number; Y: number: Z: number; };
 *  B: { X: number; Y: number: Z: number; };
 *  C: { X: number; Y: number: Z: number; };
 * }} relationShips
 */
const resolveTotalScore = (rounds, baseScores, relationShips) => {
  return rounds.reduce((sum, [ their, mine ]) => {
    return sum + relationShips[their][mine] + baseScores[mine];
  }, 0);
}

module.exports = {
  resolveTotalScore
}