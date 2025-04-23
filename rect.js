class Rect extends PhysicsObject {
  constructor(x, y, w, h, velX, velY, mass, elasticity = 1, angle = 0, rotVel = 0, isStatic = false) {
    super(x, y, velX, velY, mass, elasticity, angle, rotVel, isStatic);
    this.w = w;
    this.h = h;
    this.corners = {
      tl: new Vec2(), // Top Left
      tr: new Vec2(), // Top Right
      bl: new Vec2(), // Bottom Left
      br: new Vec2(), // Bottom Right
    };
    this.cornersMinAndMax = {};
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

  updateCornersMinAndMax() {
    this.updateCorners();
    this.cornersMinAndMax = {
      minX: min(this.corners.tl.x, this.corners.bl.x, this.corners.tr.x, this.corners.br.x),
      minY: min(this.corners.tl.y, this.corners.bl.y, this.corners.tr.y, this.corners.br.y),
      maxX: max(this.corners.tl.x, this.corners.bl.x, this.corners.tr.x, this.corners.br.x),
      maxY: max(this.corners.tl.y, this.corners.bl.y, this.corners.tr.y, this.corners.br.y)
    };
  }

  /**
   * Change the Velocity if Obejct collides with Wall
   */
  wallCollision() {
    this.updateCornersMinAndMax();
    if (this.cornersMinAndMax.maxX > width / 2 || this.cornersMinAndMax.minX < -width / 2) {
      this.vel.x = -this.vel.x;
    }
    if (this.cornersMinAndMax.maxY > height / 2 || this.cornersMinAndMax.minY < -height / 2) {
      this.vel.y = -this.vel.y;
    }
  }
}
