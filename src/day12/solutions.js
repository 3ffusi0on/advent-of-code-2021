const { log } = require('console');
const fs = require('fs');
const { exit } = require('process');

function getInput() {
  var input = [];
  try {
    var data = fs.readFileSync('./resources/day12/input.txt', 'UTF-8').split(/\r?\n/);
    // data = fs.readFileSync('./resources/day12/input-test3.txt', 'UTF-8').split(/\r?\n/);
    // data = fs.readFileSync('./resources/day12/input-test2.txt', 'UTF-8').split(/\r?\n/);
    data = fs.readFileSync('./resources/day12/input-test1.txt', 'UTF-8').split(/\r?\n/);
    data.forEach((line) => {
      if (line.length > 0) {
        input.push(line.split("-"));
      }
    });
  } catch (err) {
    console.error(err);
  }
  return input;
}
class Cave {
  constructor(name) {
    this.name = name;
    this.isMultipleEntry = name.toUpperCase() === name;
    this.linkedCaves = [];
    this.visited = false;
  }

  addLinkedCave(cave) {
    this.linkedCaves.push(cave);
  }

  isVisitable() {
    return this.visited === false || this.isMultipleEntry;
  }

  isEnd() {
    return this.name === "end";
  }
  isStart() {
    return this.name === "start";
  }
}


function createCaveMap(input) {
  var caveMap = new Map();

  for (var i = 0; i < input.length; i++) {
    var cave1 = input[i][0];
    var cave2 = input[i][1];

    if (!caveMap.has(cave1)) {
      caveMap.set(cave1, new Cave(cave1));
    }

    if (!caveMap.has(cave2)) {
      caveMap.set(cave2, new Cave(cave2));
    }

    var cave1 = caveMap.get(cave1);
    var cave2 = caveMap.get(cave2);

    cave1.addLinkedCave(cave2);
    cave2.addLinkedCave(cave1);
  }
  return caveMap;
}

// unused
function bfsPath(start, caveMap) {
  const queue = [start];

  while (queue.length > 0) {
    const current = queue.shift();
    var linkedCaves = caveMap.get(current.name).linkedCaves;
    
    for (const linkedCave of linkedCaves) {
      if (linkedCave.isEnd()) {
        console.log("found 1st end");
      }
      if (linkedCave.isVisitable()) {
        linkedCave.visited = true;
        queue.push(linkedCave);
      }
    };
  }
}

function dfsPath(start) {
  if (start.isEnd()) {
    return 1
  }

  if ((start.visited === true && start.isStart()) || !start.isVisitable()) {
    return 0;
  }
  
  start.visited = true;
  var path = 0;
  for (let c = 0; c < start.linkedCaves.length; c++) {
    path += dfsPath(start.linkedCaves[c]);
  }
  start.visited = false;

  return path;
}

function solve1() {
  var input = getInput();

  var caveMap = createCaveMap(input);
  var start = caveMap.get("start");
  var paths = dfsPath(start);

  return paths;
}

function dfsPathEvolution(start, canForceVisit) {
  if (start.isEnd()) {
    return 1
  }

  if ((start.visited === true && start.isStart()) || (!start.isVisitable() && !canForceVisit)) {
    return 0;
  }
  
  start.visited = true;
  var path = 0;
  for (let c = 0; c < start.linkedCaves.length; c++) {
    path += dfsPathEvolution(start.linkedCaves[c], !( !start.isVisitable() || !canForceVisit) );
  }
  start.visited = false;

  return path;
}

function solve2() {
  var input = getInput();

  var caveMap = createCaveMap(input);
  var start = caveMap.get("start");
  var paths = dfsPathEvolution(start, true);

  return paths;
}

console.log(solve1())
console.log(solve2())
