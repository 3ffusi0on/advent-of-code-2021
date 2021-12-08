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
  var lines = readFile('./resources/day03/input.txt');

  var count = new Array(lines[0].length).fill(0)
  for (var i = 0; i < lines.length ; i++) {
    var line = lines[i];
    var parts = [...line];
    for (let j = 0; j < parts.length; j++) {
      count[j] += parseInt(parts[j]);
    }
  }
  for (let i = 0; i < count.length; i++) {
    count[i] = count[i] > lines.length / 2 ? 1 : 0;
  }

  console.log(count);
  const gamma = parseInt(count.join(''), 2);
  const epsilon = gamma ^ parseInt((new Array(lines[0].length).fill(1)).join(''), 2) // XOR with full of 1 binary number
  console.log(gamma, epsilon);
  return gamma * epsilon;
}



function solve2() {
  var lines = readFile('./resources/day03/input.txt');

  var nbBits = lines[0].length;
  var oxygenGeneratorRating = lines;
  var co2ScrubberRating = lines;
  for (var i = 0; i < nbBits && oxygenGeneratorRating.length > 1 ; i++) {
    oxygenGeneratorRating = oxygenGeneratorRating.filter((line) => { return findMaxOccurenceOfBit(oxygenGeneratorRating, i) == [...line][i] })
  }
  for (var i = 0; i < nbBits && co2ScrubberRating.length > 1 ; i++) {
    co2ScrubberRating = co2ScrubberRating.filter((line) => { return findMaxOccurenceOfBit(co2ScrubberRating, i) != [...line][i] })
  }
  return parseInt(oxygenGeneratorRating.join(''), 2) * parseInt(co2ScrubberRating.join(''), 2);
}

function findMaxOccurenceOfBit(input, pos) {
  var count = 0;
  for (var i = 0; i < input.length ; i++) {
    var line = input[i];
    var bits = [...line];
    count += parseInt(bits[pos]);
  }
  return count >= input.length / 2 ? 1 : 0;
}



console.log(solve1())
console.log(solve2())
