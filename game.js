// 1. Variables
let avatarX = 0;
let avatarY = 0;
let lastTime = 0;
const speed = 0.2;
let score = 0;
let gameTime = 0;
let lastScore = -1;
let isPaused = false;


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

        lastTime = performance.now();
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

    avatar.style.left = avatarX + 'px';
    avatar.style.top  = avatarY + 'px';

    gameTime += deltaTime
   score = Math.floor(gameTime / 1000);

   if (score !== lastScore) {
        scoreElement.textContent = score;
        lastScore = score;
    }

    requestAnimationFrame(gameLoop);
}




requestAnimationFrame(gameLoop);