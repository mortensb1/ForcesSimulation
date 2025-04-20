class Rect extends PhysicsObject {
  constructor(x, y, w, h, velX, velY, mass, elasticity = 1, angle = 0, rotVel = 0, isStatic = false) {
    super(x, y, velX, velY, mass, elasticity, angle, rotVel, isStatic);
    this.w = w;
    this.h = h;
    this.r = sqrt((this.w / 2) ** 2 + (this.h / 2) ** 2);
    this.corners = {
      tl: new Vec2(-this.w / 2, this.h / 2), // Top Left
      tr: new Vec2(this.w / 2, this.h / 2), // Top Right
      bl: new Vec2(-this.w / 2, -this.h / 2), // Bottom Left
      br: new Vec2(this.w / 2, -this.h / 2), // Bottom Right
    };
    this.normals = [];
    this.type = Rect;

    this.Cos = cos(this.angle);
    this.Sin = sin(this.angle);
    this.updateCorners();
    this.updateNormals();
  }

  /**
   * Draw Object
   */
  draw() {
    push();
    translate(this.pos.x + width / 2, height / 2 - this.pos.y);
    rotate(-this.angle);
    rect(0, 0, this.w, this.h);
    pop();
  }

  updateNormals() {
    let tempVec = new Vec2();
    this.normals[0] = tempVec.subtractVectors(this.corners.tr, this.corners.tl).hat().clone(); // Top normal
    this.normals[1] = tempVec.subtractVectors(this.corners.br, this.corners.tr).hat().clone(); // Right normal

    // Bruger ikke resten til Collision da de svarer til a gange de andre normaler med -1.
    // this.normals[2] = tempVec.subtractVectors(this.corners.bl, this.corners.br).hat().clone(); // Bottom normal
    // this.normals[3] = tempVec.subtractVectors(this.corners.tl, this.corners.bl).hat().clone(); // Left normal
  }

  updateCorners() {
    // Calculate new pos of corners
    this.corners.tl.x = this.Cos * (-this.w / 2) - this.Sin * (this.h / 2); // x2 = cos(a)*x1 - sin(a)*y1
    this.corners.tl.y = this.Sin * (-this.w / 2) + this.Cos * (this.h / 2); // y2 = sin(a)*x1 + cos(a)*y1
    this.corners.tl.add(this.pos);

    this.corners.tr.x = this.Cos * (this.w / 2) - this.Sin * (this.h / 2); // x2 = cos(a)*x1 - sin(a)*y1
    this.corners.tr.y = this.Sin * (this.w / 2) + this.Cos * (this.h / 2); // y2 = sin(a)*x1 + cos(a)*y1
    this.corners.tr.add(this.pos);

    this.corners.br.x = this.Cos * (this.w / 2) - this.Sin * (-this.h / 2); // x2 = cos(a)*x1 - sin(a)*y1
    this.corners.br.y = this.Sin * (this.w / 2) + this.Cos * (-this.h / 2); // y2 = sin(a)*x1 + cos(a)*y1
    this.corners.br.add(this.pos);

    this.corners.bl.x = this.Cos * (-this.w / 2) - this.Sin * (-this.h / 2); // x2 = cos(a)*x1 - sin(a)*y1
    this.corners.bl.y = this.Sin * (-this.w / 2) + this.Cos * (-this.h / 2); // y2 = sin(a)*x1 + cos(a)*y1
    this.corners.bl.add(this.pos);
  }

  rotate(angleChange) {
    if (angleChange == 0) return; // Stop if no change
    this.angle += angleChange;
    this.Cos = cos(this.angle);
    this.Sin = sin(this.angle);
    this.updateCorners();
    this.updateNormals();
  }

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
