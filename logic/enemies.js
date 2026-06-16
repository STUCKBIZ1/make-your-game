export class Enemie {
    constructor(line, row, enemieX, enemieY, health, tag, scorePoint, speed) {
        this.line = line;
        this.row = row;
        this.enemieX = enemieX;
        this.enemieY = enemieY;
        this.health = health;
        this.tag = tag;
        this.scorePoint = scorePoint;
        this.speed = speed;

        this.alive = true;
    }

    get x() {
        return this.enemieX;
    }

    set x(newX) {
        this.enemieX = newX;
    }

    get y() {
        return this.enemieY;
    }

    set y(newY) {
        this.enemieY = newY;
    }

    isAlive() {
        return this.alive;
    }

    moveX(direction) {
        if (!this.alive) {
            return;
        }
        this.enemieX += this.speed * direction;
    }

    moveY(amount) {
        if (this.tag !== "boss" && this.alive) {
            this.enemieY += amount;
        }
    }

    takeDamage(amount = 1) {
        if (!this.alive) {
            return 0;
        }

        this.health = Math.max(0, this.health - amount);
        if (this.health <= 0) {
            this.alive = false;
            return this.scorePoint;
        }
        return 0;
    }
}
