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
let backgroundColor = [217, 217, 217];

function preload() {
    images.home = loadImage("Images/Home.png");
    images.info = loadImage("Images/QuestionMark.png");
    images.platformScene = loadImage("Images/Platform.png");
    images.dalScene = loadImage("Images/Dal.png");
    fonts.regular = loadFont("Fonts/QuicksandRegular.ttf");
}

function setup() {
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    imageMode(CENTER);
    createCanvas(1920, 1080);
    frameRate(fps);
    noStroke();
    G = new Vec2(0, -9.82);
    //G = new Vec2(0, 0);

    scene = new Scene();
}

function draw() {
    background(backgroundColor);
    scene.update();
}
