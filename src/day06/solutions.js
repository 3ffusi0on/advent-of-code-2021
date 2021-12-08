const { log } = require('console');
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
  
  return input;
}


function solve1() {
  var input = readFile('./resources/day06/input.txt');

}


function solve2() {

}

console.log(solve1())
// console.log(solve2())
