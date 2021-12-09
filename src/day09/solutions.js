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
    for (let y = 0; y < map[x].length; y++) {
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
  var map = getInput();
  var bassins = [];
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      const point = map[x][y];
      if (point == 9 || bassins.some(b => b.includes(point))) {
        continue;
      }
      
      var points = findBassin(x, y, map);
      bassins.push(points);
      
    }
  }
  var finalBassins = [];
  for (let i = 0; i < bassins.length; i++) {
    if (finalBassins.length < 3) {
      finalBassins.push({size: bassins[i].length, bassin: bassins[i]});
      continue;
    }
    
    if (finalBassins.length == 3 && bassins[i].length > finalBassins[0].size) {
      finalBassins.shift();
      finalBassins.push({size: bassins[i].length, bassin: bassins[i]});
    }
    finalBassins.sort((a, b) => a.size - b.size);
  }

return finalBassins.reduce((a, b, i) => i == 1 ? a.size * b.size : a * b.size);
}

function findBassin(x, y, map) {
  var points = [];
  if (x < 0 || y < 0 || x >= map.length || y >= map[x].length) {
    return points;
  }
  
  if (map[x][y] == 9) {
    return points;
  }
  
  points.push({ x, y });
  map[x][y] = 9;
  
  points = points.concat(findBassin(x - 1, y, map));
  points = points.concat(findBassin(x + 1, y, map));
  points = points.concat(findBassin(x, y - 1, map));
  points = points.concat(findBassin(x, y + 1, map));
  
  return points;
}

console.log(solve1())
console.log(solve2())
