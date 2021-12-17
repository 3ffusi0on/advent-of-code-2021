const fs = require('fs')

function getInput() {
  var input = [];
  try {
    var data = fs.readFileSync('./resources/day17/input.txt', 'UTF-8').split(/\r?\n/);
    // data = fs.readFileSync('./resources/day17/input-test.txt', 'UTF-8').split(/\r?\n/);
    data.forEach((line) => {
      if (line.length > 0) {
        let grp = line.match(/x=([-]{0,1}\d+)\.\.([-]{0,1}\d+), y=([-]{0,1}\d+)\.\.([-]{0,1}\d+)/);
        input.push({ x1: parseInt(grp[1]), x2: parseInt(grp[2]), y1: parseInt(grp[3]), y2: parseInt(grp[4]) });
      }
    });
  } catch (err) {
    console.error(err);
  }
  return input[0];
}

function solve1() {
  var input = getInput();
  var minX = Math.min(input.x1, input.x2);
  var maxX = Math.max(input.x1, input.x2);
  var minY = Math.min(input.y1, input.y2);
  var maxY = Math.max(input.y1, input.y2);
  var result = 0;
  var hitTarget = 0;
  for (let dx = 1; dx <= maxX; dx++) {
    for (let dy = -1000; dy < 1000; dy++) {

      velocityX = dx;
      velocityY = dy;
      let max = 0, x = 0, y = 0;
      let onTarget = false;
      while (x < maxX && y > minY) {
        x += velocityX;
        y += velocityY;
        if (velocityX < 0) {
          velocityX += 1;
        } else if (velocityX > 0) {
          velocityX -= 1;
        }
        velocityY -= 1;


        if (y > max) {
          max = y;
        }

        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
          // console.log(`Hit at ${x}, ${y}`);
          onTarget = true;
          break;
        }

      }

      if (onTarget) {
        hitTarget += 1;
        result = max > result ? max : result;
      }

    }
  }
  return { result, hitTarget };
}

console.log(solve1())
