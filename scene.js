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
        this.allowCheckBoxChange = true;
        this.readingColorChangeVal = 100;

        this.settingsColor = [222, 222, 222];

    }

    update() {
        let collisions = [];
        let contactPointsList = [];

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
            this.polygons[i].wallCollision();
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
            this.balls[i].wallCollision();
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
        for (let i = 0; i < mouseBallContacts.length; i++) {
            let tempForce = mouseBall.pos.clone().subtract(mouseBallContacts[i].pos);
            mouseBallContacts[i].force(tempForce, "", 1);
            if (!mouseIsPressed) {
                mouseBallContacts = [];
                break;
            }
        }

        // for (let i = 0; i < contactPointsList.length; i++) {
        //     fill(255, 0, 0);
        //     square(width / 2 + contactPointsList[i].x, height / 2 - contactPointsList[i].y, 10);
        //     fill(255);
        // }
        this.currentScene();
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
        this.checkAndDrawForceModifiers();
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

            this.polygons.push(new Rect(0, -200, 200, 100, 0, 0, 10, 1, 0.1, 0, false));
            this.polygons.push(new Rect(-500, -200, 200, 100, 0, 0, 10, 0.1, Math.PI / 2, 0, false));
            // this.polygons.push(new Rect(-500, 20, 200, 100, 0, 0, 10, 0.1, Math.PI / 2, 0, false));
            // this.polygons.push(new Rect(0, -200, 200, 100, 0, 0, 10, 0.1, 0, 0, false));
            // this.polygons.push(new Rect(-110, 20, 200, 100, 0, 0, 10, 0.8, Math.PI / 2, 0, false));
            // this.polygons.push(new Rect(-100, 0, 200, 100, 0, 0, 10, 1, 0, 0, false));
            // this.polygons.push(new Triangle(300, 200, new Vec2(-60, -60), new Vec2(60, -60), new Vec2(0, 60), 0, 0, 20, 0.8));
            for (let i = 0; i < 10; i++) {
                this.balls.push(new Ball(random(-150, 150), random(-150, 150), 50, random(-10, 10), random(-10, 10), 10, 0.8));
            }
        }

        isWindOn = false;

        this.checkAndDrawForceModifiers();
        this.checkAndDrawSettings();
    }

    scenePlatform() {
        let groundHeight = 150;
        isWindOn = false;

        if (this.initializeScene) {
            this.initializeScene = false;

            this.polygons.push(new Rect(0, -height / 2 + groundHeight / 2, width, groundHeight, 0, 0, 20, 1, 0, 0, true, this.staticColor));
            this.polygons.push(new Rect(-450, 30, 555, 35, 0, 0, 20, 1, -0.436, 0, true, this.staticColor));

            this.balls.push(new Ball(0, 0, 100, 0, 0, 30, 0.8));
            this.polygons.push(new Rect(-200, 0, 70, 70, 0, 0, 20, 0.8));
        }

        this.checkAndDrawForceModifiers();
        this.checkAndDrawSettings();
    }

    clearScene() {
        this.balls = [];
        this.polygons = [];
    }

    // Checks if hovering and clicking on settings (home and info) is happening
    checkAndDrawSettings() {
        // Hovering over home:
        if (mouseX < this.homeSize / 2 + this.homePos.x 
            && mouseX > this.homePos.x - this.homeSize / 2 
            && mouseY < this.homeSize / 2 + this.homePos.y 
            && mouseY > this.homePos.y - this.homeSize / 2) {
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
                text("FROM ABOVE", width / 2, titleSpace);
                textSize(40);
                text("This scene is seen from above. For that reason there is no gravity.", width / 2, underTitleSpace);
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
        let tintBox = -20
        let gravityBoxPos = new Vec2(1600, 75);
        let frictionBoxPos = new Vec2(1600, 175);
        let windBoxPos = new Vec2(1600, 275);
        let normalBoxPos = new Vec2(1600, 375);
        let appliedBoxPos = new Vec2(1728, 375);
        let resultBoxPos = new Vec2(1856, 375);
        textSize(20);
        textFont(fonts.light);

        if(this.currentScene == this.sceneOppefra) {
            gravitySlider.hide();
            frictionSlider.show();
            windSlider.show();
        }
        else {
            // Big rect
            fill(this.settingsColor[0], this.settingsColor[1], this.settingsColor[2]);
            rect(width - 373/2, 445/2, 373, 445);
            gravitySlider.show();
            gravitySlider.position(1650, 65);
            frictionSlider.show();
            frictionSlider.position(1650, 165);
            windSlider.show();
            windSlider.position(1650, 265);


            // Gravity checkbox
            fill(0)
            text("GRAVITY", 1765, 50);
            if(mouseX > gravityBoxPos.x-25 && mouseX < gravityBoxPos.x + 25 && mouseY > gravityBoxPos.y-25 && mouseY < gravityBoxPos.y+25) {
                fill(gravityColor[0] + tintBox, gravityColor[1] + tintBox, gravityColor[2] + tintBox)
                if(mouseIsPressed && this.allowCheckBoxChange) {
                    this.allowCheckBoxChange = false;
                    if(!gravityCheckBox) {
                        gravityCheckBox = true;
                    }
                    else {
                        gravityCheckBox = false;
                    }
                }
            }
            else {
                fill(gravityColor[0], gravityColor[1], gravityColor[2]);
            }
            rect(gravityBoxPos.x, gravityBoxPos.y, 50, 50);
            if(gravityCheckBox) {
                image(images.check, gravityBoxPos.x, gravityBoxPos.y, 38, 38);
            }

            // Friction checkbox
            fill(0)
            text("FRICTION", 1765, 150);
            if(mouseX > frictionBoxPos.x-25 && mouseX < frictionBoxPos.x + 25 && mouseY > frictionBoxPos.y-25 && mouseY < frictionBoxPos.y+25) {
                fill(frictionColor[0] + tintBox, frictionColor[1] + tintBox, frictionColor[2] + tintBox);
                if(mouseIsPressed && this.allowCheckBoxChange) {
                    this.allowCheckBoxChange = false;
                    if(!frictionCheckBox) {
                        frictionCheckBox = true;
                    }
                    else {
                        frictionCheckBox = false;
                    }
                }
            }
            else {
                fill(frictionColor[0], frictionColor[1], frictionColor[2]);
            }
            rect(frictionBoxPos.x, frictionBoxPos.y, 50, 50);
            if(frictionCheckBox) {
                image(images.check, frictionBoxPos.x,frictionBoxPos.y, 38, 38);
            }

            // Wind checkbox
            fill(0)
            text("WIND", 1765, 250);
            if(mouseX > windBoxPos.x-25 && mouseX < windBoxPos.x + 25 && mouseY > windBoxPos.y-25 && mouseY < windBoxPos.y+25) {
                fill(windColor[0] + tintBox, windColor[1] + tintBox, windColor[2] + tintBox);
                if(mouseIsPressed && this.allowCheckBoxChange) {
                    this.allowCheckBoxChange = false;
                    if(!windCheckBox) {
                        windCheckBox = true;
                    }
                    else {
                        windCheckBox = false;
                    }
                }
            }
            else {
                fill(windColor[0], windColor[1], windColor[2]);
            }
            rect(windBoxPos.x, windBoxPos.y, 50, 50);
            if(windCheckBox) {
                image(images.check, windBoxPos.x,windBoxPos.y, 38, 38);
            }

            textSize(12)

            // normalforce checkbox
            fill(0)
            text("NORMAL FORCE", 1600, 330);
            if(mouseX > normalBoxPos.x-25 && mouseX < normalBoxPos.x + 25 && mouseY > normalBoxPos.y-25 && mouseY < normalBoxPos.y+25) {
                fill(normalColor[0] + tintBox, normalColor[1] + tintBox, normalColor[2] + tintBox);
                if(mouseIsPressed && this.allowCheckBoxChange) {
                    this.allowCheckBoxChange = false;
                    if(!normalCheckBox) {
                        normalCheckBox = true;
                    }
                    else {
                        normalCheckBox = false;
                    }
                }
            }
            else {
                fill(normalColor[0], normalColor[1], normalColor[2]);
            }
            rect(normalBoxPos.x, normalBoxPos.y, 50, 50);
            if(normalCheckBox) {
                image(images.check, normalBoxPos.x,normalBoxPos.y, 38, 38);
            }

            // appliedforce checkbox
            fill(0)
            text("APPLIED FORCE", 1728, 330);
            if(mouseX > appliedBoxPos.x-25 && mouseX < appliedBoxPos.x + 25 && mouseY > appliedBoxPos.y-25 && mouseY < appliedBoxPos.y+25) {
                fill(appliedColor[0] + tintBox, appliedColor[1] + tintBox, appliedColor[2] + tintBox);
                if(mouseIsPressed && this.allowCheckBoxChange) {
                    this.allowCheckBoxChange = false;
                    if(!appliedCheckBox) {
                        appliedCheckBox = true;
                    }
                    else {
                        appliedCheckBox = false;
                    }
                }
            }
            else {
                fill(appliedColor[0], appliedColor[1], appliedColor[2]);
            }
            rect(appliedBoxPos.x, appliedBoxPos.y, 50, 50);
            if(appliedCheckBox) {
                image(images.check, appliedBoxPos.x,appliedBoxPos.y, 38, 38);
            }

            // resultforce checkbox
            fill(0)
            text("RESULTANT FORCE", 1856, 330);
            if(mouseX > resultBoxPos.x-25 && mouseX < resultBoxPos.x + 25 && mouseY > resultBoxPos.y-25 && mouseY < resultBoxPos.y+25) {
                fill(resultColor[0] + tintBox, resultColor[1] + tintBox, resultColor[2] + tintBox);
                if(mouseIsPressed && this.allowCheckBoxChange) {
                    this.allowCheckBoxChange = false;
                    if(!resultCheckBox) {
                        resultCheckBox = true;
                    }
                    else {
                        resultCheckBox = false;
                    }
                }
            }
            else {
                fill(resultColor[0], resultColor[1], resultColor[2]);
            }
            rect(resultBoxPos.x, resultBoxPos.y, 50, 50);
            if(resultCheckBox) {
                image(images.check, resultBoxPos.x,resultBoxPos.y, 38, 38);
            }

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
    if (!scene.allowCheckBoxChange) {
        scene.allowCheckBoxChange = true;
    }
}
