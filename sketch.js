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
  // balls.push(new Ball(-60, 0, 10, 0, 0));
  // balls.push(new Ball(300,200,10,2,5))

  // for (i = 0; i < 10; i++) {
  //   balls.push(new Ball(random(-150, 150), random(-150, 150), 10, random(-150, 150), random(0, 4), 10, 0.5));
  // }

  rects.push(new Rect(0, 0, 50, 20, 50, 0, 20));
  // rects.push(new Rect(0, 0, 50, 20, 0, 0, 20));
  rects.push(new Rect(100, 20, 50, 20, -1, 0, 20, 1, -30));

  // collisionRectBall(rects[0], balls[0]);

  // collision(rects[0], rects[1]);

  // print(rects[1].corners);
}

function draw() {
  background(220);
  for (ball of balls) {
    ball.draw();
    ball.update();
    for (let i = 0; i < rects.length; i++) {
      let res = collisionRectBall(rects[i], ball);
      if (res.collision) {
        rects[i].pos.add(res.normal, res.depth / 2);
        ball.pos.add(res.normal, -res.depth / 2);
      }
    }
    ball.wallCollision();
  }

  for (let i = 0; i < rects.length; i++) {
    rects[i].draw();
    rects[i].update();
    rects[i].wallCollision();
    for (let j = i + 1; j < rects.length; j++) {
      let res = collisionRect(rects[i], rects[j]);
      if (res.collision) {
        // rects[i].pos.add(res.normal, res.depth / 2);
        // rects[j].pos.add(res.normal, -res.depth / 2);
      }
    }
  }

  // rects[1].rotate(1);
}
