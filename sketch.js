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
  // balls.push(new Ball(200,200,10,2,5))
  // balls.push(new Ball(300,200,10,2,5))

  // for (i = 0; i < 10; i++) {
  //   balls.push(new Ball(random(-150, 150), random(-150, 150), 10, random(-150, 150), random(0, 4), 10, 0.5));
  // }

  rects.push(new Rect(0, 0, 50, 20, 20, 0, 20));
  // rects.push(new Rect(0, 0, 50, 20, 0, 0, 20));
  rects.push(new Rect(80, 10, 50, 20, 0, 0, 20, 1, 30));

  collision(rects[0], rects[1]);

  print(rects[1].corners);
}

function draw() {
  background(220);

  for (ball of balls) {
    ball.draw();
    ball.update();
    ball.wallCollision();
  }

  for (let i = 0; i < rects.length; i++) {
    rects[i].draw();
    rects[i].update();
    rects[i].wallCollision();
  }

  // rects[1].rotate(1);

  for (let i = 0; i < rects[1].normals.length; i++) {
    line(rects[1].pos.x + width / 2, height / 2 - rects[1].pos.y, rects[1].pos.x + rects[1].normals[i].x + width / 2, height / 2 - (rects[1].pos.y + rects[1].normals[i].y));
  }

  for (let i = 0; i < rects[1].normals.length; i++) {
    line(rects[0].pos.x + width / 2, height / 2 - rects[0].pos.y, rects[0].pos.x + rects[0].normals[i].x + width / 2, height / 2 - (rects[0].pos.y + rects[0].normals[i].y));
  }

  // collision(rects[0], rects[1]);
  // for (let point in rects[0].corners) {
  //   print(rects[1].corners[point]);
  // }
  // print(rects[0].pos);

  // for (let point in rects[1].corners) {
  //   circle(rects[1].corners[point].x + width / 2, height / 2 - rects[1].corners[point].y, 10);
  // }

  console.log(collision(rects[0], rects[1]));
  // print(collision(rects[0], rects[1]));

  // print(rects[0].corners.tl.x);

  // circle(60 + width / 2, height / 2 - 35, 10);

  // colRectCir(objRect, bal);
}
