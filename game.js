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
const bullets = [];

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
};

// 3. DOM Element
const avatar = document.getElementById("avatar");
const scoreElement = document.getElementById("score");
const pauseMenu = document.getElementById("pause-menu");

// 4. Event Listeners 
window.addEventListener('keydown', (e) => {
    // pause menu
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
    // bullet space
    if (e.code === 'Space' && !isPaused) {
        // 1. Create DOM Node
        const bulletNode = document.createElement('div');
        
        // 2. CSS Styling
        bulletNode.style.position = 'absolute';
        bulletNode.style.width = '4px';
        bulletNode.style.height = '15px';
        bulletNode.style.background = '#38bdf8';
        bulletNode.style.boxShadow = '0 0 10px #38bdf8';
        bulletNode.style.borderRadius = '2px';
        
        // 3. Initial Position
        const bulletX = avatarX + (avatarWidth / 2) - 2;
        const bulletY = avatarY;
        
        bulletNode.style.left = bulletX + 'px';
        bulletNode.style.top = bulletY + 'px';
        
        // 4. Append to DOM Tree
        document.body.appendChild(bulletNode);
        
        // 5. Add to Game State
        bullets.push({
            element: bulletNode,
            x: bulletX,
            y: bulletY,
            speedY: 0.5 // bullet speed
        });
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

    if (avatarX < 0) {
        avatarX = 0;
    } else if (avatarX + avatarWidth > window.innerWidth) {
        avatarX = window.innerWidth - avatarWidth;
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
    // bullet movement
    for (let i = bullets.length - 1; i >= 0; i--) {
        let bullet = bullets[i];
        
        // 1. Update State
        bullet.y -= bullet.speedY * deltaTime;
        
        // 2. Render State
        bullet.element.style.top = bullet.y + 'px';
        
        // 3. Memory & DOM Cleanup
        if (bullet.y < 0) {
            bullet.element.remove(); // remove bullet from DOM Tree
            bullets.splice(i, 1);    // remove bullet from Array in memory
        }
    }

    requestAnimationFrame(gameLoop);
}




requestAnimationFrame(gameLoop);