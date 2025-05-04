class Arrow {
    constructor(x = 0, y = 0, forceType = "", forceVec = new Vec2(0,0)) {
        this.x = x;
        this.y = y;
        this.forceVec = forceVec;
        this.forceType = forceType;
        this.arrowWeight = 10;
        this.arrowHead = this.arrowWeight*2;
    }

    draw () {
        this.mag = sqrt(this.forceVec.x**2 + this.forceVec.y**2) / 100;
        this.dir = atan(this.forceVec.y/this.forceVec.x);
        this.mag -= this.arrowHead;
        push();
        translate(this.x + width/2, height/2 - this.y);
        rotate(-this.dir);
        if(this.forceType == "Gravity") {
            fill(218, 193, 193);
        }
        rect(this.mag/2, 0, this.mag, this.arrowWeight);
        triangle(this.mag, this.arrowHead, this.mag, -this.arrowHead, this.mag + this.arrowHead + this.arrowWeight, 0);
        pop();
    }
}