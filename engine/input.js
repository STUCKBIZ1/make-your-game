import { state }       from '../ui/state.js';
import { togglePause } from '../ui/menu.js';
import { Bullet }      from '../logic/bullet.js';
document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft')  state.Keys.ArrowLeft  = true;
    if (e.code === 'ArrowRight') state.Keys.ArrowRight = true;
    if (e.code === 'KeyP')       togglePause();
    if (e.code === 'KeyR')       window.location.reload();
    if (e.code === 'Space') {
        e.preventDefault();
        shoot();
    }
});
document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft')  state.Keys.ArrowLeft  = false;
    if (e.code === 'ArrowRight') state.Keys.ArrowRight = false;
});
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pause-btn')?.addEventListener('click', togglePause);
    document.getElementById('continue-btn')?.addEventListener('click', togglePause);
    document.getElementById('restart-btn')?.addEventListener('click', () => window.location.reload());
});
export function handleInput() {
    const speed = 5;
    if (state.Keys.ArrowLeft)  state.avatarX = Math.max(0, state.avatarX - speed);
    if (state.Keys.ArrowRight) state.avatarX = Math.min(state.gameWidth - state.avatarWidth, state.avatarX + speed);
}
let lastShot = 0;

function shoot() {
    if (state.isPaused) return;
    const now = Date.now();
    if (now - lastShot < 400) return;
    lastShot = now;
    const x = state.avatarX + state.avatarWidth / 2 - 3;
    const y = state.avatarY - 14;
    const logic = new Bullet(x, y, -9); 
    const dom = document.createElement('div');
    dom.className = 'bullet';
    dom.style.cssText = `position:absolute; left:${x}px; top:${y}px;`;

    state.gameContainer.appendChild(dom);
    state.bullets.push({ logic, dom });
}