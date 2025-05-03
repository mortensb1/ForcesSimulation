let x = 200;
let y = 200;
let velx = 2;
let vely = 2;
const fps = 60;
let G;
let balls = [];
let polygons = [];
let images = {};
let fonts = {};

function preload() {
    images.home = loadImage("Images/Home.png");
    fonts.regular = loadFont("Fonts/QuicksandRegular.ttf");
}

function setup() {
    rectMode(CENTER);
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);
    createCanvas(1920, 1080);
    frameRate(fps);
    noStroke();
    G = new Vec2(0, -9.82);
    //G = new Vec2(0, 0);

    scene = new Scene();
}

function draw() {
    background(217);
    scene.update();
}
