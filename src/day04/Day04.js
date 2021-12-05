const { log } = require('console');
const fs = require('fs')

function readFile(fileName) {
  var input = {draws: [], boards: []};
  var lines = [];
  try {
    const data = fs.readFileSync(fileName, 'UTF-8').split(/\r?\n/);
    data.forEach((line) => {
      if (line.length > 0) {
        lines.push(line);
      }
    });

    input.draws = lines[0].split(',')
    for (let l = 1; l < lines.length; l += 5) {
      input.boards.push([
        lines[l    ].trim().split(/[ ]+/),
        lines[l + 1].trim().split(/[ ]+/),
        lines[l + 2].trim().split(/[ ]+/),
        lines[l + 3].trim().split(/[ ]+/),
        lines[l + 4].trim().split(/[ ]+/),
      ]);
    }
  } catch (err) {
      console.error(err);
  }
  
  return input;
}


function solve1() {
  var input = readFile('./resources/day04/input.txt');

  var checkedBaord = []
  var uncheckedBaord = input.boards

  for (let i = 0; i < input.draws.length; i++) {
    const draw = input.draws[i];
    
    for (let j = 0; j < input.boards.length; j++) {
      const board = input.boards[j];
      if (checkedBaord[j] === undefined) {
        checkedBaord[j] = new Array(input.boards[0].length);
      }
      
      for (let k = 0; k < board.length; k++) {
        const row = board[k];
        uncheckedBaord[j][k] = uncheckedBaord[j][k].filter(x => parseInt(x) != parseInt(draw));


        for (let l = 0; l < row.length; l++) {
          if (parseInt(row[l]) == parseInt(draw)) {
            if (checkedBaord[j][k] === undefined) {
              checkedBaord[j][k] = [row[l]];
            } else {
              checkedBaord[j][k].push(row[l]);
            }
            
            if (checkedBaord[j][l+5] === undefined) {
              checkedBaord[j][l+5] = [row[l]];

            } else {
              checkedBaord[j][l+5].push(row[l]);
            }
          }
        }
      }
      
      var solution = checkedBaord[j].find((row) => row != undefined && row.length === 5)
      if (solution != undefined) {
        
        uncheckedBaord[j] = uncheckedBaord[j].filter((x) => x.length > 0)
        var sum = 0;
        for (let u = 0; u < uncheckedBaord[j].length; u++) {
          const element = uncheckedBaord[j][u];
          sum += element.reduce((a, b) => parseInt(a) + parseInt(b))
        }
        return sum * solution.slice(-1);
      }
    }
  }

  // console.log(checkedBaord);
  return [];
}


function solve2() {

}

console.log(solve1())
// console.log(solve2())
