let x = 200;
let y = 200;
let velx = 2;
let vely = 2;
const fps = 120;
let G;
let balls = [];
let polygons = [];
let images = {};
let fonts = {};
let backgroundColor = [217, 217, 217];
let mouseBall;
let mouseBallContacts = [];

// 100 pixels equals to 1 meter

function preload() {
    images.home = loadImage("Images/Home.png");
    images.info = loadImage("Images/QuestionMark.png");
    images.platformScene = loadImage("Images/Platform.png");
    images.dalScene = loadImage("Images/Dal.png");
    images.check = loadImage("Images/Check.svg");
    fonts.regular = loadFont("Fonts/QuicksandRegular.ttf");
    fonts.light = loadFont("Fonts/QuicksandLight.ttf");
}

function setup() {
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    imageMode(CENTER);
    createCanvas(1920, 1080);
    frameRate(fps);
    stroke(0, 0);
    G = new Vec2(0, -982);
    windStrength = new Vec2(10, 0);
    airDensity = 1.3;
    mouseBall = new Ball(mouseX, mouseX, 10, 0, 0, 10, 0, [0, 0, 0], true);

    gravityColor = [218, 193, 193];
    frictionColor = [204, 210, 200];
    windColor = [193, 200, 218];
    normalColor = [232, 231, 208];
    appliedColor = [218, 206, 219];
    resultColor = [102, 102, 102];

    gravityCheckBox = false;
    frictionCheckBox = false;
    windCheckBox = false;
    normalCheckBox = false;
    appliedCheckBox = false;
    resultCheckBox = false;

    gravitySlider = createSlider(0, 2000, 982, 100);
    gravitySlider.size(230);
    frictionSlider = createSlider(0, 1, 0.5, 0.05);
    frictionSlider.size(230);
    windSlider = createSlider(0, 400, 0, 10);
    windSlider.size(230);

    scene = new Scene();
}

function draw() {
    background(backgroundColor);
    scene.update();
}
