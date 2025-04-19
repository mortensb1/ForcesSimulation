class Rect extends PhysicsObject {
  constructor(x, y, w, h, velX, velY, mass) {
    super(x, y, velX, velY, mass);
    this.w = w;
    this.h = h;
  }

  /**
   * Draw Object
   */
  draw() {
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }

  /**
   * Change the Velocity if Obejct collides with Wall
   */
  wallCollision() {
    if (this.pos.x > width - this.w || this.pos.x < 0) {
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y > height - this.h || this.pos.y < 0) {
      this.vel.y = -this.vel.y;
    }
  }
}
