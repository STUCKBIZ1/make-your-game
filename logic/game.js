export class Game {
    constructor(player = new Player(400, 500)) {
        this.player = player;
        this.score = 0;
        this.level = 1;
        this.isRunning = false;
        this.isGameOver = false;
    }

    start() {
        this.isRunning = true;
        this.isGameOver = false;
    }

    pause() {
        this.isRunning = false;
    }

    endGame() {
        this.isRunning = false;
        this.isGameOver = true;
    }

    reset() {
        this.score = 0;
        this.level = 1;
        this.isRunning = false;
        this.isGameOver = false;
        if (this.player && typeof this.player.resetHealth === "function") {
            this.player.resetHealth();
        }
    }

    addScore(points = 0) {
        this.score += points;
        return this.score;
    }

    nextLevel() {
        this.level += 1;
        return this.level;
    }
}
