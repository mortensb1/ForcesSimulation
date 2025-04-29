class PhysicsObject {
  constructor(x, y, velX, velY, mass, elasticity = 1, angle = 0, rotVel = 0, isStatic = false) {
    this.pos = new Vec2(x, y);
    this.vel = new Vec2(velX, velY);
    this.mass = mass;
    this.angle = angle;
    this.rotVel = rotVel;

    this.elasticity = elasticity;
    this.isStatic = isStatic;

    if (!this.isStatic) {
      this.invMass = 1 / this.mass;
    } else {
      this.invMass = 0;
    }
  }

  /**
   * Update Vel and Pos
   */
  update() {
    this.vel.add(G, 1 / fps);
    this.pos.add(this.vel, 1 / fps);
  }

  /**
   * Apply an Force the the Object
   * @param {Vec2} f
   * @param {number} s
   */
  force(f, s = 1) {
    this.vel.add(f, s);

    line(this.x + width / 2, height / 2 - this.y, this.x + width / 2 + f.x, height / 2 - (this.y + f.y));
  }
}
