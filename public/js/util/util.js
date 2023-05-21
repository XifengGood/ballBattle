
class Point {
    constructor({ x, y, radius }) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}
class Rect {
    constructor({ top, left, width, height }) {
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height;
        this.right = left + width;
        this.bottom = top + height;
        this.x = left + width / 2;
        this.y = top + height / 2;
    }
}

class Collision {
    static xIsInRang(x, a, b) {
        return !(x < a || x > b);
    }

    static pointIsInRect(p, rect) {
        return !(p.x + p.radius < rect.left
            || p.x - p.radius > rect.left + rect.width
            || p.y + p.radius < rect.top
            || p.y - p.radius > rect.top + rect.height);
    }

    static pointIsInPoint(a, b) {
        let va = createVector(a.x, a.y);
        let vb = createVector(b.x, b.y);
        let r = a.radius + b.radius;
        return va.sub(vb).magSq() < (r * r);
    }
}

function waitforme(delay, excute = () => { }) {
    return new Promise(resovle => {
        setTimeout(() => { resovle(); excute(); }, delay);
    });
}
let currentWaitforfire;
function waitforfire(delay, excute = () => { }) {
    return new Promise(resovle => {
        currentWaitforfire = setTimeout(() => { resovle(); excute(); }, delay);
    });
}