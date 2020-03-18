
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter new moves: ", function(input) {
  console.log(`New coordinates are: ${calculate(input)}`);
  rl.close();
})

function calculate(rawInput) {
  const input = rawInput.split('\\n');

  const size = input[0];

  let robots = [];
  const instructions = input.slice(1);
  for(let i = 0; i < instructions.length; i += 2) {
    robots.push({
      position: {
        x: parseInt(instructions[i].split(' ')[0], 10),
        y: parseInt(instructions[i].split(' ')[1]),
        orientation: instructions[i].split(' ')[2],
      },
      moves: instructions[i + 1].split(''),
    });
  }

  let newPositions = [];
  robots.forEach(({position, moves}) => {
    let newPosition = position;
    moves.forEach(action => {
      if (action === 'M') {
        newPosition = move(position);
      } else {
        newPosition = rotate(position, action);
      }
    })
    newPositions.push(position);
  });

  return newPositions.reduce(
    (acc, curr) => {
      return acc + '\n' + `${curr.x} ${curr.x} ${curr.orientation}`;
    },
    '',
  );
}


function rotate({orientation}, rotation) {
  if (orientation === 'N' && rotation === 'L') {
    return 'W';
  } else if (orientation === 'W' && rotation === 'L') {
    return 'S';
  } else if (orientation === 'S' && rotation === 'L') {
    return 'E';
  } else if (orientation === 'E' && rotation === 'L') {
    return 'N';
  } else if (orientation === 'N' && rotation === 'R') {
    return 'E';
  } else if (orientation === 'E' && rotation === 'R') {
    return 'S';
  } else if (orientation === 'S' && rotation === 'R') {
    return 'W';
  } else if (orientation === 'W' && rotation === 'R') {
    return 'N';
  }
}

function move({x, y, orientation}) {
  if (orientation === 'N') {
    return {
      x,
      y: y + 1,
    };
  } else if (orientation === 'S') {
    return {
      x,
      y: y - 1,
    };
  } else if (orientation === 'W') {
    return {
      x: x - 1,
      y,
    }
  } else if (orientation === 'E') {
    return {
      x: x + 1,
      y,
    };
  }
}

