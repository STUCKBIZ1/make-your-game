import { state } from './state.js';

export function togglePause() {
    state.isPaused = !state.isPaused;
    
    if (state.isPaused) {
        state.pauseMenu.style.display = "block";
        state.pauseBtn.textContent = "▶"; 
    } else {
        state.pauseMenu.style.display = "none";
        state.pauseBtn.textContent = "||"; 
        state.lastTime = performance.now(); // block time in pause game
    }
}

// game over screen
export function showGameOver(score) {
    const screen = document.getElementById('game-over-screen');
    document.getElementById('final-score').textContent = score;
    screen.classList.remove('hidden');
    
    document.getElementById('restart-btn').addEventListener('click', () => {
        window.location.reload(); // أسهل طريقة لـ Restart
    });
}
