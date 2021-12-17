const { log } = require('console');
const fs = require('fs')

function getInput() {
  var input = [];
  try {
    var data = fs.readFileSync('./resources/day15/input.txt', 'UTF-8').split(/\r?\n/);
    data = fs.readFileSync('./resources/day15/input-test.txt', 'UTF-8').split(/\r?\n/);
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
  var input = getInput();

  for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < input[i].length; j++) {
      if (i > 0 && j > 0) {
        input[i][j] += Math.min(input[i - 1][j], input[i][j - 1]);
      } else if (i > 0) {
        input[i][j] += input[i - 1][j];
      } else if (j > 0) {
        input[i][j] += input[i][j - 1];
      }
    }
  }

  return input[input.length - 1][input[input.length - 1].length - 1] - input[0][0];
}

function solve2() {
  var input = getInput();
  var result = 0;

  return result;
}

console.log(solve1())
console.log(solve2())
