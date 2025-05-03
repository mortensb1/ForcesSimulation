class Scene {
    constructor() {
        this.initializeScene = true;
        this.balls = [];
        this.polygons = [];
        this.currentScene = this.sceneDal;
        this.staticColor = [96, 88, 88];
    }

    update() {
        this.currentScene();


        // UPDATING SHAPES
        // UPDATING SHAPES
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].draw();
            this.balls[i].update();
            for (let j = i + 1; j < this.balls.length; j++) {
              let res = collisionBall(this.balls[i], this.balls[j]);
              if (res.collision) {
                resolveCollision(this.balls[i], this.balls[j], res.normal);
              }
            }
        
            for (let j = 0; j < this.polygons.length; j++) {
              let res = collisionRectBall(this.polygons[j], this.balls[i]);
              if (res.collision) {
                resolveCollision(this.balls[i], this.polygons[j], res.normal);
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
                resolveCollision(this.polygons[j], this.polygons[i], res.normal);
              }
            }
            this.polygons[i].wallCollision();
          }
    }

    sceneMenu() {
        if (this.initializeScene){
            this.initializeScene = false;
        }
    }

    sceneOppefra() {
        if (this.initializeScene){
            this.initializeScene = false;
        }

    }

    sceneDal() {
        if (this.initializeScene){
            let dalGroundHeight = 150;
            let dalTriangleWidth = 500;
            let dalTriangleHeight = 200;
            this.polygons.push(new Rect(0, -height/2 + dalGroundHeight/2, width, dalGroundHeight, 0, 0, 20, 1, 0, 0, true, this.staticColor));

            //this.polygons.push(new Triangle(width - dalTriangleWidth*, dalGroundHeight, new Vec2(dalTriangleWidth/2, 0), new Vec2(-dalTriangleWidth/2, 0), new Vec2(dalTriangleWidth/2, dalTriangleHeight), 0, 0, 20, 1, 0, 0, true, this.staticColor));

            for (i = 0; i < 10; i++) {
                this.balls.push(new Ball(random(-150, 150), random(-150, 150), 10, random(-150, 150), random(-50, 50), 10, 1));
            }

            this.initializeScene = false;
        }

    }

    scenePlatform() {
        if (this.initializeScene){
            this.initializeScene = false;
        }
    }
}