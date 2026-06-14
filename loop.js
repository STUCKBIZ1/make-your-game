import { state } from './state.js';
import { updateLogic } from './logic.js';
import { render } from './renderer.js';

export function gameLoop(timestamp) {
    if (state.isPaused) {
        requestAnimationFrame(gameLoop);
        return;
    }
    const deltaTime = timestamp - state.lastTime;
    state.lastTime = timestamp;

    updateLogic(deltaTime);
    render();

    requestAnimationFrame(gameLoop);
}
