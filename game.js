// 1. Variables
const avatarWidth = 50;
const avatarHeight = 50;
let avatarX = (window.innerWidth - avatarWidth) / 2;
let avatarY = (window.innerHeight - avatarHeight) / 2;
let lastTime = 0;
const speed = 0.2;
let score = 0;
let gameTime = 0;
let lastScore = -1;
let isPaused = false;

const enemies = [
    {
        element: document.getElementById("enemy1"), 
        x: 10,          
        y: 10,          
        speedX: 0.15,   
        direction: 1 
    }
];


// 2. Keys
const Keys = {
    ArrowRight: false,
    ArrowLeft: false,
    ArrowUp: false,
    ArrowDown: false
};

// 3. DOM Element
const avatar = document.getElementById("avatar");
const scoreElement = document.getElementById("score");
const pauseMenu = document.getElementById("pause-menu");

// 4. Event Listeners 
window.addEventListener('keydown', (e) => {
    if (e.code === "KeyP") {
        isPaused = !isPaused
    }
    if (isPaused) {
        pauseMenu.style.display = "block"
    } else {
        pauseMenu.style.display = "none"

        lastTime = performance.now(); // block time in pause game
    }

    if (Keys.hasOwnProperty(e.code)) {
        Keys[e.code] = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (Keys.hasOwnProperty(e.code)) {
        Keys[e.code] = false;
    }
});

// 5. Game Loop
function gameLoop(timestamp) {
    if (isPaused) {
        requestAnimationFrame(gameLoop);
        return;
    }
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    if (Keys.ArrowRight) avatarX += speed * deltaTime;
    if (Keys.ArrowLeft) avatarX -= speed * deltaTime;
    if (Keys.ArrowUp) avatarY -= speed * deltaTime;
    if (Keys.ArrowDown) avatarY += speed * deltaTime;

    if (avatarX < 0) {
        avatarX = 0;
    } else if (avatarX + avatarWidth > window.innerWidth) {
        avatarX = window.innerWidth - avatarWidth;
    }
    if (avatarY < 0) {
        avatarY = 0; 
    } else if (avatarY + avatarHeight > window.innerHeight) {
        avatarY = window.innerHeight - avatarHeight;
    }

    avatar.style.left = avatarX + 'px';
    avatar.style.top = avatarY + 'px';

    gameTime += deltaTime
    score = Math.floor(gameTime / 1000);

    if (score !== lastScore) {
        scoreElement.textContent = score;
        lastScore = score;
    }

    // Enemy Logic
    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];

        // 1. Update State
        enemy.x = enemy.x + (enemy.speedX * enemy.direction * deltaTime);

        // 2. Collision with screen bounds
        if (enemy.x <= 0 || enemy.x + 40 >= window.innerWidth) {
            enemy.direction = enemy.direction * -1;
        }

        // 3. Render
        enemy.element.style.left = enemy.x + 'px';
    }

    requestAnimationFrame(gameLoop);
}




requestAnimationFrame(gameLoop);