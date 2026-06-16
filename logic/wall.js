export class Wall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 16;
        this.maxHealth = 4;
        this.health = this.maxHealth;
        this.alive = true;
    }

    get isAlive() {
        return this.alive;
    }

    getDamageState() {
        if (this.health === this.maxHealth) return "pristine";
        if (this.health === this.maxHealth - 1) return "cracked";
        if (this.health === this.maxHealth - 2) return "damaged";
        if (this.health === this.maxHealth - 3) return "critical";
        return "destroyed";
    }

    takeDamage(amount = 1) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.alive = false;
        }
        return this.health;
    }

    repair(amount = this.maxHealth) {
        this.health = Math.min(this.maxHealth, this.health + amount);
        this.alive = this.health > 0;
        return this.health;
    }
}
