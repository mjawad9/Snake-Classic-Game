const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 15;
const canvasSize = 300;

let snake, direction, food, score, game;

// 🚫 Prevent page scrolling on arrow keys
window.addEventListener("keydown", function (e) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
    }
});

// 🎮 Controls
document.addEventListener("keydown", changeDirection);

function initGame() {
    snake = [{ x: 180, y: 180 }];
    direction = "RIGHT";
    score = 0;
    food = randomFood();
    document.getElementById("score").innerText = "Score: 0";

    clearInterval(game);
    game = setInterval(drawGame, 120);
}

function randomFood() {
    return {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
}

function changeDirection(e) {
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function drawGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Snake
    ctx.fillStyle = "lime";
    snake.forEach(part => ctx.fillRect(part.x, part.y, box, box));

    // Food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let head = { ...snake[0] };

    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    // Game Over
    if (
        head.x < 0 || head.y < 0 ||
        head.x >= canvasSize || head.y >= canvasSize ||
        snakeCollision(head)
    ) {
        clearInterval(game);
        alert("Game Over! Score: " + score);
        return;
    }

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").innerText = "Score: " + score;
        food = randomFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

function snakeCollision(head) {
    return snake.some(part => part.x === head.x && part.y === head.y);
}

// 🔁 Restart button
function restartGame() {
    initGame();
}

// Start game
initGame();
