const fs = require('fs')

function readFile(fileName) {
  var lines = [];
  try {
    const data = fs.readFileSync(fileName, 'UTF-8');
    const content = data.split(/\r?\n/);
    content.forEach((line) => {
      if (line.length > 0) {
        lines.push(parseInt(line));
      }
    });
} catch (err) {
    console.error(err);
}
  return lines;
}

function solve1() {
  var increase = 0;

  var lines = readFile('./resources/day01/input.txt');
  for (var i = 0, measure = lines[0]; i < lines.length ; i++) {
      if (lines[i] > measure) {
        increase += 1;
      }
      measure = lines[i];
  }
  return increase;
}

function solve2() {
  var increase = 0;

  var lines = readFile('./resources/day01/input.txt');
  for (var i = 0, measure = lines[0]+lines[1]+lines[2]; i + 2 < lines.length ; i++) {
    var newMeasure = lines[i] + lines[i+1] + lines[i+2];
      if (newMeasure > measure) {
        increase += 1;
      }
      measure = newMeasure;
  }
  return increase;
}

console.log(solve1())
console.log(solve2())
