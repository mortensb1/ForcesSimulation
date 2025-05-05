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
            this.vel.add(G, 1 / fps);
            this.vel.add(windStrength, 1 / fps);
            if (gravityBox.checkBoxBool) {
                if (G.y != 0) {
                    drawForce(G.clone().scale(-this.mass), "Gravity", this);
                }
            }
            if (windBox.checkBoxBool) {
                if (windStrength.x != 0) {
                    drawForce(windStrength.clone().scale(this.mass), "Wind", this);
                }
            }

            this.angle += this.angularVel / fps;
            this.updateCorners();
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
