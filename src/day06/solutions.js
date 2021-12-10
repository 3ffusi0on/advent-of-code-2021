const { log } = require('console');
const fs = require('fs')

function getInput() {
  var input = [];
  try {
    var data = fs.readFileSync('./resources/day06/input.txt', 'UTF-8').split(/\r?\n/);
    // data = ["3,4,3,1,2"]
    data.forEach((line) => {
      if (line.length > 0) {
        input.push(line.split(",").map(Number));
      }
    });
    
    
  } catch (err) {
    console.error(err);
  }
  
  return input;
}


function solve1() {
  var population = getInput()[0];
  for (let day = 0; day < 80; day++) {
    population = evolve(population);
  }

  return population.length;
}


function evolve(population) {
  newPopulation = [];

  for (var i = 0; i < population.length; i++) {
    var current = population[i];
    if (current == 0) {
      newPopulation.push(6);
      newPopulation.push(8);
      continue;
    }
    current--;
    newPopulation.push(current);
  }
  return newPopulation;
}

function solve2() {
  var repartition = (new Array(9)).fill(Number(0));
  var population = getInput()[0];
  for (let nb = 0; nb < population.length; nb++) {
    repartition[population[nb]] = (repartition[population[nb]] || Number(0)) + Number(1);
  }
  for (let day = 0; day < 256; day++) {
    repartition = evolveRepartition(repartition);
  }

  return repartition.reduce((a, b) => a + b);
}

function evolveRepartition(repartition) {
  var buffer = repartition[0];
  for (var i = 0; i < 8; i++) {
    repartition[i] = repartition[i+1];
  }
  repartition[8] = buffer;
  repartition[6] += buffer;
  return repartition;
}

console.log(solve1())
console.log(solve2())
