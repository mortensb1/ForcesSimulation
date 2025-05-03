let x = 200;
let y = 200;
let velx = 2;
let vely = 2;
const fps = 60;
let G;
let balls = [];
let polygons = [];

function setup() {
    rectMode(CENTER);
    angleMode(DEGREES);
    createCanvas(1920, 1080);
    frameRate(fps);
    //noStroke();
    G = new Vec2(0, -9.82);
    //G = new Vec2(0, 0);

    scene = new Scene();

    // polygons.push(new Triangle(0, 0, new Vec2(0, 20), new Vec2(-20, 0), new Vec2(20, 0), 10, 0, 20));

    // balls.push(new Ball(-150, 0, 10, 0, 0, 10));
    // balls.push(new Ball(-150, 30, 10, 0, 0, 20));

    for (i = 0; i < 10; i++) {
        balls.push(new Ball(random(-150, 150), random(-150, 150), 10, random(-150, 150), random(-50, 50), 10, 1));
    }

    polygons.push(new Rect(0, 0, 50, 20, 50, 0, 20));
    // rects.push(new Rect(0, 0, 50, 20, 0, 0, 20));
    polygons.push(new Rect(100, 10, 50, 20, -5, 0, 20, 1, 0, 0, false));
}

function draw() {
    background(220);

    scene.update();
}
