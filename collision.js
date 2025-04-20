// Get all the edge normals
// Remove doubbels
// Project (dot product) the vertecies on the

/**
 *
 * @param {Rect} obj1
 * @param {Rect} obj2
 */
function collision(obj1, obj2) {
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
    if (min1 >= max2 || min2 >= max1) return { collision: false, normal: null, depth: null };

    let axisDepth = min(max2 - min1, max1 - min2);
    if (axisDepth < depth) {
      depth = axisDepth;
      normal = axis;
    }
  }

  // Normalize the depth of the intersection and the normal
  let normalLen = normal.length();
  depth = depth / normalLen;
  normal.scale(1 / normalLen);

  // Check normal direction
  let posDif = new Vec2();
  posDif.subtractVectors(obj1.pos, obj2.pos);
  if (posDif.dot(normal) < 0) normal.scale(-1);

  // If no space is found then there is a collision
  return { collision: true, normal: normal, depth: depth };
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
