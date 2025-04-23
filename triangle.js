class Triangle extends PhysicsObject {
    constructor(x, y, h, w, velX, velY, mass, elasticity = 1, angle = 0, rotVel = 0, isStatic = false) {
        super(x, y, velX, velY, mass, elasticity, angle, rotVel, isStatic);
        this.h = h;
        this.w = w;

        this.corners = {
            p1: new Vec2(),
            p2: new Vec2(),
            p3: new Vec2()
        }
    }

    updateCorners() {
        
    }
}