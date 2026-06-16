import { state } from './state.js';

export function render() {
    state.avatar.style.left = state.avatarX + 'px';
    state.avatar.style.top = state.avatarY + 'px';

    if (state.score !== state.lastScore) {
        state.scoreElement.textContent = state.score;
        state.lastScore = state.score;
    }
    if (state.lives !== state.lastLives) {
        state.livesElement.textContent = '💖'.repeat(state.lives);
        state.lastLives = state.lives;
    }
    // Enemy Render
    for (let i = 0; i < state.enemies.length; i++) {
        let enemy = state.enemies[i];
        enemy.dom.style.left = enemy.logic.x + 'px';
        enemy.dom.style.top = enemy.logic.y + 'px';
    }

    // Bullet Render
    for (let i = 0; i < state.bullets.length; i++) {
        let bullet = state.bullets[i];
        bullet.dom.style.left = bullet.logic.x + 'px';
        bullet.dom.style.top = bullet.logic.y + 'px';
    }
}
