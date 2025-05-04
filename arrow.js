function drawForce(force, forceType, obj, relPos = new Vec2(0,0)) {
    let arrowWeight = 10;
    let arrowHead = arrowWeight*2
    let mag = sqrt(force.x**2 + force.y**2) / 100;
    let dir = atan(force.y/force.x);
    mag -= arrowHead;
    push();
    translate(obj.pos.x + width/2 + relPos.x, height/2 - obj.pos.y + relPos.y);
    console.log(force);
    rotate(-dir);
    if(forceType == "Gravity") {
        fill(218, 193, 193);
    }
    rect(mag/2, 0, mag, arrowWeight);
    triangle(mag, arrowHead, mag, -arrowHead, mag + arrowHead + arrowWeight, 0);
    pop();
}