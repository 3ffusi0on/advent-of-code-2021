const { log } = require('console');
const fs = require('fs')

function getInput() {
  var input = [];
  try {
    const data = fs.readFileSync('./resources/day09/input.txt', 'UTF-8').split(/\r?\n/);
    data.forEach((line) => {
      if (line.length > 0) {
        input.push(line.split("").map(Number));
      }
    });


  } catch (err) {
    console.error(err);
  }

  return input;
}


function solve1() {
  var map = getInput();
  var hightPoints = [];
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y <  map[x].length; y++) {
      const point = map[x][y];
      
      if (isPointLower(x - 1, y, map, point)
      && isPointLower(x + 1, y, map, point)
      && isPointLower(x, y - 1, map, point)
      && isPointLower(x, y + 1, map, point)) {
        hightPoints.push(point);
      }
    }
  }

  var riskLevel = 0;
  for (point of hightPoints) {
    riskLevel += (1 + point);
  }
  return riskLevel;
}

function isPointLower(x, y, map, value) {
  if (x < 0 || y < 0 || x >= map.length || y >= map[x].length) {
    return true;
  }

  if (map[x][y] > value) {
    return true;
  }

  return false;
}

function solve2() {

}

console.log(solve1())
// console.log(solve2())
