let avatarX = 0;
let lastTime = 0;
const speed = 0.2; 

function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    
    if (Keys.ArrowRight) {
        avatarX += speed * deltaTime;
    }
    
    avatar.style.left = avatarX + 'px';
    console.log("Current Position:", avatarX);
    
    lastTime = timestamp;
    requestAnimationFrame(gameLoop);
    
}