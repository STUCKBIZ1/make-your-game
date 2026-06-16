const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const AVATAR_SIZE = 50;

export const state = {
    gameWidth: GAME_WIDTH,
    gameHeight: GAME_HEIGHT,
    avatarWidth: AVATAR_SIZE,
    avatarHeight: AVATAR_SIZE,
    avatarX: (GAME_WIDTH - AVATAR_SIZE) / 2,
    avatarY: GAME_HEIGHT - AVATAR_SIZE - 20, 
    lastTime: 0,
    speed: 0.2,
    score: 0,
    lives: 3,
    lastLives: -1,
    gameTime: 0,
    lastScore: -1,
    isPaused: false,
    bullets: [],
    enemies: [],
    Keys: { ArrowRight: false, ArrowLeft: false },
    avatar: null,
    scoreElement: null,
    livesElement: null,
    pauseMenu: null,
    gameContainer: null,
    walls: [],
    gameObj: null,   
    playerObj: null
};

export function initDOM() {
    state.avatar = document.getElementById("avatar");
    state.scoreElement = document.getElementById("score");
    state.livesElement = document.getElementById("lives");
    state.pauseMenu = document.getElementById("pause-menu");
    state.gameContainer = document.getElementById("game-container");
    state.pauseBtn = document.getElementById("pause-btn");

}