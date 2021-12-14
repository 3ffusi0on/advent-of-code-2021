const { log } = require('console');
const fs = require('fs')

function getInput() {
  var input = [];
  try {
    var data = fs.readFileSync('./resources/day14/input.txt', 'UTF-8').split(/\r?\n/);
    // data = fs.readFileSync('./resources/day14/input-test.txt', 'UTF-8').split(/\r?\n/);
    var polymer;
    var insertions = new Map();
    data.forEach((line) => {
      if (line.length > 0) {
        let grp = line.match(/([A-Z]+) -> ([A-Z]+)/);
        if (grp === null) {
          polymer = line;
        } else {
          insertions.set(grp[1], grp[2]);
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
  return { polymer, insertions };
}


function solve1() {
  var input = getInput();
  var template = input.polymer;
  for (let s = 0; s < 10; s++) {
    var replaced = "";
    for (let i = 0; i < template.length; i++) {
      let leftover = template.substring(i);
      let insertion = input.insertions.get(leftover[0] + leftover[1]);
      if (insertion !== undefined) {
        replaced = `${replaced}${leftover[0]}${insertion}`;
      } else {
        replaced = `${replaced}${leftover[0]}`;
      }
    }
    template = replaced;
  }

  var count = new Map();
  for (let i = 0; i < template.length; i++) {
    let char = template[i];
    if (count.has(char)) {
      count.set(char, count.get(char) + 1);
    } else {
      count.set(char, 1);
    }
  }

  var max = [...count].reduce((a, b) => a[1] > b[1] ? a : b);
  var min = [...count].reduce((a, b) => a[1] < b[1] ? a : b);

  return max[1] - min[1];
}

function solve2() {
  var input = getInput();
  var result = 0;

  return result;
}

console.log(solve1())
// console.log(solve2())
