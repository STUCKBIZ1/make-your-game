
export class Bullet {
  constructor(x, y, dy, w = 4, h = 12, damage = 1) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dy = dy;
    this.damage = damage;
    this.alive = true;
  }

  update() {
    this.y += this.dy;
    if (this.y + this.h < 0 || this.y > (window.innerHeight || 600))
      this.alive = false;
  }

  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  collides(ax, ay, aw, ah) {
    return (
      this.x < ax + aw &&
      this.x + this.w > ax &&
      this.y < ay + ah &&
      this.y + this.h > ay
    );
  }
}

window.Bullet = Bullet;
