class PhysicsObject {
  constructor(x, y, velX, velY, mass, rot = 0, rotVel = 0) {
    this.pos = new Vec2(x, y);
    this.vel = new Vec2(velX, velY);
    this.mass = mass;
    this.rot = rot;
    this.rotVel = rotVel;
  }

  /**
   * Update Vel and Pos
   */
  update() {
    this.vel.add(G, 1 / fps);
    this.pos.add(this.vel, 1 / fps);
  }
}
