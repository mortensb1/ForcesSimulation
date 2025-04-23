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
  G = new Vec2(0, -9.82);
  // G = new Vec2(0, 0);

  polygons.push(new Triangle(0, 0, new Vec2(0, 20), new Vec2(-20, 0), new Vec2(20, 0), 10, 0, 20));

  createCanvas(400, 400);
  frameRate(fps);
  // balls.push(new Ball(-150, 0, 10, 0, 0, 10));
  // balls.push(new Ball(-150, 30, 10, 0, 0, 20));

  for (i = 0; i < 10; i++) {
    balls.push(new Ball(random(-150, 150), random(-150, 150), 10, random(-150, 150), random(0, 4), 10, 1));
  }

  polygons.push(new Rect(0, 0, 50, 20, 50, 0, 20));
  // rects.push(new Rect(0, 0, 50, 20, 0, 0, 20));
  polygons.push(new Rect(100, 10, 50, 20, -5, 0, 20, 1, 0));
}

function draw() {
  background(220);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    for (let j = i + 1; j < balls.length; j++) {
      let res = collisionBall(balls[i], balls[j]);
      if (res.collision) {
        // print("hej");
        resolveCollision(balls[i], balls[j], res.normal);
      }
    }

    for (let j = 0; j < polygons.length; j++) {
      let res = collisionRectBall(polygons[j], balls[i]);
      if (res.collision) {
        resolveCollision(balls[i], polygons[j], res.normal);
      }
    }
    balls[i].wallCollision();
  }

  for (let i = 0; i < polygons.length; i++) {
    polygons[i].draw();
    polygons[i].update();
    for (let j = i + 1; j < polygons.length; j++) {
      let res = collisionRect(polygons[i], polygons[j]);
      if (res.collision) {
        resolveCollision(polygons[i], polygons[j], res.normal);
      }
    }
    polygons[i].wallCollision();
  }
}
