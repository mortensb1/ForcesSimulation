
class Ball extends PhysicsObject {
    constructor(x, y, r, velX, velY, mass) {
        super(x, y, velX, velY, mass);
        this.r = r;
    }

    draw() {
        circle(this.pos.x, this.pos.y, 2*this.r)
    }

    wallCollision() {
        if (this.pos.x + this.r >= width || this.pos.x - this.r <= 0) {
            this.vel.x = -this.vel.x;
        }
        if (this.pos.y + this.r >= height || this.pos.y - this.r <= 0) {
            this.vel.y = -this.vel.y;
        }
    }

    /**
     * Checks for collision with other Ball object
     * @param {Ball} ball2  Other ball object to check collision.
     * @param {number} elasticity 
     * @returns Coid
     */
    checkCollisionBall(ball2, elasticity) {
        // Calc the distance for the balls 
        let dir = new Vec2;
        dir.subtractVectors(ball2.pos, this.pos);

        let dis = dir.length();

        // Stop if no Collision
        if (dis <= this.r*2) return null;

        // Make the direction a unit Vec
        dir.scale(dis)

        // Calculate the current velocoties in the collision direction
        let v1 = this.vel.dot(ball2);
        let v2 = ball2.vel.dot(this.vel);

        let m1 = this.mass;
        let m2 = ball2.mass;

        // Calc the new veloceties with phycis formula
        let newV1 = (m1 * v1 + m2 * v2 - m2 * (v1 - v2) * elasticity) / (m1 + m2)
        let newV2 = (m1 * v1 + m2 * v2 - m1 * (v2 - v1) * elasticity) / (m1 + m2)
    }
    
    /**
     * Checks for collision with Rectangle object
     * @param {*} colObj Rectangle to check for collision. 
     * @returns Void
     */
    checkCollisionRect(colObj) {
        
    }
}