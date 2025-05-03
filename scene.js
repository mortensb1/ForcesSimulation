class Scene {
    constructor() {
        this.initializeScene = true;
        this.balls = [];
        this.polygons = [];
        this.currentScene = this.sceneDal;
        this.staticColor = [96, 88, 88];

        this.homeSize = 80;
        this.homePos = new Vec2(15, 15);
    }

    update() {
        this.currentScene();
        let collisions = [];
        let contactPointsList = [];

        if (this.currentScene == this.sceneDal) {
            if (mouseX < this.homeSize + this.homePos.x && mouseX > this.homePos.x && mouseY < this.homeSize + this.homePos.y && mouseY > this.homePos.y) {
                tint(150);
                if (mouseIsPressed) {
                    this.currentScene = this.sceneMenu;
                    this.clearScene();
                    return;
                }
            } else {
                tint(255);
            }
        }

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
                    collisions.push(new Manifold(this.polygons[j], this.polygons[i], res.normal, res.depth, new Vec2(), new Vec2()));
                }
            }
            this.polygons[i].wallCollision();
        }

        for (let i = 0; i < collisions.length; i++) {
            resolveCollision(collisions[i]);

            if (collisions[i].contactCount > 0) {
                contactPointsList.push(collisions[i].contact1);
                if (collisions[i].contactCount > 1) {
                    contactPointsList.push(collisions.contact2);
                }
            }
        }

        for (let i = 0; i < contactPointsList.length; i++) {
            fill(255, 0, 0);
            square(width / 2 + contactPointsList[i].x, height / 2 - contactPointsList[i].y, 20);
            fill(255);
        }
    }

    sceneMenu() {
        if (this.initializeScene) {
            this.initializeScene = false;
        }

        textSize(100);
        textFont(fonts.regular);
        text("SIMULATION OF FORCES", width / 2, height / 2 - 200);
    }

    sceneOppefra() {
        if (this.initializeScene) {
            this.initializeScene = false;
        }
    }

    sceneDal() {
        if (this.initializeScene) {
            let dalGroundHeight = 170;
            let dalTriangleWidth = 500;
            let dalTriangleHeight = 200;
            this.polygons.push(new Rect(0, -height / 2 + dalGroundHeight / 2, width, dalGroundHeight, 0, 0, 20, 1, 0, 0, true, this.staticColor));

            this.polygons.push(new Triangle(width / 2 - dalTriangleWidth / 2, -height / 2 + dalGroundHeight, new Vec2(dalTriangleWidth / 2, 0), new Vec2(-dalTriangleWidth / 2, 0), new Vec2(dalTriangleWidth / 2, dalTriangleHeight), 0, 0, 20, 1, 0, 0, true, this.staticColor));
            this.polygons.push(new Triangle(-width / 2 + dalTriangleWidth / 2, -height / 2 + dalGroundHeight, new Vec2(dalTriangleWidth / 2, 0), new Vec2(-dalTriangleWidth / 2, 0), new Vec2(-dalTriangleWidth / 2, dalTriangleHeight), 0, 0, 20, 1, 0, 0, true, this.staticColor));

            for (let i = 0; i < 10; i++) {
                this.balls.push(new Ball(random(-150, 150), random(-150, 150), 50, random(-150, 150), random(-50, 50), 10, 1));
            }
            this.initializeScene = false;
        }

        image(images.home, this.homePos.x, this.homePos.y, this.homeSize, this.homeSize);
    }

    scenePlatform() {
        if (this.initializeScene) {
            this.initializeScene = false;
        }
    }

    clearScene() {
        this.balls = [];
        this.polygons = [];
    }
}
