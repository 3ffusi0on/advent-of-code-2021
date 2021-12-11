const { log } = require('console');
const fs = require('fs')

function getInput() {
  var lines = [];
  var folds = [];
  try {
    var data = fs.readFileSync('./resources/day13/input.txt', 'UTF-8').split(/\r?\n/);
    data = fs.readFileSync('./resources/day13/input-test.txt', 'UTF-8').split(/\r?\n/);
    data.forEach((line) => {
      if (line.length > 0) {
        let grp = line.match(/fold along ([x|y])=(\d+)/);
        if (grp.length > 0) {
          folds.push({axe: grp[1], val: parseInt(grp[2])});
        } else {
          lines.push(line.split(""));
        }
      }
    });
  } catch (err) {
    console.error(err);
  }


  return {lines, folds};
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
