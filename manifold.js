class Manifold {
    /**
     * Object that contains everything about an collision
     * @param {PhysicsObject} bodyA
     * @param {PhysicsObject} bodyB
     * @param {Vec2} normal
     * @param {Number} depth
     * @param {Vec2} contact1
     * @param {Vec2} contact2
     * @param {Number} contactCount
     */
    constructor(bodyA, bodyB, normal, depth, contact1, contact2, contactCount = 0) {
        this.bodyA = bodyA;
        this.bodyB = bodyB;
        this.normal = normal;
        this.depth = depth;
        this.contact1 = contact1;
        this.contact2 = contact2;
        this.contactCount = contactCount;
    }
}
