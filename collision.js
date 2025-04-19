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

  for (let i = 0; i < obj1.normals.length + obj2.normals.length; i++) {
    let normal;
    if (i < obj1.normals.length) normal = obj1.normals[i];
    else normal = obj2.normals[i - obj1.normals.length];

    let min1 = Infinity;
    let min2 = Infinity;

    let max1 = -Infinity;
    let max2 = -Infinity;

    for (let point in obj1.corners) {
      let dotProduct = obj1.corners[point].dot(normal);
      min1 = min(min1, dotProduct);
      max1 = max(max1, dotProduct);
    }

    for (let point in obj2.corners) {
      let dotProduct = obj2.corners[point].dot(normal);
      min2 = min(min2, dotProduct);
      max2 = max(max2, dotProduct);
    }
    // print("mins:", round(min1, 2), round(min2, 2), "   Maxs:", round(max1, 2), round(max2, 2));
    // print("Collision:", (min1 <= max2 && min1 >= min2) || (max1 <= max2 && max1 >= min2));

    if (!((min1 <= max2 && min1 >= min2) || (max1 <= max2 && max1 >= min2))) return false;
  }

  return true;
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
