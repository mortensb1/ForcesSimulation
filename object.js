class PhysicsObject {
    constructor(x, y, velX, velY, mass, elasticity = 1, angle = 0, rotVel = 0, isStatic = false, color = [255, 255, 255], staticFriction = 0.6, dynamicFriction = 0.4) {
        this.pos = new Vec2(x, y);
        this.vel = new Vec2(velX, velY);
        this.mass = mass;
        this.angle = angle;
        this.angularVel = rotVel;
        this.color = color;
        this.staticFriction = staticFriction;
        this.dynamicFriction = dynamicFriction;

        this.elasticity = elasticity;
        this.isStatic = isStatic;
        this.windConst;
        this.windAcc = new Vec2();
        this.relVel;

        if (!this.isStatic) {
            this.invMass = 1 / this.mass;
        } else {
            this.invMass = 0;
        }

        this.inertia;
        this.invInertia;
    }

    /**
     * Update Vel and Pos
     */
    update() {
        if (!this.isStatic) {
            let c = 1;

            this.relVel = this.vel.clone().subtract(windStrength);
            if (this.relVel.x < 0) {
                c = -1
            }
            this.windAcc = new Vec2((-this.windConst * (this.relVel.x/100)**2 * c) / this.mass, 0);

            // Adding accelerations
            this.vel.add(G, 1 / fps);
            this.vel.add(this.windAcc, 1 / fps);

            this.angle += this.angularVel / fps;
            this.updateCorners();

            //Draw forces
            if (gravityBox.checkBoxBool) {
                if (G.y != 0) {
                    drawForce(G.clone().scale(-this.mass), "Gravity", this);
                }
            }
            if (windBox.checkBoxBool) {
                if (windStrength.x != 0) {
                    drawForce(this.windAcc.clone().scale(this.mass), "Wind", this);
                }
            }
        }

        this.pos.add(this.vel, 1 / fps);
    }

    /**
     * Apply a Force the the Object
     * @param {Vec2} f
     * @param {number} s
     */
    force(f, forceType, s = 1) {
        let acc = f.clone();
        acc.scale(this.invMass);

        this.vel.add(acc, s);

        strokeWeight(10);
        line(this.pos.x + width / 2, height / 2 - this.pos.y, this.pos.x + width / 2 + (f.x / 20) * s, height / 2 - (this.pos.y + (f.y / 20) * s));
        strokeWeight(1);
    }

    changeColor(newColor) {
        this.color = newColor;
    }
}
