class Rect extends PhysicsObject {
  constructor(x, y, w, h, velX, velY, mass, elasticity = 1, rot = 0, rotVel = 0, isStatic = false) {
    super(x, y, velX, velY, mass, elasticity, rot, rotVel, isStatic);
    this.w = w;
    this.h = h;
    this.corners = {
      tl: new Vec2(-this.w / 2, this.h / 2),
      tr: new Vec2(this.w / 2, this.h / 2),
      bl: new Vec2(-this.w / 2, this.h / 2),
    };
    this.normals = [];
  }

  /**
   * Draw Object
   */
  draw() {
    push();
    translate(this.pos.x + width / 2, height / 2 - this.pos.y);
    rotate(this.rot);
    rect(0, 0, this.w, this.h);
    pop();
  }

  updateNormals() {}

  /**
   * Change the Velocity if Obejct collides with Wall
   */
  wallCollision() {
    if (this.pos.x > (width - this.w) / 2 || this.pos.x < (-width + this.w) / 2) {
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y > (height - this.h) / 2 || this.pos.y < (-height + this.h) / 2) {
      this.vel.y = -this.vel.y;
    }
  }
}
