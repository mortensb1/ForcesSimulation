class Vec2 {
    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Set Vector to new Vector
     * @param {Vec2} v new Vector
     */
    set(v) {
        this.x = v.x;
        this.y = v.y;
    }

    /**
     *
     * @returns {Vec2} Returns the Cross vector (Rotated 90°)
     */
    hat() {
        let tempX = this.x;
        this.x = -this.y;
        this.y = tempX;
        return this;
    }

    normalize() {
        this.scale(1 / this.length());
        return this;
    }

    /**
     * Return a clone of the Vector
     * @returns {Vec2}
     */
    clone() {
        return new Vec2(this.x, this.y);
    }

    /**
     * Add scalor to Vector
     * @param {Vec2} v
     * @param {number} s
     * @returns {Vec2}
     */
    add(v, s = 1.0) {
        this.x += v.x * s;
        this.y += v.y * s;
        return this;
    }

    /**
     * Add Vectors
     * @param {Vec2} a
     * @param {Vec2} b
     * @returns {Vec2}
     */
    addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this;
    }

    /**
     * Subtact scalar from Vector
     * @param {Vec2} v
     * @param {number} s
     * @returns {Vec2}
     */
    subtract(v, s = 1.0) {
        this.x -= v.x * s;
        this.y -= v.y * s;
        return this;
    }

    /**
     * Subtract Vectors
     * @param {Vec2} a
     * @param {Vec2} b
     * @returns {Vec2} (a - b)
     */
    subtractVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
    }

    /**
     * Calculate the length
     * @returns {number}
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }

    distanceSquared(v) {
        let dx = this.x - v.x;
        let dy = this.y - v.y;
        return dx * dx + dy * dy;
    }

    /**
     * Scale the Vector
     * @param {number} s
     */
    scale(s) {
        this.x *= s;
        this.y *= s;
    }

    /**
     * Calcualte the dot product
     * @param {Vec2} v
     * @returns {number} The dot product
     */
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * Check if vector equal to other
     * @param {Vec2} v
     * @returns
     */
    equal(v) {
        return compareFloat(this.x, v.x) && compareFloat(this.y, v.y);
    }
}
