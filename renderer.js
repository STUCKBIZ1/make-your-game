import { state } from './state.js';

export function render() {
    state.avatar.style.left = state.avatarX + 'px';
    state.avatar.style.top = state.avatarY + 'px';

    if (state.score !== state.lastScore) {
        state.scoreElement.textContent = state.score;
        state.lastScore = state.score;
    }

    // Enemy Render
    for (let i = 0; i < state.enemies.length; i++) {
        let enemy = state.enemies[i];
        enemy.element.style.left = enemy.x + 'px';
    }

    // Bullet Render
    for (let i = 0; i < state.bullets.length; i++) {
        let bullet = state.bullets[i];
        bullet.element.style.top = bullet.y + 'px';
    }
}
