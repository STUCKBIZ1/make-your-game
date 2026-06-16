export class Player {
    constructor(playerX, playerY, healthMax = 3) {
        this.playerX = playerX;
        this.playerY = playerY;
        this._healthMax = healthMax;
        this._health = healthMax;
        this.speed = 5;
        this.isShilded = false;
        this._shieldTimer = null;
    }

    get x() {
        return this.playerX;
    }

    set x(newX) {
        this.playerX = newX;
    }

    get y() {
        return this.playerY;
    }

    set y(newY) {
        this.playerY = newY;
    }

    get health() {
        return this._health;
    }

    set health(amount) {
        this._health = Math.max(0, Math.min(amount, this._healthMax));
    }

    get healthMax() {
        return this._healthMax;
    }

    set healthMax(amount) {
        this._healthMax = Math.max(1, amount);
        this._health = Math.min(this._health, this._healthMax);
    }

    isAlive() {
        return this._health > 0;
    }

    setPosition(x, y) {
        this.playerX = x;
        this.playerY = y;
    }

    resetHealth() {
        this._health = this._healthMax;
        this.isShilded = false;
        this._clearShieldTimer();
    }

    activateShield() {
        this.isShilded = true;
        this._clearShieldTimer();
        this._shieldTimer = setTimeout(() => {
            this.isShilded = false;
            this._shieldTimer = null;
        }, 1000);
    }

    deactivateShield() {
        this.isShilded = false;
        this._clearShieldTimer();
    }

    _clearShieldTimer() {
        if (this._shieldTimer !== null) {
            clearTimeout(this._shieldTimer);
            this._shieldTimer = null;
        }
    }

    move(direction, canvasWidth) {
        if (direction === "LEFT") {
            this.playerX -= this.speed;
        } else if (direction === "RIGHT") {
            this.playerX += this.speed;
        }

        if (this.playerX < 0) {
            this.playerX = 0;
        }

        if (this.playerX > canvasWidth) {
            this.playerX = canvasWidth;
        }
    }

    takeDamage(damage) {
        if (this.isShilded) {
            return this._health;
        }

        this.health = this._health - damage;
        this.activateShield();

        if (this._health <= 0) {
            console.log("Game Over!");
        }
        return this._health;
    }

    heal(amount = 1) {
        this.health = this._health + amount;
        return this._health;
    }
}
