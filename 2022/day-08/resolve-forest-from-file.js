const fs = require('fs');


class Forest {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.trees = new Array(width*height).fill([
      0, // Height
      0, // Tallest from North
      0, // Tallest from East
      0, // Tallest from South
      0  // Tallest from West
    ]);
  }

  /**
   * 
   * @param {number[]} trees
   */
  importTrees(trees) {
    for (let i = 0; i < trees.length; i ++) {
      this.trees[i][0] = trees[i];
    }
    this._calculateVisibilities();
  }

  _calculateVisibilities() {
    // North
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const prevTree = this.getTree(x, y-1);
        const thisTree = this.getTree(x, y);
        thisTree[1] = y === 0 ? 0 : Math.max(prevTree[0], prevTree[1]);
      }
    }
  }

  getTree(x, y) {
    return this.trees[y * this.width + x];
  }

  isVisible(x, y) {
    const [ height, ...tallestDirections ] = this.getTree(x, y);
    return tallestDirections
      .reduce((visible, tallestDir) => visible && tallestDir < height, true);
  }
}

const resolveForestFromFile = (path) => {
  const heights = fs.readFileSync(path);
  const rows = heights.toString().split('\n').map(line => line.split('').map(hs => Number(hs)));

  const forest = new Forest(rows[0].length, rows.length);
  const allTrees = rows.reduce((all, row) => all.concat(row), []);
  forest.importTrees(allTrees);

  return forest;
};


module.exports = {
  resolveForestFromFile,
}