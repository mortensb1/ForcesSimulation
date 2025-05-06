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
    constructor(x, y, r, velX, velY, mass, elasticity = 1, color = [255, 255, 255], hide = false) {
        super(x, y, velX, velY, mass, elasticity, color);
        this.r = r;
        this.type = Ball;
        this.angle = 0;
        this.formfac = 0.5;
        this.A = (this.r / 100)**2 * PI; //cross section area. Dividing by 100 because of pixel-meter ratio
        this.hide = hide;

        this.inertia = this.calcRotInertia();
        if (!this.isStatic) {
            this.invInertia = 1 / this.inertia;
        } else {
            this.invInertia = 0;
        }

        //Calculate wind resistance Const
        this.windConst = (1 / 2) * this.formfac * airDensity * this.A;
    }

    /**
     * Draw object
     */
    draw() {
        push();
        translate(this.pos.x + width / 2, height / 2 - this.pos.y);
        rotate(-this.angle);
        fill(this.color);
        if (this.hide) {
            noFill();
        }
        circle(0, 0, 2 * this.r);
        stroke(0, 100);
        if (this.hide) {
            noStroke();
        }
        line(0, 0, this.r, 0);
        stroke(0, 0);
        pop();
    }

    calcRotInertia() {
        return (1 / 2) * this.mass * this.r ** 2;
    }

    updateCorners() {}
}
