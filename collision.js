// Get all the edge normals
// Remove doubbels
// Project (dot product) the vertecies on the

/**
 * Check for collision between two polygons
 * @param {Rect} obj1
 * @param {Rect} obj2
 */
function collisionRect(obj1, obj2) {
    obj1.updateCorners();
    obj2.updateCorners();

    let depth = Infinity;
    let normal;

    // Check for all Normals
    for (let i = 0; i < obj1.normals.length + obj2.normals.length; i++) {
        // Select the Normal
        let axis;
        if (i < obj1.normals.length) {
            axis = obj1.normals[i];
        } else {
            axis = obj2.normals[i - obj1.normals.length];
        }

        axis.normalize();

        let min1 = Infinity;
        let min2 = Infinity;

        let max1 = -Infinity;
        let max2 = -Infinity;

        // Calc the max and min points projected on the axis
        for (let point in obj1.corners) {
            let dotProduct = obj1.corners[point].dot(axis);
            min1 = min(min1, dotProduct);
            max1 = max(max1, dotProduct);
        }

        // Calc the max and min points on the axis
        for (let point in obj2.corners) {
            let dotProduct = obj2.corners[point].dot(axis);
            min2 = min(min2, dotProduct);
            max2 = max(max2, dotProduct);
        }

        // Check if there is a space
        if (min1 >= max2 || min2 >= max1) {
            return { collision: false, normal: null, depth: null };
        }
        let axisDepth = min(max2 - min1, max1 - min2);
        if (axisDepth < depth) {
            depth = axisDepth;
            normal = axis;
        }
    }

    // Check normal direction
    let posDif = new Vec2();
    posDif.subtractVectors(obj1.pos, obj2.pos);
    if (posDif.dot(normal) < 0) normal.scale(-1);

    // Correct for the intersection, so that it doesn get stuck inside
    if (obj1.isStatic) {
        obj2.pos.add(normal, -depth);
    } else if (obj2.isStatic) {
        obj1.pos.add(normal, depth);
    } else {
        obj1.pos.add(normal, depth / 2);
        obj2.pos.add(normal, -depth / 2);
    }

    // If no space is found then there is a collision
    return { collision: true, normal: normal, depth: depth };
}

/**
 * Check for collision between polygon and ball
 * @param {Rect} rect
 * @param {Ball} ball
 */
function collisionRectBall(rect, ball) {
    rect.updateCorners();
    let depth = Infinity;
    let normal;

    // Check collision for the rect normals first
    for (let i = 0; i < rect.normals.length; i++) {
        let axis = rect.normals[i];
        axis.normalize();

        let minRect = Infinity;
        let minBall = Infinity;

        let maxRect = -Infinity;
        let maxBall = -Infinity;

        // Calc the max and min points projected on the axis
        minBall = ball.pos.clone().add(axis, -ball.r).dot(axis);
        maxBall = ball.pos.clone().add(axis, ball.r).dot(axis);

        // Calc the max and min points projected on the axis
        for (let point in rect.corners) {
            let dotProduct = rect.corners[point].dot(axis);
            minRect = min(minRect, dotProduct);
            maxRect = max(maxRect, dotProduct);
        }

        // If NO collision return false
        if (minRect >= maxBall || minBall >= maxRect) {
            return { collision: false, normal: null, depth: null };
        }

        // Calculate the dept of the intersection and save the smallest
        let axisDepth = min(maxBall - minRect, maxRect - minBall);
        if (axisDepth < depth) {
            depth = axisDepth;
            normal = axis;
        }
    }

    // Find the closest point on polygon and calculate the axis between the point and the ball center
    let minPoint = closestPointOnPolygon(ball.pos, rect.corners);
    let axis = minPoint.subtract(ball.pos).normalize();

    let minRect = Infinity;
    let minBall = Infinity;

    let maxRect = -Infinity;
    let maxBall = -Infinity;

    // Calc the max and min points projected on the axis
    minBall = ball.pos.clone().add(axis, -ball.r).dot(axis);
    maxBall = ball.pos.clone().add(axis, ball.r).dot(axis);

    // Calc the max and min points projected on the axis
    for (let point in rect.corners) {
        let dotProduct = rect.corners[point].dot(axis);
        minRect = min(minRect, dotProduct);
        maxRect = max(maxRect, dotProduct);
    }

    // If NO collision return false
    if (minRect >= maxBall || minBall >= maxRect) {
        return { collision: false, normal: null, depth: null };
    }

    // Calculate the dept of the intersection and save the smallest
    let axisDepth = min(maxBall - minRect, maxRect - minBall);
    if (axisDepth < depth) {
        depth = axisDepth;
        normal = axis;
    }

    // Make sure the normal is not rotated 180 degrees
    let posDif = new Vec2();
    posDif.subtractVectors(rect.pos, ball.pos);
    if (posDif.dot(normal) < 0) normal.scale(-1);

    // Correct for the intersection, so that it doesn get stuck inside
    if (rect.isStatic) {
        ball.pos.add(normal, -depth);
    } else if (ball.isStatic) {
        rect.pos.add(normal, depth);
    } else {
        rect.pos.add(normal, depth / 2);
        ball.pos.add(normal, -depth / 2);
    }

    return { collision: true, normal: normal, depth: depth };
}

/**
 * Calculate the closest points on polygon to point
 * @param {Vec2} pos
 * @param {Array<Vec2>} verts
 */
function closestPointOnPolygon(pos, verts) {
    let minDist = Infinity;
    let minPoint;

    let tempVec = new Vec2();
    for (let vert in verts) {
        let dis = min(tempVec.subtractVectors(verts[vert], pos).length(), minDist);
        if (dis < minDist) {
            minDist = dis;
            minPoint = verts[vert].clone();
        }
    }

    return minPoint;
}

/**
 *
 * @param {Ball} ball1
 * @param {Ball} ball2
 * @returns
 */
function collisionBall(ball1, ball2) {
    let normal = new Vec2();
    normal.subtractVectors(ball2.pos, ball1.pos);

    depth = ball1.r + ball2.r - normal.length();

    if (depth < 0) {
        return { collision: false, normal: null, depth: null };
    }

    normal.normalize();

    // Correct for the intersection, so that it doesn get stuck inside
    if (ball1.isStatic) {
        ball2.pos.add(normal, depth);
    } else if (ball2.isStatic) {
        ball1.pos.add(normal, -depth);
    } else {
        ball1.pos.add(normal, -depth / 2);
        ball2.pos.add(normal, depth / 2);
    }

    return { collision: true, normal: normal, depth: depth };
}

/**
 *
 * @param {PhysicsObject} bodyA
 * @param {PhysicsObject} bodyB
 * @returns
 */
function findContactPoints(bodyA, bodyB) {
    let contact1 = new Vec2();
    let contact2 = new Vec2();
    let contactCount = 0;

    // Select the right combination
    if (bodyA.type == Rect || bodyA.type == Triangle) {
        if (bodyB.type == Rect || bodyA.type == Triangle) {
        } else if (bodyB.type == Ball) {
            contact1 = findContactBallRect(bodyB, bodyA);
            contactCount = 1;
        }
    } else if (bodyA.type == Ball) {
        if (bodyB.type == Rect || bodyB.type == Triangle) {
            contact1 = findContactBallRect(bodyA, bodyB);
            contactCount = 1;
        } else if (bodyB.type == Ball) {
            contact1 = findContactBall(bodyA, bodyB);
            contactCount = 1;
        }
    }

    return { contact1: contact1, contact2: contact2, contactCount: contactCount };
}

/**
 * Find contact point between two balls
 * @param {Ball} ball1
 * @param {Ball} ball2
 * @returns
 */
function findContactBall(ball1, ball2) {
    let contactPoint = new Vec2();
    contactPoint.subtractVectors(ball2.pos, ball1.pos);
    contactPoint.normalize().scale(ball1.r);
    contactPoint.add(ball1.pos);

    return contactPoint;
}

/**
 * Find contact point between ball and rect
 * @param {Ball} ball
 * @param {Rect} rect
 * @returns Contact point
 */
function findContactBallRect(ball, rect) {
    let minDist = Infinity;
    let contactPoint;
    let verts = [];
    for (p in rect.corners) {
        verts.push(rect.corners[p]);
    }
    for (let i = 0; i < verts.length; i++) {
        let va = verts[i];
        let vb = verts[(i + 1) % verts.length];

        let res = pointLineDistance(ball.pos, va, vb);
        let distSquared = res.distanceSquared;
        let contact = res.contact;

        if (distSquared < minDist) {
            minDist = distSquared;
            contactPoint = contact;
        }
    }

    return contactPoint;
}

/**
 * Calc distance from line to point
 * @param {Vec2} p Point
 * @param {Vec2} a Line point 1
 * @param {Vec2} b Line point 2
 * @returns Distance and Contact point
 */
function pointLineDistance(p, a, b) {
    let contactPoint;

    let ab = new Vec2();
    ab.subtractVectors(b, a);
    let ap = new Vec2();
    ap.subtractVectors(p, a);

    let projection = ap.dot(ab);
    let abLenSq = ab.lengthSquared();
    let d = projection / abLenSq;

    if (d == 0) {
        contactPoint = a.clone();
    } else if (d >= 1) {
        contactPoint = b.clone();
    } else {
        contactPoint = a.clone();
        ab.scale(d);
        contactPoint.add(ab);
    }

    let distanceSquared = p.distanceSquared(contactPoint);
    return { distanceSquared: distanceSquared, contact: contactPoint };
}

/**
 * Resolves collision between two objects
 * @param {Manifold} manifold
 * @returns
 */
function resolveCollision(manifold) {
    let obj1 = manifold.bodyA;
    let obj2 = manifold.bodyB;
    let normal = manifold.normal;
    let relativeVel = new Vec2();
    relativeVel.subtractVectors(obj2.vel, obj1.vel);

    // Do nothing if objects are already moving apart
    if (relativeVel.dot(normal) > 0) {
        return;
    }

    let e = min(obj1.elasticity, obj1.elasticity);

    let j = -(1 + e) * relativeVel.dot(normal);
    j = j / (obj1.invMass + obj2.invMass);

    let impulse = normal.clone();
    impulse.scale(j);

    obj1.force(impulse, -1);
    obj2.force(impulse, 1);
}

function drawNormalsRect(rect) {
    for (let i = 0; i < rect.normals.length; i++) {
        line(rect.pos.x + width / 2, height / 2 - rect.pos.y, rect.pos.x + rect.normals[i].x + width / 2, height / 2 - (rect.pos.y + rect.normals[i].y));
    }
}
