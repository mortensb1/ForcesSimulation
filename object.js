class PhysicsObject {
  constructor(x, y, velX, velY, mass, elasticity = 1, angle = 0, rotVel = 0, isStatic = false, color = [255, 255, 255]) {
    this.pos = new Vec2(x, y);
    this.vel = new Vec2(velX, velY);
    this.mass = mass;
    this.angle = angle;
    this.rotVel = rotVel;
    this.color = color;

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
    if (!this.isStatic) {
      this.vel.add(G, 1 / fps);
    }
    this.pos.add(this.vel, 1 / fps);
  }

  /**
   * Apply a Force the the Object
   * @param {Vec2} f
   * @param {number} s
   */
  force(f, s = 1) {
    let acc = f.clone();
    acc.scale(this.invMass);

    this.vel.add(acc, s);

    // console.log(this.pos.x + width / 2 + f.x, height / 2 - (this.pos.y + f.y));

    strokeWeight(10);
    line(this.pos.x + width / 2, height / 2 - this.pos.y, this.pos.x + width / 2 + (f.x / 20) * s, height / 2 - (this.pos.y + (f.y / 20) * s));
    strokeWeight(1);
  }
}
