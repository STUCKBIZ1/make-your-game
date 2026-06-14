import './input.js';
import { gameLoop } from './loop.js';
import { spawnEnemiesGrid } from './entities.js';

// Initialize the game loop
requestAnimationFrame(gameLoop);
spawnEnemiesGrid();