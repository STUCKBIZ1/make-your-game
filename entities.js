import { state } from './state.js';

export function spawnBullet() {
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
    const bulletX = state.avatarX + (state.avatarWidth / 2) - 2;
    const bulletY = state.avatarY;
    
    bulletNode.style.left = bulletX + 'px';
    bulletNode.style.top = bulletY + 'px';
    
    // 4. Append to DOM Tree
    document.body.appendChild(bulletNode);
    
    // 5. Add to Game State
    state.bullets.push({
        element: bulletNode,
        x: bulletX,
        y: bulletY,
        speedY: 0.5 // bullet speed
    });
}

export function updateBullets(deltaTime) {
    for (let i = state.bullets.length - 1; i >= 0; i--) {
        let bullet = state.bullets[i];
        
        // 1. Update State
        bullet.y -= bullet.speedY * deltaTime;
        
        // 3. Memory & DOM Cleanup
        if (bullet.y < 0) {
            bullet.element.remove(); // remove bullet from DOM Tree
            state.bullets.splice(i, 1);    // remove bullet from Array in memory
        }
    }
}
// create grid of enemies
export function spawnEnemiesGrid() {
    const rows = 4;        
    const cols = 8;        
    const enemySize = 40;  
    const padding = 20;    
    
    const startX = 50;
    const startY = 80;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // 1. Create DOM Node
            const enemyNode = document.createElement('div');
            enemyNode.className = 'enemy';
            enemyNode.style.position = 'absolute';
            enemyNode.style.width = enemySize + 'px';
            enemyNode.style.height = enemySize + 'px';
            
            const xPos = startX + c * (enemySize + padding);
            const yPos = startY + r * (enemySize + padding);
            
            // 3. Render Initial Position
            enemyNode.style.left = xPos + 'px';
            enemyNode.style.top = yPos + 'px';
            document.body.appendChild(enemyNode);
            
            // 4. Add to Memory (State)
            state.enemies.push({
                element: enemyNode,
                x: xPos,
                y: yPos,
                speedX: 0.1,
                direction: 1 
            });
        }
    }
}