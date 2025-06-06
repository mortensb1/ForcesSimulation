class Scene {
    constructor() {
        this.initializeScene = true;
        this.balls = [];
        this.polygons = [];
        this.currentScene = this.sceneMenu;
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
        this.allowCheckBoxChange = true;
        this.readingColorChangeVal = 100;

        this.settingsColor = [222, 222, 222];
    }

    update() {
        let collisions = [];
        let contactPointsList = [];

        this.currentScene();

        // UPDATING SHAPES
        // UPDATING SHAPES
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
        }

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
        }

        for (let i = 0; i < collisions.length; i++) {
            resolveCollision(collisions[i]);

            if (collisions[i].contactCount > 0) {
                contactPointsList.push(collisions[i].contact1);
                if (collisions[i].contactCount > 1) {
                    contactPointsList.push(collisions[i].contact2);
                }
            }
        }

        mouseBall.pos.x = mouseX - width / 2;
        mouseBall.pos.y = height / 2 - mouseY;
        mouseBall.draw();
        for (let i = 0; i < this.balls.length; i++) {
            let res = collisionBallNoCorr(mouseBall, this.balls[i]);
            if (res.collision) {
                if (mouseIsPressed) {
                    mouseBallContacts.push(this.balls[i]);
                }
            }
        }
        for (let i = 0; i < this.polygons.length; i++) {
            let res = collisionRectBallNoCorr(this.polygons[i], mouseBall);
            if (res.collision) {
                if (mouseIsPressed) {
                    mouseBallContacts.push(this.polygons[i]);
                }
            }
        }
        for (let i = 0; i < mouseBallContacts.length; i++) {
            let distance = mouseBall.pos.clone().subtract(mouseBallContacts[0].pos);
            let relativeVel = mouseBallContacts[0].vel;
            mouseBallContacts[0].mouseHold = true;

            let totalForce = distance.add(relativeVel.clone().scale(-0.05));

            mouseBallContacts[i].force(totalForce, "Applied", 1);
            if (!mouseIsPressed) {
                mouseBallContacts[0].mouseHold = false;
                mouseBallContacts = [];
                break;
            }
        }

        if (this.currentScene != this.sceneMenu) {
            this.checkAndDrawSettings();
        }

        // for (let i = 0; i < contactPointsList.length; i++) {
        //     fill(255, 0, 0);
        //     square(width / 2 + contactPointsList[i].x, height / 2 - contactPointsList[i].y, 10);
        //     fill(255);
        // }
    }

    sceneMenu() {
        if (this.initializeScene) {
            this.initializeScene = false;
            gravitySlider.hide();
            frictionSlider.hide();
            windSlider.hide();
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
        text("No gravity", thirdScenePos.x, thirdScenePos.y - textSpace);

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
            G = new Vec2(0, 0);

            this.balls.push(new Ball(100, 500, 80, 0, 0, 20, 0.8));
            this.balls.push(new Ball(0, 0, 50, 0, 0, 20, 0.8));
            this.balls.push(new Ball(-150, -100, 100, 0, 0, 20, 0.8));
            this.balls.push(new Ball(-400, 10, 100, 0, 0, 20, 0.8));
            this.polygons.push(new Rect(300,-200, 120, 120, 0, 0, 20, 0.8, 0, 0, false));
            this.polygons.push(new Rect(300, 200, 200, 200, 0, 0, 20, 0.8, 0, 0, false));

            //Edges
            this.polygons.push(new Rect(-width / 2 - width / 10, 0, width / 5, height, 0, 0, 1, 0.8, 0, 0, true, this.staticColor));
            this.polygons.push(new Rect(width / 2 + width / 10, 0, width / 5, height, 0, 0, 1, 0.8, 0, 0, true, this.staticColor));
            this.polygons.push(new Rect(0, -height / 2 - height / 10, width - 20, height / 5, 0, 0, 1, 0.8, 0, 0, true, this.staticColor));
            this.polygons.push(new Rect(0, height / 2 + height / 10, width - 20, height / 5, 0, 0, 1, 0.8, 0, 0, true, this.staticColor));
        }
        this.checkAndDrawForceModifiers();
    }

    sceneDal() {
        if (this.initializeScene) {
            this.initializeScene = false;

            //Edges
            this.polygons.push(new Rect(-width / 2 - width / 10, 0, width / 5, height, 0, 0, 1, 0.8, 0, 0, true, this.staticColor));
            this.polygons.push(new Rect(width / 2 + width / 10, 0, width / 5, height, 0, 0, 1, 0.8, 0, 0, true, this.staticColor));
            this.polygons.push(new Rect(0, height / 2 + height / 10, width - 20, height / 5, 0, 0, 1, 0.8, 0, 0, true, this.staticColor));

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

            this.polygons.push(new Rect(0, -200, 300, 200, 0, 0, 10, 1, 0.1, 0, false));
            this.polygons.push(new Rect(-500, -200, 200, 200, 0, 0, 10, 0.1, Math.PI / 2, 0, false));
            for (let i = 0; i < 3; i++) {
                this.balls.push(new Ball(random(-150, 150), random(-150, 150), 100, random(-10, 10), random(-10, 10), 10, 0.8));
            }
        }

        this.checkAndDrawForceModifiers();
    }

    scenePlatform() {
        let groundHeight = 200;

        if (this.initializeScene) {
            this.initializeScene = false;

            //Edges
            this.polygons.push(new Rect(-width / 2 - width / 10, 0, width / 5, height, 0, 0, 1, 0.8, 0, 0, true, this.staticColor));
            this.polygons.push(new Rect(width / 2 + width / 10, 0, width / 5, height, 0, 0, 1, 0.8, 0, 0, true, this.staticColor));
            this.polygons.push(new Rect(0, height / 2 + height / 10, width - 20, height / 5, 0, 0, 1, 0.8, 0, 0, true, this.staticColor));

            this.polygons.push(new Rect(0, -height / 2 + groundHeight / 2, width, groundHeight, 0, 0, 20, 1, 0, 0, true, this.staticColor));
            this.polygons.push(new Rect(-450, 30, 555, 35, 0, 0, 20, 1, -0.436, 0, true, this.staticColor));

            this.balls.push(new Ball(0, 0, 100, 0, 0, 10, 0.8));
            this.polygons.push(new Rect(-200, 0, 200, 200, 0, 0, 20, 0.8));
            this.polygons.push(new Rect(-600, 0, 250, 150, 0, 0, 10, 0.8));
        }

        this.checkAndDrawForceModifiers();
    }

    clearScene() {
        this.balls = [];
        this.polygons = [];
    }

    // Checks if hovering and clicking on settings (home and info) is happening
    checkAndDrawSettings() {
        // Hovering over home:
        if (mouseX < this.homeSize / 2 + this.homePos.x && mouseX > this.homePos.x - this.homeSize / 2 && mouseY < this.homeSize / 2 + this.homePos.y && mouseY > this.homePos.y - this.homeSize / 2) {
            this.tintHome = true;
            // If home is pressed go home
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
            // If questionmark is pressed, change color on everything and show text info
            if (mouseIsPressed && !this.reading) {
                this.reading = true;
                this.changeColorOnAll([-this.readingColorChangeVal, -this.readingColorChangeVal, -this.readingColorChangeVal]);
            }
        }

        // Gives information when the questionmark is pressed
        if (this.reading) {
            let titleSpace = height / 2 - 350;
            let underTitleSpace = titleSpace + 100;
            let textSpace = 70;
            fill(255);
            textSize(100);
            textFont(fonts.regular);
            if (this.currentScene == this.sceneDal) {
                text("VALLEY", width / 2, titleSpace);
                textSize(40);
                text("This scene contaions two slopes and is seen from a normal perspective.", width / 2, underTitleSpace);
            } else if (this.currentScene == this.sceneOppefra) {
                text("NO GRAVITY", width / 2, titleSpace);
                textSize(40);
                text("In this scene there is no gravity.", width / 2, underTitleSpace);
            } else if (this.currentScene == this.scenePlatform) {
                text("PLATFORM", width / 2, titleSpace);
                textSize(40);
                text("This scene contains a platform with a slope.", width / 2, underTitleSpace);
            }
            text("- The colors of the arrows, checkboxes and sliders indicate the force they belong to.", width / 2, underTitleSpace + 100);
            text("- The arrows on the objects symbolizes the direction and magnitude of the force.", width / 2, underTitleSpace + 100 + textSpace);
            text("No arrow of that force means none of that force is acting on the object.", width / 2, underTitleSpace + 140 + textSpace);
            text("- Checkboxes turn off and on the arrows, but the forces will remain.", width / 2, underTitleSpace + 140 + 2 * textSpace);
            text("- Sliders can be used to modify the magnitude of the forces.", width / 2, underTitleSpace + 140 + 3 * textSpace);
            text("- Grab an object with the mouse and see how it affects other objects.", width / 2, underTitleSpace + 140 + 4 * textSpace);
            text("PRESS ANYWHERE TO CONTINUE", width / 2, underTitleSpace + 140 + 5 * textSpace);
        }

        // If info is showing and mouse has been relesed once, the colors are allowed to change
        if (mouseIsPressed && this.allowColorChange) {
            this.reading = false;
            this.allowColorChange = false;
            this.changeColorOnAll([this.readingColorChangeVal, this.readingColorChangeVal, this.readingColorChangeVal]);
        }

        fill(this.settingsColor[0], this.settingsColor[1], this.settingsColor[2]);
        rect(0, 0, 400, 230);

        // Tinting the images
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

    checkAndDrawForceModifiers() {
        textSize(20);
        textFont(fonts.light);

        if (this.currentScene == this.sceneOppefra) {
            //Big rect
            fill(this.settingsColor[0], this.settingsColor[1], this.settingsColor[2]);
            rect(width - 373 / 2, 339 / 2, 373, 339);

            // Sliders
            gravitySlider.hide();
            frictionSlider.show();
            frictionSlider.position(1650, 65);
            windSlider.show();
            windSlider.position(1650, 165);
            windStrength.x = windSlider.value();

            staticFriction = frictionSlider.value() + 0.1;
            dynamicFriction = frictionSlider.value() - 0.1;
            if (frictionSlider.value() < 0.1) {
                staticFriction = 0;
                dynamicFriction = 0;
            } else if (frictionSlider.value() > 0.9) {
                staticFriction = 1;
                dynamicFriction = 1;
            }

            // Friction check box
            fill(0);
            text("FRICTION", 1765, 50);
            frictionBox.pos = new Vec2(1600, 75);
            frictionBox.update();

            // Wind checkbox
            fill(0);
            text("WIND", 1765, 150);
            windBox.pos = new Vec2(1600, 175);
            windBox.update();

            textSize(15);

            // Applied checkbox
            fill(0);
            text("APPLIED FORCE", 1660, 230);
            appliedBox.pos = new Vec2(1660, 275);
            appliedBox.update();

            // Result checkbox
            fill(0);
            text("RESULTANT FORCE", 1810, 230);
            resultBox.pos = new Vec2(1810, 275);
            resultBox.update();
        } else {
            // Big rect
            fill(this.settingsColor[0], this.settingsColor[1], this.settingsColor[2]);
            rect(width - 373 / 2, 445 / 2, 373, 445);

            // Sliders
            gravitySlider.show();
            gravitySlider.position(1650, 65);
            frictionSlider.show();
            frictionSlider.position(1650, 165);
            windSlider.show();
            windSlider.position(1650, 265);
            G.y = gravitySlider.value() * -1;
            windStrength.x = windSlider.value();

            staticFriction = frictionSlider.value() + 0.1;
            dynamicFriction = frictionSlider.value() - 0.1;
            if (frictionSlider.value() < 0.1) {
                staticFriction = 0;
                dynamicFriction = 0;
            } else if (frictionSlider.value() > 0.9) {
                staticFriction = 1;
                dynamicFriction = 1;
            }

            // Gravity checkbox
            fill(0);
            text("GRAVITY", 1765, 50);
            gravityBox.pos = new Vec2(1600, 75);
            gravityBox.update();

            // Friction checkbox
            fill(0);
            text("FRICTION", 1765, 150);
            frictionBox.pos = new Vec2(1600, 175);
            frictionBox.update();

            // Wind checkbox
            fill(0);
            text("WIND", 1765, 250);
            windBox.pos = new Vec2(1600, 275);
            windBox.update();

            textSize(15);

            // // normalforce checkbox
            // fill(0);
            // text("NORMAL FORCE", 1600, 330);
            // normalBox.pos = new Vec2(1600, 375);
            // normalBox.update();

            // appliedforce checkbox
            fill(0);
            text("APPLIED FORCE", 1728-60, 330);
            appliedBox.pos = new Vec2(1728-60, 375);
            appliedBox.update();

            // resultforce checkbox
            fill(0);
            text("RESULTANT FORCE", 1856-40, 330);
            resultBox.pos = new Vec2(1856-40, 375);
            resultBox.update();
        }
    }

    changeColorOnAll(col) {
        for (let i = 0; i < 3; i++) {
            backgroundColor[i] += col[i];
            this.settingsColor[i] += col[i];
            gravityColor[i] += col[i];
            frictionColor[i] += col[i];
            windColor[i] += col[i];
            normalColor[i] += col[i];
            appliedColor[i] += col[i];
            resultColor[i] += col[i];

            gravityBox.color[i] += col[i];
            frictionBox.color[i] += col[i];
            windBox.color[i] += col[i];
            appliedBox.color[i] += col[i];
            resultBox.color[i] += col[i];
        }
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].changeColor([this.balls[i].color[0] + col[0], this.balls[i].color[1] + col[1], this.balls[i].color[2] + col[2]]);
        }
        for (let i = 0; i < this.polygons.length; i++) {
            this.polygons[i].changeColor([this.polygons[i].color[0] + col[0], this.polygons[i].color[1] + col[1], this.polygons[i].color[2] + col[2]]);
        }
    }
}

function mouseReleased() {
    if (scene.reading) {
        scene.allowColorChange = true;
    }
    if (!allowCheckBoxChange) {
        allowCheckBoxChange = true;
    }
}
