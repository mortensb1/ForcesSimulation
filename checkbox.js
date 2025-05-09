class Checkbox {
    constructor(pos = new Vec2(), color = [255, 255, 255], checked = false) {
        this.pos = pos;
        this.color = color;
        this.checkBoxBool = checked;

        this.size = 50
        this.tintBox = -20;
    }

    update() {
        if (mouseX > this.pos.x - this.size/2 && mouseX < this.pos.x + this.size/2 && mouseY > this.pos.y - this.size/2 && mouseY < this.pos.y + this.size/2) {
            fill(this.color[0] + this.tintBox, this.color[1] + this.tintBox, this.color[2] + this.tintBox);
            if (mouseIsPressed && allowCheckBoxChange) {
                allowCheckBoxChange = false;
                if (!this.checkBoxBool) {
                    this.checkBoxBool = true;
                } else {
                    this.checkBoxBool = false;
                }
            }
        } else {
            fill(this.color[0], this.color[1], this.color[2]);
        }
        rect(this.pos.x, this.pos.y, this.size, this.size);
        if (this.checkBoxBool) {
            image(images.check, this.pos.x, this.pos.y, 38, 38);
        }
    }
}