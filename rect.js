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
    push();
    rotate(this.rot);
    translate(this.pos.x, this.pos.y);
    rect(0, 0, this.w, this.h);
    pop();
  }

  /**
   * Change the Velocity if Obejct collides with Wall
   */
  wallCollision() {
    if (this.pos.x > width - this.w / 2 || this.pos.x < 0 + this.w / 2) {
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y > height - this.h / 2 || this.pos.y < 0 + this.h / 2) {
      this.vel.y = -this.vel.y;
    }
  }
}
