// Get all the edge normals
// Remove doubbels
// Project (dot product) the vertecies on the

/**
 *
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
  obj1.pos.add(normal, depth / 2);
  obj2.pos.add(normal, -depth / 2);

  // If no space is found then there is a collision
  return { collision: true, normal: normal, depth: depth };
}

function collisionRectBall(rect, ball) {
  rect.updateCorners();

  let axis = new Vec2();
  axis.subtractVectors(rect.pos, ball.pos).normalize();

  let minRect = Infinity;
  let minBall = Infinity;

  let maxRect = -Infinity;
  let maxBall = -Infinity;

  // Calc the max and min points of the rect projected on the axis
  for (let point in rect.corners) {
    let dotProduct = rect.corners[point].dot(axis);
    minRect = min(minRect, dotProduct);
    maxRect = max(maxRect, dotProduct);
  }

  // Calc the max and min points of the circle projected on the axis
  minBall = ball.pos.clone().add(axis, -ball.r).dot(axis);
  maxBall = ball.pos.clone().add(axis, ball.r).dot(axis);

  if (minRect >= maxBall || minBall >= maxRect) return { collision: false, normal: null, depth: null };

  let depth = min(maxBall - minRect, maxRect - minBall);

  // Correct for the intersection, so that it doesn get stuck inside
  rect.pos.add(axis, depth / 2);
  ball.pos.add(axis, -depth / 2);

  return { collision: true, normal: axis, depth: depth };
}

function collisionBall(ball1, ball2) {
  let normal = new Vec2();
  normal.subtractVectors(ball2.pos, ball1.pos);

  depth = ball1.r + ball2.r - normal.length();

  if (depth < 0) {
    return { collision: false, normal: null, depth: null };
  }

  normal.normalize();

  // Correct for the intersection, so that it doesn get stuck inside
  ball1.pos.add(normal, -depth / 2);
  ball2.pos.add(normal, depth / 2);

  return { collision: true, normal: normal, depth: depth };
}

function resolveCollision(obj1, obj2, normal) {
  let relativeVel = new Vec2();
  relativeVel.subtractVectors(obj2.vel, obj1.vel);

  let e = min(obj1.elasticity, obj1.elasticity);

  let j = (1 + e) * relativeVel.dot(normal);
  j = j / (1 / obj1.mass + 1 / obj2.mass);

  obj1.force(normal, j / obj1.mass);
  obj2.force(normal, -j / obj2.mass);
}

function drawNormalsRect(rect) {
  for (let i = 0; i < rect.normals.length; i++) {
    line(rect.pos.x + width / 2, height / 2 - rect.pos.y, rect.pos.x + rect.normals[i].x + width / 2, height / 2 - (rect.pos.y + rect.normals[i].y));
  }
}

function colCirCir(cir1, cir2) {}

function colRectCir(rect, cir) {
  if (cir.pos.y > rect.pos.y + rect.h) {
    closeY = rect.pos.y + rect.h;
  } else if (cir.pos.y < rect.pos.y) {
    closeY = rect.pos.y;
  }
  if (cir.pos.x > rect.pos.x + rect.w) {
    closeX = rect.pos.x + rect.w;
  } else if (cir.pos.x < rect.pos.x) {
    closeX = rect.pos.x;
  }

  let dis = (closeX - cir.pos.x) ** 2 + (closeY - cir.pos.y) ** 2;
  if (dis < cir.r ** 2) {
    if (closeY == rect.pos.y + rect.h) {
      if (closeX == rect.pos.x + rect.w) {
      }
    }
  }
}
