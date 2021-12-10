const { log } = require('console');
const fs = require('fs')

function getInput() {
  var input = [];
  try {
    var data = fs.readFileSync('./resources/day10/input.txt', 'UTF-8').split(/\r?\n/);
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
  var lines = getInput();
  var errorScore = [];
  errorScore[')'] = 3;
  errorScore[']'] = 57;
  errorScore['}'] = 1197;
  errorScore['>'] = 25137;

  var grpChunkChar = [];
  grpChunkChar['('] = ')';
  grpChunkChar['['] = ']';
  grpChunkChar['{'] = '}';
  grpChunkChar['<'] = '>';

  var totalScore = 0;
  var lifo = [];
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    for (var j = 0; j < line.length; j++) {
      if (Object.keys(grpChunkChar).includes(line[j])) {
        lifo.push(line[j]);
      } else if (Object.values(grpChunkChar).includes(line[j])) {
        if (lifo.length > 0 && grpChunkChar[lifo[lifo.length - 1]] == line[j]) {
          lifo.pop();
        } else {
          totalScore += errorScore[line[j]];
          break;
        }
      }
    }
  }


  return totalScore;
}

function solve2() {
  var lines = getInput();
  var errorScore = [];
  errorScore[')'] = 1;
  errorScore[']'] = 2;
  errorScore['}'] = 3;
  errorScore['>'] = 4;

  var grpChunkChar = [];
  grpChunkChar['('] = ')';
  grpChunkChar['['] = ']';
  grpChunkChar['{'] = '}';
  grpChunkChar['<'] = '>';

  var scores = [];
  var totalScore = 0;
  for (var i = 0; i < lines.length; i++) {
    var lifo = [];
    var line = lines[i];
    for (var j = 0; j < line.length; j++) {
      if (Object.keys(grpChunkChar).includes(line[j])) {
        lifo.push(line[j]);
      } else if (Object.values(grpChunkChar).includes(line[j])) {
        if (lifo.length > 0 && grpChunkChar[lifo[lifo.length - 1]] == line[j]) {
          lifo.pop();
        } else {
          lifo = [];
          break;
        }
      }
    }
    var missingClosing = [];
    while (lifo.length > 0) {
      var char = lifo.pop();
      missingClosing.push(grpChunkChar[char]);
    }

    var score = 0;
    for (var j = 0; j < missingClosing.length; j++) {
      score = ((score * 5) + errorScore[missingClosing[j]]);
    }
    if (score > 0) {
      scores.push(score);
    }
  }

  scores = scores.sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
}

console.log(solve1())
console.log(solve2())
