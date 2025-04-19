let x = 200;
let y = 200;
let velx = 2;
let vely = 2;
const fps = 60;
let G;
let balls = [];

/** @type {Ball} */
let bal;

function setup() {
  rectMode(CENTER);
  angleMode(DEGREES);
  G = new Vec2(0, 9.82);

  createCanvas(400, 400);
  frameRate(fps);
  // balls.push(new Ball(200,200,10,2,5))
  // balls.push(new Ball(300,200,10,2,5))

  for (i = 0; i < 10; i++) {
    balls.push(new Ball(random(20, 300), random(20, 300), 10, random(-50, 50), random(0, 4), 10, 1));
  }

  objRect = new Rect(200, 200, 50, 20, 10, 0, 20);
  // bal = new Ball(260, 100, 10, 1, 10, 10);
}

function draw() {
  background(220);

  // bal.draw();
  // bal.update();
  // bal.wallCollision();

  for (ball of balls) {
    ball.draw();
    ball.update();
    ball.wallCollision();
  }

  objRect.draw();
  objRect.update();
  // objRect.rot += 1;
  objRect.wallCollision();

  // colRectCir(objRect, bal);
}
