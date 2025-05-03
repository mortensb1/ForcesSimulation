class Triangle extends PhysicsObject {
    constructor(x, y, p1, p2, p3, velX, velY, mass, elasticity = 1, angle = 0, rotVel = 0, isStatic = false, color = [255, 255, 255]) {
        super(x, y, velX, velY, mass, elasticity, angle, rotVel, isStatic, color);
        this.startP1 = p1;
        this.startP2 = p2;
        this.startP3 = p3;

        this.corners = {
            p1: new Vec2(),
            p2: new Vec2(),
            p3: new Vec2()
        }
        this.normals = [];
        this.Cos = cos(this.angle);
        this.Sin = sin(this.angle);

        this.updateCorners();
        this.updateNormals();
    }

    draw() {
        push();
        translate(this.pos.x + width / 2, height / 2 - this.pos.y);
        rotate(-this.angle);
        fill(this.color);
        triangle(this.startP1.x, -this.startP1.y, this.startP2.x, -this.startP2.y, this.startP3.x, -this.startP3.y);
        pop();
    }

    updateNormals() {
        let tempVec = new Vec2();
        this.normals[0] = tempVec.subtractVectors(this.corners.p1, this.corners.p2).hat().clone();
        this.normals[1] = tempVec.subtractVectors(this.corners.p2, this.corners.p3).hat().clone();
        this.normals[2] = tempVec.subtractVectors(this.corners.p3, this.corners.p1).hat().clone();
    }

    updateCorners() {
        this.corners.p1.x = this.Cos * (this.startP1.x) - this.Sin * (this.startP1.y);
        this.corners.p1.y = this.Sin * (this.startP1.x) + this.Cos * (this.startP1.y);
        this.corners.p1.add(this.pos);

        this.corners.p2.x = this.Cos * (this.startP2.x) - this.Sin * (this.startP2.y);
        this.corners.p2.y = this.Sin * (this.startP2.x) + this.Cos * (this.startP2.y);
        this.corners.p2.add(this.pos);

        this.corners.p3.x = this.Cos * (this.startP3.x) - this.Sin * (this.startP3.y);
        this.corners.p3.y = this.Sin * (this.startP3.x) + this.Cos * (this.startP3.y);
        this.corners.p3.add(this.pos);
    }

    rotate(angleChange) {
        if (angleChange == 0) return; // Stop if no change
        this.angle += angleChange;
        this.Cos = cos(this.angle);
        this.Sin = sin(this.angle);
        this.updateCorners();
    }

    wallCollision() {

    }
}