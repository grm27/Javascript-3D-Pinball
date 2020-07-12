class Vec2 {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static buildUnit(angle) {
        return new Vec2(Math.cos(angle), Math.sin(angle));
    }

    getModule() {
        return Math.hypot(this.x, this.y);
    }

    getPhase() {
        return Math.atan2(this.y, this.x);
    }

    add(v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }

    sub(v) {
        return this.add(v.scalarProduct(-1));
    }

    getDir() {
        return Vec2.buildUnit(this.getPhase());
    }

    scalarProduct(factor) {
        return new Vec2(factor * this.x, factor * this.y);
    }

    dotProduct(v) {
        return this.x * v.x + this.y * v.y;
    }

    normal() {
        return new Vec2(-this.y, this.x);
    }
}
