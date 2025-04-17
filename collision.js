function colCirCir(cir1, cir2) {

}

function colRectCir(rect, cir) {
    if (cir.pos.y > rect.pos.y + rect.h) {
        closeY = rect.pos.y + rect.h;
    }
    else if (cir.pos.y < rect.pos.y) {
        closeY = rect.pos.y;
    }
    if (cir.pos.x > rect.pos.x + rect.w) {
        closeX = rect.pos.x + rect.w;
    }
    else if (cir.pos.x < rect.pos.x) {
        closeX = rect.pos.x;
    }

    let dis = (closeX - cir.pos.x)**2 + (closeY - cir.pos.y)**2;
    console.log(closeY);
    if (dis < cir.r**2) {
        if (closeY == rect.pos.y + rect.h) {
            
        }
    }
}