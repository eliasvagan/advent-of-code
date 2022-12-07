/**
 * 
 * @param {Array} arr 
 * @returns {Boolean}
 */
const onlyUnique = (arr) => (
  arr.filter((val, i, self) => self.indexOf(val) === i).length === arr.length
);

/**
 * 
 * @param {String} data 
 * @param {Number} requiredUniques 
 * @returns {Number} The number of characters preceding signal
 */
const findSignalStart = (data, requiredUniques) => {
  const previous = new Array(requiredUniques).fill(data[0]);
  for (let i = 0; i < data.length; i++){
    const char = data[i];
    previous[i%requiredUniques]=char;
    if (onlyUnique(previous)){ 
      return i + 1;
    }
  }
}

module.exports = {
  findSignalStart,
}