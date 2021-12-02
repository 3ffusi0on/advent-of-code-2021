const fs = require('fs')

function readFile(fileName) {
  var lines = [];
  try {
    const data = fs.readFileSync(fileName, 'UTF-8').split(/\r?\n/);
    data.forEach((line) => {
      if (line.length > 0) {
        lines.push(line);
      }
    });
  } catch (err) {
      console.error(err);
  }
  return lines;
}


function solve1() {
  var lines = readFile('./resources/day02/input.txt');
  var coordinates = {horizontal: 0, depth: 0 }

  var fnc = {
    forward: function(nbr) {coordinates.horizontal += nbr },
    down: function(nbr) {coordinates.depth += nbr },
    up: function(nbr) {coordinates.depth -= nbr },
  };

  for (var i = 0; i < lines.length ; i++) {
    var [movement, count] = lines[i].split(' ');
    fnc[movement](parseInt(count));
  }
  console.log(coordinates);
  return coordinates.depth * coordinates.horizontal;
}

function solve2() {
  var lines = readFile('./resources/day02/input.txt');
  var coordinates = {horizontal: 0, depth: 0, aim: 0 }

  var fnc = {
    forward: function(nbr) {coordinates.horizontal += nbr; coordinates.depth += nbr * coordinates.aim},
    down: function(nbr) {coordinates.aim += nbr },
    up: function(nbr) {coordinates.aim -= nbr },
  };

  for (var i = 0; i < lines.length ; i++) {
    var [movement, count] = lines[i].split(' ');
    fnc[movement](parseInt(count));
  }
  console.log(coordinates);
  return coordinates.depth * coordinates.horizontal;
}

console.log(solve1())
console.log(solve2())
