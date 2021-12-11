const { log } = require('console');
const fs = require('fs')

function getInput() {
  var input = [];
  try {
    var data = fs.readFileSync('./resources/day11/input.txt', 'UTF-8').split(/\r?\n/);
    // data = fs.readFileSync('./resources/day11/input-test.txt', 'UTF-8').split(/\r?\n/);
    data.forEach((line) => {
      if (line.length > 0) {
        input.push(line.split("").map((x) => { return { energy: parseInt(x), flashed: false }; }));
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

  for (var step = 0; step < 100; step++) {
    for (var i = 0; i < input.length; i++) {
      for (var j = 0; j < input[i].length; j++) {
        energize(input, i, j);
      }
    }


    // reset to 0
    for (var i = 0; i < input.length; i++) {
      for (var j = 0; j < input[i].length; j++) {
        if (input[i][j].flashed) {
          result += 1;
          input[i][j].energy = 0;
          input[i][j].flashed = false;
        }
      }
    }
    // printBeautiful(input);
  }


  return result;
}

function energize(input, x, y) {
  if (input[x][y].flashed) {
    return;
  }
  input[x][y].energy += 1;
  if (input[x][y].energy <= 9) {
    return;
  }
  input[x][y].flashed = true;
  if (x > 0 & y > 0) { // top left corner
    energize(input, x - 1, y - 1);
  }

  if (x > 0) {
    energize(input, x - 1, y);
  }

  if (x > 0 & y < input[x].length - 1) { // top right corner
    energize(input, x - 1, y + 1);
  }

  if (y > 0) {
    energize(input, x, y - 1);
  }

  if (y < input[x].length - 1) {
    energize(input, x, y + 1);
  }

  if (x < input.length - 1 && y > 0) { // bottom left corner
    energize(input, x + 1, y - 1);
  }

  if (x < input.length - 1) {
    energize(input, x + 1, y);
  }


  if (x < input.length - 1 && y < input[x].length - 1) { // bottom right corner
    energize(input, x + 1, y + 1);
  }


  return;
}

function printBeautiful(input) {
  log(".");
  for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < input[i].length; j++) {
      process.stdout.write(input[i][j].energy.toString());
    }
    process.stdout.write("\n");
  }
}


function solve2() {
  var input = getInput();
  
  for (let step = 1; true; step++) {
    for (var i = 0; i < input.length; i++) {
      for (var j = 0; j < input[i].length; j++) {
        energize(input, i, j);
      }
    }
    
    // printBeautiful(input);
    
    // reset to 0
    var result = 0;
    for (var i = 0; i < input.length; i++) {
      for (var j = 0; j < input[i].length; j++) {
        if (input[i][j].flashed) {
          result += 1;
          input[i][j].energy = 0;
          input[i][j].flashed = false;
        }
      }
    }
    if (result >= 100) {
      return step;
    }
  }
}

console.log(solve1())
console.log(solve2())
