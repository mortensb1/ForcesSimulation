class Ball extends PhysicsObject {
    /**
     *
     * @param {number} x Start x posistion
     * @param {number} y Start y posistion
     * @param {number} r Radius of ball
     * @param {number} velX Start x velocity
     * @param {number} velY Start y velocity
     * @param {number} mass Mass of ball
     * @param {number} elasticity The restituion (How much energi is kept)
     */
    constructor(x, y, r, velX, velY, mass, elasticity = 1, color = [255, 255, 255]) {
        super(x, y, velX, velY, mass, elasticity, color);
        this.r = r;
        this.type = Ball;

        this.inertia = this.calcRotInertia();
        if (!this.isStatic) {
            this.invInertia = 1 / this.inertia;
        } else {
            this.invInertia = 0;
        }
    }

    /**
     * Draw object
     */
    draw() {
        circle(this.pos.x + width / 2, height / 2 - this.pos.y, 2 * this.r);
    }

    /**
     * Change the Velocity if Obejct collides with Wall
     */
    wallCollision() {
        // Check if Collide with Left and Right, and change Vel
        if (this.pos.x + this.r >= width / 2) {
            this.pos.x = width / 2 - this.r; // Correction
            this.vel.x = -this.vel.x * this.elasticity;
        } else if (this.pos.x - this.r <= -width / 2) {
            this.pos.x = -width / 2 + this.r; // Correction
            this.vel.x = -this.vel.x * this.elasticity;
        }
        // Check if Collide with Top and Bottom, and change Vel
        if (this.pos.y + this.r >= height / 2) {
            this.pos.y = height / 2 - this.r; // Correction
            this.vel.y = -this.vel.y * this.elasticity;
        } else if (this.pos.y - this.r <= -height / 2) {
            this.pos.y = -height / 2 + this.r; // Correction
            this.vel.y = -this.vel.y * this.elasticity;
        }
    }

    calcRotInertia() {
        return (1 / 2) * this.mass * this.r ** 2;
    }
}
