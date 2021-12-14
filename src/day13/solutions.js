const { log } = require('console');
const fs = require('fs')

function getInput() {
  var lines = [];
  var folds = [];
  try {
    var data = fs.readFileSync('./resources/day13/input.txt', 'UTF-8').split(/\r?\n/);
    // data = fs.readFileSync('./resources/day13/input-test.txt', 'UTF-8').split(/\r?\n/);
    data.forEach((line) => {
      if (line.length > 0) {
        let grp = line.match(/fold along ([x|y])=(\d+)/);
        if (grp !== null) {
          folds.push({ axe: grp[1], value: parseInt(grp[2]) });
        } else {
          lines.push(line.split(",").map(x => parseInt(x)));
        }
      }
    });
  } catch (err) {
    console.error(err);
  }


  return { lines, folds };
}


function solve1() {
  var input = getInput();

  var paper = [];
  for (var f = 0; f < 1; f++) {
    var { axe, value } = input.folds[f];
    for (var i = 0; i < input.lines.length; i++) {
      var x = input.lines[i][0];
      var y = input.lines[i][1];

      if (axe === 'x') {
        if (x <= value) {
          paper.push({ x, y });
        } else {
          paper.push({ x: value - (x - value), y });
        }
      } else {
        if (y <= value) {
          paper.push({ x, y });
        } else {
          paper.push({ x, y: value - (y - value) });
        }
      }
    }
    paper = [...new Map(paper.map(v => [JSON.stringify(v), v])).values()]
  }
  console.log(paper);

  return paper.length;
}


function solve2() {
  var input = getInput();
  
  var paper = [];
  for (var i = 0; i < input.lines.length; i++) {
    var x = input.lines[i][0];
    var y = input.lines[i][1];
    paper.push({ x, y });
  }

  for (var f = 0; f < input.folds.length; f++) {
    var { axe, value } = input.folds[f];
    var newPaper = [];
    for (var i = 0; i < paper.length; i++) {
      var {x, y} = paper[i];

      if (axe === 'x') {
        if (x <= value) {
          newPaper.push({ x, y });
        } else {
          newPaper.push({ x: value - (x - value), y });
        }
      } else {
        if (y <= value) {
          newPaper.push({ x, y });
        } else {
          newPaper.push({ x, y: value - (y - value) });
        }
      }
    }
    
    console.log(newPaper);
    paper = [...new Map(newPaper.map(v => [JSON.stringify(v), v])).values()]
  }

  for (var j = 0; j < 6; j++) {
    for (var i = 0; i < 40; i++) {
      if (paper.find(coord => coord.x === i && coord.y === j)) {
        process.stdout.write("#");
      } else {
        process.stdout.write(" ");
      }
    }
    process.stdout.write("\n");
  }
}


console.log(solve1())
solve2()
