import { state } from './state.js';

export function togglePause() {
    state.isPaused = !state.isPaused;
    if (state.isPaused) {
        state.pauseMenu.style.display = "block";
    } else {
        state.pauseMenu.style.display = "none";
        state.lastTime = performance.now(); // block time in pause game
    }
}
