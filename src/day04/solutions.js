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
        lines[l    ].trim().split(/[ ]+/).map((x) => parseInt(x)),
        lines[l + 1].trim().split(/[ ]+/).map((x) => parseInt(x)),
        lines[l + 2].trim().split(/[ ]+/).map((x) => parseInt(x)),
        lines[l + 3].trim().split(/[ ]+/).map((x) => parseInt(x)),
        lines[l + 4].trim().split(/[ ]+/).map((x) => parseInt(x)),
      ]);
    }
  } catch (err) {
      console.error(err);
  }
  
  return input;
}


function solve1() {
  var input = readFile('./resources/day04/input.txt');

  var checkedBoard = input.boards;

  for (let i = 0; i < input.draws.length; i++) {
    const draw = parseInt(input.draws[i]);
    
    for (let b = 0; b < input.boards.length; b++) {
      const board = input.boards[b];

      board.forEach((r, rIndex) => {
        r.forEach((c, cIndex) => {
          if (c === draw) {
            checkedBoard[b][rIndex][cIndex] = "⭐" + draw; + "⭐";
          }
        });
      });

      for (let r = 0; r < checkedBoard[b].length; r++) {
        const row = board[r];
        if (row.every((x) => x.toString().startsWith("⭐"))) {
          return processSolution(checkedBoard[b], draw)
        }
      }

      for (let c = 0; c < checkedBoard[b][0].length; c++) {
        const col = checkedBoard[b].map((x) => x[c]);
        if (col.every((x) => x.toString().startsWith("⭐"))) {
          return processSolution(checkedBoard[b], draw)
        }
      }        
      
    }
  }

  return [];
}

function processSolution(board, draw) {
  var sum = 0;
  for (let r = 0; r < board.length; r++) {
    const row = board[r];
    for (let c = 0; c < row.length; c++) {
      if (!board[r][c].toString().startsWith("⭐")) {
        sum += board[r][c]
      }
    }
  }
  return sum * draw;
}

function solve2() {
  var input = readFile('./resources/day04/input.txt');

  var checkedBoard = input.boards;
  var winner = {board: undefined, boardIndices: [], draw: undefined};

  for (let i = 0; i < input.draws.length; i++) {
    const draw = parseInt(input.draws[i]);
    
    for (let b = 0; b < input.boards.length; b++) {
      const board = input.boards[b];

      board.forEach((r, rIndex) => {
        r.forEach((c, cIndex) => {
          if (c === draw) {
            checkedBoard[b][rIndex][cIndex] = "⭐" + draw; + "⭐";
          }
        });
      });

      for (let r = 0; r < checkedBoard[b].length; r++) {
        const row = board[r];
        if (row.every((x) => x.toString().startsWith("⭐"))) {
          saveWinner(winner, checkedBoard, b, draw)
        }
      }

      for (let c = 0; c < checkedBoard[b][0].length; c++) {
        const col = checkedBoard[b].map((x) => x[c]);
        if (col.every((x) => x.toString().startsWith("⭐"))) {
          saveWinner(winner, checkedBoard, b, draw)
        }
      }       
      
    }
  }

  return processSolution(winner.board, winner.draw);
}

function saveWinner(winner, checkedBoard, b, draw) {
  if (winner.draw == undefined || !winner.boardIndices.includes(b)) {
    winner.board = JSON.parse(JSON.stringify(checkedBoard[b]))
    winner.boardIndices.push(b);
    winner.draw= draw;
  }
}

console.log("Part 1:", solve1())
console.log("Part 2:", solve2())
