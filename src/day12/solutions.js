const { log } = require('console');
const fs = require('fs')

function getInput() {
  var input = [];
  try {
    var data = fs.readFileSync('./resources/day12/input.txt', 'UTF-8').split(/\r?\n/);
    data = fs.readFileSync('./resources/day12/input-test.txt', 'UTF-8').split(/\r?\n/);
    data.forEach((line) => {
      if (line.length > 0) {
        input.push(line.split(""));
      }
    });
  } catch (err) {
    console.error(err);
  }
  return input;
}


function solve1() {
  var input = getInput();
  var result = 0;

  return result;
}

function solve2() {
  var input = getInput();
  var result = 0;

  return result;
}

console.log(solve1())
console.log(solve2())
