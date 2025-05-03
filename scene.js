class Scene {
    constructor() {
        this.initializeScene = true;
        this.balls = [];
        this.polygons = [];
        this.currentScene = this.sceneDal;
        this.staticColor = [96, 88, 88];

        this.homeSize = 80;
        this.homePos = new Vec2(55, 55);
        this.infoSize = 80;
        this.infoPos = new Vec2(this.homePos.x + this.homeSize + 20, 55);
        this.tintHome = false;
        this.tintInfo = false;
        this.tintOppefra = false;
        this.tintPlatform = false;
        this.tintDal = false;
        this.tintValSettings = 150;
        this.tintValScenes = 220;
        this.reading = false;
        this.allowColorChange = false;
        this.readingColorChangeVal = 60;
        
    }

    update() {
        this.currentScene();
        let collisions = [];
        let contactPointsList = [];

        // UPDATING SHAPES
        // UPDATING SHAPES
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].draw();
            this.balls[i].update();
            for (let j = i + 1; j < this.balls.length; j++) {
                let res = collisionBall(this.balls[i], this.balls[j]);
                if (res.collision) {
                    let contacts = findContactPoints(this.balls[i], this.balls[j]);
                    collisions.push(new Manifold(this.balls[i], this.balls[j], res.normal, res.depth, contacts.contact1, contacts.contact2, contacts.contactCount));
                }
            }

            for (let j = 0; j < this.polygons.length; j++) {
                let res = collisionRectBall(this.polygons[j], this.balls[i]);
                if (res.collision) {
                    let contacts = findContactPoints(this.balls[i], this.polygons[j]);
                    collisions.push(new Manifold(this.balls[i], this.polygons[j], res.normal, res.depth, contacts.contact1, contacts.contact2, contacts.contactCount));
                }
            }
            this.balls[i].wallCollision();
        }

        for (let i = 0; i < this.polygons.length; i++) {
            this.polygons[i].draw();
            this.polygons[i].update();
            for (let j = i + 1; j < this.polygons.length; j++) {
                let res = collisionRect(this.polygons[i], this.polygons[j]);
                if (res.collision) {
                    let contacts = findContactPoints(this.polygons[i], this.polygons[j]);
                    collisions.push(new Manifold(this.polygons[j], this.polygons[i], res.normal, res.depth, contacts.contact1, contacts.contact2, contacts.contactCount));
                }
            }
            this.polygons[i].wallCollision();
        }

        for (let i = 0; i < collisions.length; i++) {
            resolveCollision(collisions[i]);

            // console.log(collisions[i]);
            if (collisions[i].contactCount > 0) {
                contactPointsList.push(collisions[i].contact1);
                if (collisions[i].contactCount > 1) {
                    contactPointsList.push(collisions[i].contact2);
                }
            }
        }

        for (let i = 0; i < contactPointsList.length; i++) {
            fill(255, 0, 0);
            square(width / 2 + contactPointsList[i].x, height / 2 - contactPointsList[i].y, 10);
            fill(255);
        }
    }

    sceneMenu() {
        if (this.initializeScene) {
            this.initializeScene = false;
        }

        let sceneSpace = 572;
        let textSpace = 170;
        let simTextPos = new Vec2(width / 2, height / 2 - 200);
        let firstScenePos = new Vec2(387.5, 666.5);
        let secondScenePos = new Vec2(firstScenePos.x + sceneSpace, firstScenePos.y);
        let thirdScenePos = new Vec2(firstScenePos.x + 2 * sceneSpace, firstScenePos.y);

        let scenesScale = [415, 233];

        textSize(100);
        textFont(fonts.regular);
        fill(this.staticColor);
        text("SIMULATION OF FORCES", simTextPos.x, simTextPos.y);

        textSize(50);
        text("Platform", firstScenePos.x, firstScenePos.y - textSpace);
        text("Valley", secondScenePos.x, secondScenePos.y - textSpace);
        text("From above", thirdScenePos.x, thirdScenePos.y - textSpace);

        if (this.tintPlatform) {
            tint(this.tintValScenes);
            image(images.platformScene, firstScenePos.x, firstScenePos.y, scenesScale[0], scenesScale[1]);
            this.tintPlatform = false;
        } else {
            tint(240);
            image(images.platformScene, firstScenePos.x, firstScenePos.y, scenesScale[0], scenesScale[1]);
        }
        if (this.tintDal) {
            tint(this.tintValScenes);
            image(images.dalScene, secondScenePos.x, secondScenePos.y, scenesScale[0], scenesScale[1]);
            this.tintDal = false;
        } else {
            tint(240);
            image(images.dalScene, secondScenePos.x, secondScenePos.y, scenesScale[0], scenesScale[1]);
        }
        if (this.tintOppefra) {
            fill(184);
            rect(thirdScenePos.x, thirdScenePos.y, scenesScale[0], scenesScale[1]);
            this.tintOppefra = false;
        } else {
            fill(204);
            rect(thirdScenePos.x, thirdScenePos.y, scenesScale[0], scenesScale[1]);
        }

        //Check if mouse is hovering over scene-choice
        if (
            mouseX < firstScenePos.x + scenesScale[0] / 2 &&
            mouseX > firstScenePos.x - scenesScale[0] / 2 &&
            mouseY < firstScenePos.y + scenesScale[1] / 2 &&
            mouseY > firstScenePos.y - scenesScale[1] / 2
        ) {
            this.tintPlatform = true;
            if (mouseIsPressed) {
                this.initializeScene = true;
                this.currentScene = this.scenePlatform;
                this.clearScene();
                return;
            }
        } else if (
            mouseX < secondScenePos.x + scenesScale[0] / 2 &&
            mouseX > secondScenePos.x - scenesScale[0] / 2 &&
            mouseY < secondScenePos.y + scenesScale[1] / 2 &&
            mouseY > secondScenePos.y - scenesScale[1] / 2
        ) {
            this.tintDal = true;
            if (mouseIsPressed) {
                this.initializeScene = true;
                this.currentScene = this.sceneDal;
                this.clearScene();
                return;
            }
        } else if (
            mouseX < thirdScenePos.x + scenesScale[0] / 2 &&
            mouseX > thirdScenePos.x - scenesScale[0] / 2 &&
            mouseY < thirdScenePos.y + scenesScale[1] / 2 &&
            mouseY > thirdScenePos.y - scenesScale[1] / 2
        ) {
            this.tintOppefra = true;
            if (mouseIsPressed) {
                this.initializeScene = true;
                this.currentScene = this.sceneOppefra;
                this.clearScene();
                return;
            } else {
                noTint();
            }
        }
    }

    sceneOppefra() {
        if (this.initializeScene) {
            this.initializeScene = false;
        }

        this.checkAndDrawSettings();
    }

    sceneDal() {
        if (this.initializeScene) {
            this.initializeScene = false;

            let dalGroundHeight = 170;
            let dalTriangleWidth = 500;
            let dalTriangleHeight = 200;
            this.polygons.push(new Rect(0, -height / 2 + dalGroundHeight / 2, width, dalGroundHeight, 0, 0, 20, 1, 0, 0, true, this.staticColor));

            this.polygons.push(
                new Triangle(
                    width / 2 - dalTriangleWidth / 2,
                    -height / 2 + dalGroundHeight,
                    new Vec2(dalTriangleWidth / 2, 0),
                    new Vec2(-dalTriangleWidth / 2, 0),
                    new Vec2(dalTriangleWidth / 2, dalTriangleHeight),
                    0,
                    0,
                    20,
                    1,
                    0,
                    0,
                    true,
                    this.staticColor
                )
            );
            this.polygons.push(
                new Triangle(
                    -width / 2 + dalTriangleWidth / 2,
                    -height / 2 + dalGroundHeight,
                    new Vec2(dalTriangleWidth / 2, 0),
                    new Vec2(-dalTriangleWidth / 2, 0),
                    new Vec2(-dalTriangleWidth / 2, dalTriangleHeight),
                    0,
                    0,
                    20,
                    1,
                    0,
                    0,
                    true,
                    this.staticColor
                )
            );

            for (let i = 0; i < 10; i++) {
                this.balls.push(new Ball(random(-150, 150), random(-150, 150), 50, random(-150, 150), random(-50, 50), 10, 1));
            }
        }

        this.checkAndDrawSettings();
    }

    scenePlatform() {
        let groundHeight = 150;

        if (this.initializeScene) {
            this.initializeScene = false;

            this.polygons.push(new Rect(0, -height / 2 + groundHeight / 2, width, groundHeight, 0, 0, 20, 1, 0, 0, true, this.staticColor));
            this.polygons.push(new Rect(-450, 30, 555, 35, 0, 0, 20, 1, -25, 0, true, this.staticColor));

            for (let i = 0; i < 10; i++) {
                this.balls.push(new Ball(random(-150, 150), random(-150, 150), 50, random(-150, 150), random(-50, 50), 10, 1));
            }
        }

        this.checkAndDrawSettings();
    }

    clearScene() {
        this.balls = [];
        this.polygons = [];
    }

    // Checks if hovering and clicking on settings (home and info) is happening
    checkAndDrawSettings() {
        //Hovering over home:
        if (mouseX < this.homeSize / 2 + this.homePos.x && mouseX > this.homePos.x - this.homeSize / 2 && mouseY < this.homeSize / 2 + this.homePos.y && mouseY > this.homePos.y - this.homeSize / 2) {
            this.tintHome = true;
            if (mouseIsPressed && !this.reading) {
                this.initializeScene = true;
                this.currentScene = this.sceneMenu;
                this.clearScene();
                return;
            }
            // hovering over questionmark:
        } else if (
            mouseX < this.infoSize / 2 + this.infoPos.x &&
            mouseX > this.infoPos.x - this.infoSize / 2 &&
            mouseY < this.infoSize / 2 + this.infoPos.y &&
            mouseY > this.infoPos.y - this.infoSize / 2
        ) {
            this.tintInfo = true;
            if (mouseIsPressed && !this.reading){
                this.reading = true;
                this.changeColorOnAll([-this.readingColorChangeVal, -this.readingColorChangeVal, -this.readingColorChangeVal]);
            }
        }

        if (mouseIsPressed && this.allowColorChange) {
            this.reading = false;
            this.allowColorChange = false;
            this.changeColorOnAll([this.readingColorChangeVal, this.readingColorChangeVal, this.readingColorChangeVal]);
        }

        if (this.tintHome) {
            tint(this.tintValSettings);
            image(images.home, this.homePos.x, this.homePos.y, this.homeSize, this.homeSize);
            this.tintHome = false;
            noTint();
        } else {
            image(images.home, this.homePos.x, this.homePos.y, this.homeSize, this.homeSize);
        }
        if (this.tintInfo) {
            tint(this.tintValSettings);
            image(images.info, this.infoPos.x, this.infoPos.y, this.infoSize, this.infoSize);
            this.tintInfo = false;
            noTint();
        } else {
            image(images.info, this.infoPos.x, this.infoPos.y, this.infoSize, this.infoSize);
        }
    }

    changeColorOnAll(col) {
        backgroundColor[0] += col[0];
        backgroundColor[1] += col[1];
        backgroundColor[2] += col[2];
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].changeColor([this.balls[i].color[0] + col[0], this.balls[i].color[1] + col[1], this.balls[i].color[2] + col[2]]);
        }
        for (let i = 0; i < this.polygons.length; i++) {
            this.polygons[i].changeColor([this.polygons[i].color[0] + col[0], this.polygons[i].color[1] + col[1], this.polygons[i].color[2] + col[2]]);
        }
    }

}

function mouseReleased() {
    if(scene.reading) {
        scene.allowColorChange = true;
    }
}
