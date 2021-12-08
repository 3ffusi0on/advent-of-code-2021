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

    input = lines[0].split(',').map((x) => parseInt(x));

  } catch (err) {
      console.error(err);
  }
  
  return input;
}


function solve1() {
  var input = readFile('./resources/day07/input.txt');
  var fuel = undefined;
  input.forEach((aim) => {
    var roundFuel = input.reduce((acc, curr, index) => {
      if (index === 1) {
        acc = Math.abs(acc - aim);
      }
      return acc + Math.abs(curr - aim);
    });

    if (fuel == undefined || roundFuel < fuel) {
      fuel = roundFuel;
    }
  })
  return fuel;
}


function solve2() {
  var input = readFile('./resources/day07/input.txt');

  const [min, max] = [Math.min(...input), Math.max(...input)];
  var fuel = undefined;
  for (let aim = min; aim <= max; aim++) {
    var roundFuel = input.reduce((acc, curr, index) => {
      if (index === 1) {
        acc = accumulate(Math.abs(acc - aim));
      }
      return acc + accumulate(Math.abs(curr - aim));
    });

    if (fuel == undefined || roundFuel < fuel) {
      fuel = roundFuel;
    }
  }
  return fuel;
}

function accumulate(input) {
  var sum = 0;
  for (let i = 1; i <= input; i++) {
    sum += i;
  }
  return sum;
}

console.log(solve1())
console.log(solve2())
