const { log } = require('console');
const fs = require('fs')

function getInput() {
  var input = [];
  try {
    const data = fs.readFileSync('./resources/day08/input.txt', 'UTF-8').split(/\r?\n/);
    data.forEach((line) => {
      if (line.length > 0) {
        let grp = line.split(" | ");
        input.push({unknownNumbers: grp[0].split(" "), outputNumbers: grp[1].split(" ")});
      }
    });


  } catch (err) {
      console.error(err);
  }
  
  return input;
}


function solve1() {
  var input = getInput();
  var sum = 0;
  for (numbers of input) {
    sum += numbers.outputNumbers.filter(x => [2, 3, 4, 7].includes(x.length)).length;
  }

  return sum;
}


function solve2() {
  return null;
}

console.log(solve1())
console.log(solve2())
