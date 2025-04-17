class PhysicsObject {
    constructor(x, y, velX, velY, mass) {
        this.pos = new Vec2(x, y);
        this.vel = new Vec2(velX, velY);
        this.mass = mass
    }

    update() {
        this.vel.add(G, 1/fps);
        this.pos.add(this.vel, 1/fps);
    }
}