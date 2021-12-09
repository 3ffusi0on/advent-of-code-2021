const { log } = require('console');
const fs = require('fs')

function getInput() {
  var input = [];
  try {
    const data = fs.readFileSync('./resources/day08/input.txt', 'UTF-8').split(/\r?\n/);
    data.forEach((line) => {
      if (line.length > 0) {
        let grp = line.split(" | ");
        input.push({ unknownNumbers: grp[0].split(" "), outputNumbers: grp[1].split(" ") });
      }
    });


  } catch (err) {
    console.error(err);
  }

  return input;
}


function solve1() {
  var input = getInput();
  var sum = 0;
  for (numbers of input) {
    sum += numbers.outputNumbers.filter(x => [2, 3, 4, 7].includes(x.length)).length;
  }

  return sum;
}


function solve2() {
  var input = getInput();
  sum = 0;
  for (line of input) {
    sum += solveLine(line)
  }

  return sum;
}

function solveLine(line) {
  var one = line.unknownNumbers.filter(x => x.length == 2)[0]
  var seven = line.unknownNumbers.filter(x => x.length == 3)[0]
  var four = line.unknownNumbers.filter(x => x.length == 4)[0]
  var eight = line.unknownNumbers.filter(x => x.length == 7)[0]
  var three = line.unknownNumbers.filter(x => x.length == 5).filter(x => one.split("").every(l => x.includes(l)))[0]
  var nine = line.unknownNumbers.filter(x => x.length == 6).filter(x => three.split("").every(l => x.includes(l)))[0]
  var five = line.unknownNumbers.filter(x => x.length == 5).filter(x => countDifference(nine, x) == 1).filter(x => !x.includes(three))[0]
  var six = line.unknownNumbers.filter(x => x.length == 6).filter(x => countDifference(five, x) == 1).filter(x => !x.includes(nine))[0]
  var zero = line.unknownNumbers.filter(x => x.length == 6).filter(x => countDifference(eight, x) == 1).filter(x => !x.includes(nine) && !x.includes(six))[0]
  var two  = line.unknownNumbers.filter(x => x.length == 5).filter(x => countDifference(three, x) == 2).filter(x => !x.includes(five))[0]

  values = [];
  values[zero.split("").sort().join("")] = "0",
  values[one.split("").sort().join("")] = "1",
  values[two.split("").sort().join("")] = "2",
  values[three.split("").sort().join("")] = "3",
  values[four.split("").sort().join("")] = "4",
  values[five.split("").sort().join("")] = "5",
  values[six.split("").sort().join("")] = "6",
  values[seven.split("").sort().join("")] = "7",
  values[eight.split("").sort().join("")] = "8",
  values[nine.split("").sort().join("")] = "9",
  
  var num = "";
  for (number of line.outputNumbers) {
    num += values[number.split("").sort().join("")]
  }
  return parseInt(num)
}

function countDifference(str1, str2) {
  return str1.split("").filter(x => !str2.split("").includes(x)).length
  + str2.split("").filter(x => !str1.split("").includes(x)).length
}

console.log(solve1())
console.log(solve2())
