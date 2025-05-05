function drawForce(force, forceType, obj, relPos = new Vec2(0, 0), inverse = false) {
    let arrowWeight = 10;
    let arrowHead = arrowWeight * 2;
    let mag = sqrt(force.x ** 2 + force.y ** 2) / 100;
    let dirVec = force.clone().normalize();
    let dir;
    if (Math.asin(dirVec.y) < 0) {
        dir = Math.acos(dirVec.x);
    } else {
        dir = 2 * Math.PI - Math.acos(dirVec.x);
    }
    mag -= arrowHead;
    push();
    translate(obj.pos.x + width / 2 + relPos.x, height / 2 - (obj.pos.y + relPos.y));
    rotate(-dir);
    if (forceType == "Gravity") {
        fill(gravityColor[0], gravityColor[1], gravityColor[2]);
    } 
    else if (forceType == "Wind") {
        fill(windColor[0], windColor[1], windColor[2])
    }
    else if ((forceType = "Applied")) {
        fill(appliedColor[0], appliedColor[1], appliedColor[2]);
    }
    rect(mag / 2, 0, mag, arrowWeight);
    triangle(mag, arrowHead, mag, -arrowHead, mag + arrowHead + arrowWeight, 0);
    pop();
}
