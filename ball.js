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

    /**
     * Checks for collision with other Ball object
     * @param {Ball} ball2  Other ball object to check collision.
     * @param {number} elasticity
     * @returns Void
     */
    checkCollisionBall(ball2, elasticity) {
        // Calc the distance for the balls
        let dir = new Vec2();
        dir.subtractVectors(ball2.pos, this.pos);

        let dis = dir.length();

        // Stop if no Collision
        if (dis <= this.r * 2) return null;

        // Make the direction a unit Vec
        dir.scale(dis);

        // Calculate the current velocoties in the collision direction
        let v1 = this.vel.dot(ball2);
        let v2 = ball2.vel.dot(this.vel);

        let m1 = this.mass;
        let m2 = ball2.mass;

        // Calc the new veloceties with phycis formula
        let newV1 = (m1 * v1 + m2 * v2 - m2 * (v1 - v2) * elasticity) / (m1 + m2);
        let newV2 = (m1 * v1 + m2 * v2 - m1 * (v2 - v1) * elasticity) / (m1 + m2);
    }

    /**
     * Checks for collision with Rectangle object
     * @param {*} colObj Rectangle to check for collision.
     * @returns Void
     */
    checkCollisionRect(colObj) {}
}
