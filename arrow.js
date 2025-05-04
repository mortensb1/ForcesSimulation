class Arrow {
    constructor(x, y, force, mag, dir) {
        this.x = x;
        this.y = y;
        this.force = force;
        this.arrowWeight = 10;
        this.arrowHead = this.arrowWeight*2;
        this.mag = mag - this.arrowHead;
        this.dir = dir;
    }

    draw () {
        push();
        translate(this.x + width/2, height/2 - this.y);
        rect(this.mag/2, 0, this.mag, this.arrowWeight);
        triangle(this.mag, this.arrowHead, this.mag, -this.arrowHead, this.mag + this.arrowHead + this.arrowWeight, 0);
        pop();
    }
}