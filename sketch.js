let x = 200;
let y = 200;
let velx = 2;
let vely = 2;
const fps = 60;
let G;
let balls = [];
let rects = [];

function setup() {
  rectMode(CENTER);
  angleMode(DEGREES);
  G = new Vec2(0, -9.82);
  // G = new Vec2(0, 0);

  createCanvas(400, 400);
  frameRate(fps);
  // balls.push(new Ball(-150, 0, 10, 0, 0, 10));
  // balls.push(new Ball(-150, 30, 10, 0, 0, 20));

  for (i = 0; i < 10; i++) {
    balls.push(new Ball(random(-150, 150), random(-150, 150), 10, random(-150, 150), random(0, 4), 10, 1));
  }

  rects.push(new Rect(0, 0, 50, 20, 50, 0, 20));
  // rects.push(new Rect(0, 0, 50, 20, 0, 0, 20));
  rects.push(new Rect(100, 10, 50, 20, -5, 0, 20, 1, 0));
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

    for (let j = 0; j < rects.length; j++) {
      let res = collisionRectBall(rects[j], balls[i]);
      if (res.collision) {
        resolveCollision(balls[i], rects[j], res.normal);
      }
    }
    balls[i].wallCollision();
  }

  for (let i = 0; i < rects.length; i++) {
    rects[i].draw();
    rects[i].update();
    for (let j = i + 1; j < rects.length; j++) {
      let res = collisionRect(rects[i], rects[j]);
      if (res.collision) {
        resolveCollision(rects[i], rects[j], res.normal);
      }
    }
    rects[i].wallCollision();
  }

  // rects[1].rotate(1);
}
