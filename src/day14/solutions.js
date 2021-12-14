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

  var count = polimerize(input.polymer, input.insertions, 0, 40, false);

  var max = [...count].reduce((a, b) => a[1] > b[1] ? a : b);
  var min = [...count].reduce((a, b) => a[1] < b[1] ? a : b);

  return max[1] - min[1];
}

function polimerize(template, insertions, currentStep, lastStep, chunked = false) {
  var count = new Map();
  var chunkSize = 20000;
  var totalChunkCount = new Map();

  for (let s = currentStep; s < lastStep; s++) {
    if (template.length > chunkSize) {
      chunked = true;
      var chunk = template.substring(0, chunkSize);
      var newChunkCount = polimerize(chunk, insertions, s, lastStep, chunked);
      template = template.substring(chunkSize - 1); // extra carater from chunk for jointure insertions

      for (let [key, value] of newChunkCount) {
        if (totalChunkCount.has(key)) {
          totalChunkCount.set(key, totalChunkCount.get(key) + value);
        } else {
          totalChunkCount.set(key, value);
        }
      }
      // console.log(chunk, totalChunkCount);
    }

    var replaced = "";
    for (let i = 0; i < template.length; i++) {
      let leftover = template.substring(i);
      let insertion = insertions.get(leftover[0] + leftover[1]);
      if (insertion !== undefined) {
        replaced = `${replaced}${leftover[0]}${insertion}`;
      } else {
        replaced = `${replaced}${leftover[0]}`;
      }
    }
    template = replaced;
  }

  if (chunked) {
    template = template.substring(1); // remove extra carater from chunk to avoid duplicate
  }

  for (let i = 0; i < template.length; i++) {
    let char = template[i];
    if (count.has(char)) {
      count.set(char, count.get(char) + 1);
    } else {
      count.set(char, 1);
    }
  }

  for (let [key, value] of totalChunkCount) {
    if (count.has(key)) {
      count.set(key, count.get(key) + value);
    } else {
      count.set(key, value);
    }
  }

  return count;
}

console.log(solve1())
console.log(solve2())
