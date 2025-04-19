class PhysicsObject {
  constructor(x, y, velX, velY, mass, elasticity = 1, rot = 0, rotVel = 0, isStatic = false) {
    this.pos = new Vec2(x, y);
    this.vel = new Vec2(velX, velY);
    this.mass = mass;
    this.rot = rot;
    this.rotVel = rotVel;

    this.elasticity = elasticity;
    this.isStatic = isStatic;
  }

  /**
   * Update Vel and Pos
   */
  update() {
    this.vel.add(G, 1 / fps);
    this.pos.add(this.vel, 1 / fps);
  }
}
