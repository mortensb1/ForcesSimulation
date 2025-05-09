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
let staticFriction = 0.6;
let dynamicFriction = 0.4;

let mouseTable;
let lastTime = 0;
let id = 0;

// 100 pixels equals to 1 meter

function preload() {
    mouseTable = new p5.Table();
    mouseTable.addColumn("id");
    mouseTable.addColumn("time");
    mouseTable.addColumn("x");
    mouseTable.addColumn("y");

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
    windStrength = new Vec2(0, 0);
    airDensity = 1.3;
    mouseBall = new Ball(mouseX, mouseX, 10, 0, 0, 10, 0, [0, 0, 0], true);

    gravityColor = [201, 0, 0];
    frictionColor = [235, 97, 5];
    windColor = [240, 172, 2];
    normalColor = [0, 191, 51];
    appliedColor = [3, 132, 252];
    resultColor = [0, 191, 51];

    allowCheckBoxChange = true;
    gravityBox = new Checkbox(new Vec2(), [gravityColor[0], gravityColor[1], gravityColor[2]]);
    frictionBox = new Checkbox(new Vec2(), [frictionColor[0], frictionColor[1], frictionColor[2]]);
    windBox = new Checkbox(new Vec2(), [windColor[0], windColor[1], windColor[2]]);
    appliedBox = new Checkbox(new Vec2(), [appliedColor[0], appliedColor[1], appliedColor[2]]);
    normalBox = new Checkbox(new Vec2(), [normalColor[0], normalColor[1], normalColor[2]]);
    resultBox = new Checkbox(new Vec2(), [resultColor[0], resultColor[1], resultColor[2]]);

    gravitySlider = createSlider(0, 2000, 982, 100);
    gravitySlider.size(230);
    gravitySlider.addClass("gravSlider");
    frictionSlider = createSlider(0, 1, 0.5, 0.1);
    frictionSlider.size(230);
    frictionSlider.addClass("fricSlider");
    windSlider = createSlider(-10000, 10000, 0, 1000);
    windSlider.size(230);
    windSlider.addClass("windSlider");

    scene = new Scene();
}

function draw() {
    if (lastTime + 10 < millis()) {
        lastTime = millis();
        let newRow = mouseTable.addRow();
        newRow.setNum("id", id++);
        newRow.setNum("time", millis());
        newRow.setNum("x", mouseX);
        newRow.setNum("y", mouseY);
    }

    background(backgroundColor);
    scene.update();
}

function keyPressed() {
    if (keyCode === ENTER) {
        console.log("Saved");
        saveTable(mouseTable, "Maling.csv");
    }
    if (key == "s") {
        saveCanvas("Background.png");
    }
}
