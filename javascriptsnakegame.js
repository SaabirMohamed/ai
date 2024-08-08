 // entire file content ...
 console.clear();
 const readline = require('readline');
 const clearScreen =
 equire('react-devtools/lib/clearConsole');
 
const gridSize = 20;
let snake = [[Math.floor(gridSize / 2),
Math.floor(gridSize / 2)]];
let direction = 'right';
let food = null;

function createGrid() {
    const grid =
 Array(gridSize).fill(Array(gridSize).fill(0));
    grid[Math.floor(gridSize / 2)][Math.floor(gridSize
 2)] = 1; // snake head
    return grid;
 +}

function drawGrid(grid) {
    clearScreen();
    for (let y = 0; y < gridSize; y++) {
        let row = '';
        for (let x = 0; x < gridSize; x++) {
            if (x === 0) row += ' ';
            const cellValue = grid[y][x];
            if (cellValue === 1) row += 'O'; // snake
 head
 +            else if (cellValue === 2) row += 'o'; //
 food
 +            else row += '.';
 +            if (x === gridSize - 1) console.log(row);
 +        }
 +    }
 +}
 +
 +function moveSnake() {
 +    const [headX, headY] = snake[0];
 +    switch (direction) {
 +        case 'up':
 +            snake[0][0] -= 1;
 +            break;
 +        case 'down':
 +            snake[0][0] += 1;
 +            break;
 +        case 'left':
 +            snake[0][1] -= 1;
 +            break;
 +        case 'right':
 +            snake[0][1] += 1;
 +            break;
 +    }
 +}
 +
 +function checkCollision() {
 +    const [headX, headY] = snake[0];
 +    if (headX < 0 || headX >= gridSize || headY < 0 ||
 headY >= gridSize) return true;
 +    for (let i = 1; i < snake.length; i++) {
 +        const [x, y] = snake[i];
 +        if (x === headX && y === headY) return true;
 +    }
 +    return false;
 +}
 +
 +function checkEatFood() {
 +    if (!food) return false;
 +    const [headX, headY] = snake[0];
 +    if (headX === food[0] && headY === food[1]) {
 +        snake.push([...snake[snake.length - 1]]);
 +        food = null;
 +        return true;
 +    }
 +    return false;
 +}
 +
 +function generateFood() {
 +    let x, y;
 +    do {
 +        x = Math.floor(Math.random() * gridSize);
 +        y = Math.floor(Math.random() * gridSize);
 +    } while (grid[y][x] === 2); // avoid placing food
 existing food
 +    food = [x, y];
 +}
 +
 +function gameLoop() {
 +    const grid = createGrid();
 +    drawGrid(grid);
 +    generateFood();
 +    let gameOver = false;
 +    while (!gameOver) {
 +        moveSnake();
 +        if (checkCollision()) gameOver = true;
 +        if (checkEatFood()) generateFood();
 +        drawGrid(grid);
 +        readline.clearLine(Infinity);
 +        readline.cursorTo(Infinity, 0);
 +    }
 +    console.log('Game Over! Press any key to restart.'
 +    readline.question();
 +}
 +
 +console.log("Alright, let's play some snake!");
 +gameLoop();

 +
 +console.log("Alright, let's play some snake!");         +gameLoop();
