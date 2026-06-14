export const state = {
    avatarWidth: 50,
    avatarHeight: 50,
    avatarX: (window.innerWidth - 50) / 2,
    avatarY: (window.innerHeight - 50) / 2,
    lastTime: 0,
    speed: 0.2,
    score: 0,
    gameTime: 0,
    lastScore: -1,
    isPaused: false,
    bullets: [],
    enemies: [],
    Keys: {
        ArrowRight: false,
        ArrowLeft: false,
    },
    avatar: document.getElementById("avatar"),
    scoreElement: document.getElementById("score"),
    pauseMenu: document.getElementById("pause-menu")
};
