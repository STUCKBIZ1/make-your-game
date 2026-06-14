import { state } from './state.js';
import { togglePause } from './ui.js';
import { spawnBullet } from './entities.js';

window.addEventListener('keydown', (e) => {
    // pause menu
    if (e.code === "KeyP") {
        togglePause();
    }
    
    if (state.Keys.hasOwnProperty(e.code)) {
        state.Keys[e.code] = true;
    }
    
    // bullet space
    if (e.code === 'Space' && !state.isPaused) {
        spawnBullet();
    }
});

window.addEventListener('keyup', (e) => {
    if (state.Keys.hasOwnProperty(e.code)) {
        state.Keys[e.code] = false;
    }
});
