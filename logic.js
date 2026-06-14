import { state } from './state.js';
import { updateBullets } from './entities.js';

export function updateLogic(deltaTime) {
    if (state.Keys.ArrowRight) state.avatarX += state.speed * deltaTime;
    if (state.Keys.ArrowLeft) state.avatarX -= state.speed * deltaTime;

    if (state.avatarX < 0) {
        state.avatarX = 0;
    } else if (state.avatarX + state.avatarWidth > window.innerWidth) {
        state.avatarX = window.innerWidth - state.avatarWidth;
    }

    state.gameTime += deltaTime;
    state.score = Math.floor(state.gameTime / 1000);

    // Enemy Logic
    for (let i = 0; i < state.enemies.length; i++) {
        let enemy = state.enemies[i];

        // 1. Update State
        enemy.x = enemy.x + (enemy.speedX * enemy.direction * deltaTime);

        // 2. Collision with screen bounds
        if (enemy.x <= 0 || enemy.x + 40 >= window.innerWidth) {
            enemy.direction = enemy.direction * -1;
        }
    }

    updateBullets(deltaTime);
}
