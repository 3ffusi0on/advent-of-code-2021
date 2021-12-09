const fs = require('fs');

function getInput() {
  var input = [];
  try {
    const data = fs.readFileSync('./resources/day05/input.txt', 'UTF-8').split(/\r?\n/);
    data.forEach((line) => {
      if (line.length > 0) {
        let grp = line.match(/(\d+),(\d+) -> (\d+),(\d+)/);
        input.push({x1: parseInt(grp[1]), y1: parseInt(grp[2]), x2: parseInt(grp[3]), y2: parseInt(grp[4])});
      }
    });


  } catch (err) {
      console.error(err);
  }
  
  return input;
}

function solve1() {
  var input = getInput();
  var map = [];

  input.forEach((line) => {
    if (isStraigthLine(line.x1, line.x2, line.y1, line.y2)) {
      var positions = getPointsOfStraightLine(line.x1, line.x2, line.y1, line.y2);
      positions.forEach((pos) => {
        var index = "🎄" + pos.x.toString() + "🎄" + pos.y.toString() + "🎄"
        map[index] = parseInt(map[index]) + 1 || 1;
      });
    }
  })

  return Object.values(map).filter(value => value > 1).length;
}

function isStraigthLine(x1, x2, y1, y2) {
  return x1 == x2 || y1 == y2;
}

function getPointsOfStraightLine(x1, x2, y1, y2) {
  var positions = [];
  const [minX, maxX] = [Math.min(x1, x2), Math.max(x1, x2)];
  const [minY, maxY] = [Math.min(y1, y2), Math.max(y1, y2)];
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      positions.push({x, y});
    }
  }
  return positions;
}

function getPointsOfDiagonal(x1, x2, y1, y2) {
  var positions = [];
  var y = parseInt(y1);

  if (x1 < x2) {
    for (let x = x1; x <= x2; x++) {
      positions.push({x, y});
      y = (y1 < y2 ? y + 1 : y - 1);
    }
  } else {
    for (let x = x1; x >= x2; x--) {
      positions.push({x, y});
      y = (y1 < y2 ? y + 1 : y - 1);
    }
  }
  return positions;
}


function solve2() {
  var input = getInput();
  var map = [];

  input.forEach((line) => {
    if (isStraigthLine(line.x1, line.x2, line.y1, line.y2)) {
      let positions = getPointsOfStraightLine(line.x1, line.x2, line.y1, line.y2);
      positions.forEach((pos) => {
        const index = "🎄" + pos.x.toString() + "🎄" + pos.y.toString() + "🎄"
        map[index] = map[index] + 1 || 1;
      });
    } else {
      let positions = getPointsOfDiagonal(line.x1, line.x2, line.y1, line.y2);
      positions.forEach((pos) => {
        const index = "🎄" + pos.x.toString() + "🎄" + pos.y.toString() + "🎄"
        map[index] = map[index] + 1 || 1;
      });
    }
  })

  return Object.values(map).filter(value => value > 1).length;
}

console.log(solve1())
console.log(solve2())

