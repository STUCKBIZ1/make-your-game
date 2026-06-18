import { state, initDOM } from '../ui/state.js';
import { render }         from '../ui/renderer.js';
import { Game }           from '../logic/game.js';
import { Player }         from '../logic/player.js';
import { Enemie }         from '../logic/enemies.js';
import { Wall }           from '../logic/wall.js';
import { handleInput }    from './input.js';
window.addEventListener('DOMContentLoaded', () => {
    initDOM();
    setup();
    requestAnimationFrame(loop);
});

function setup() {
    state.playerObj = new Player(state.avatarX, state.avatarY);
    state.gameObj   = new Game(state.playerObj);
    state.gameObj.start();
    state.lives = state.playerObj.health;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 10; col++) {
            const x = 40 + col * 55;
            const y = 40 + row * 55;
            const logic = new Enemie(row, col, x, y, 1, 'basic', 10, 1);

            const dom = document.createElement('div');
            dom.className = 'enemy';
            dom.style.cssText = `position:absolute; width:40px; height:40px; left:${x}px; top:${y}px;`;
            state.gameContainer.appendChild(dom);
            state.enemies.push({ logic, dom });
        }
    }
    for (let i = 0; i < 4; i++) {
        const x = 80 + i * 180;
        const y = 480;
        const logic = new Wall(x, y);

        const dom = document.createElement('div');
        dom.className = 'wall';
        dom.style.cssText = `position:absolute; width:50px; height:20px; left:${x}px; top:${y}px;`;
        state.gameContainer.appendChild(dom);
        state.walls.push({ logic, dom });
    }
}
let lastTime = 0;

function loop(now) {
    const dt = now - lastTime;
    lastTime = now;

    if (!state.isPaused && state.gameObj.isRunning) {
        handleInput();
        moveBullets();
        moveEnemies(dt);
        checkCollisions();
    }

    render();
    requestAnimationFrame(loop);
}
function moveBullets() {
    for (let i = state.bullets.length - 1; i >= 0; i--) {
        const b = state.bullets[i];
        b.logic.update();

        if (!b.logic.alive) {
            b.dom.remove();
            state.bullets.splice(i, 1);
        }
    }
}
let enemyDir = 1;

function moveEnemies(dt) {
    const step = 0.06 * dt * enemyDir;

    let hitEdge = false;
    for (const e of state.enemies) {
        if (e.logic.x + step < 0 || e.logic.x + 40 + step > state.gameWidth) {
            hitEdge = true;
            break;
        }
    }

    if (hitEdge) {
        enemyDir *= -1;
        for (const e of state.enemies) e.logic.moveY(20);
    } else {
        for (const e of state.enemies) e.logic.moveX(enemyDir);
    }
}
function checkCollisions() {
    for (let bi = state.bullets.length - 1; bi >= 0; bi--) {
        for (let ei = state.enemies.length - 1; ei >= 0; ei--) {
            const b = state.bullets[bi];
            const e = state.enemies[ei];

            if (b.logic.collides(e.logic.x, e.logic.y, 40, 40)) {
                b.dom.remove();
                state.bullets.splice(bi, 1);

                const points = e.logic.takeDamage(1);
                if (!e.logic.isAlive()) {
                    e.dom.remove();
                    state.enemies.splice(ei, 1);
                    state.score = state.gameObj.addScore(points || 10);
                }
                break;
            }
        }
    }
    for (const e of state.enemies) {
        if (e.logic.y + 40 >= state.gameHeight) {
            state.gameObj.endGame();
        }
    }
}