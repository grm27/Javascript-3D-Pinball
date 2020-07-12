class Vec2 {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    constructor(angle) {
        return new Vec2(Math.cos(angle), Math.sin(angle));
    }

    getModule() {
        return Math.hypot(this.x, this.y);
    }

    getPhase() {
        return Math.atan2(this.y, this.x);
    }

    add(Vec2) {
        return new Vec2(this.x + Vec2.x, this.y + Vec2.y);
    }

    sub(Vec2) {
        return this.add(Vec2.scalarProduct(-1));
    }

    getDir() {
        return new Vec2(this.getPhase());
    }

    scalarProduct(factor) {
        return new Vec2(factor * this.x, factor * this.y);
    }

    dotProduct(Vec2) {
        return this.x * Vec2.x + this.y * Vec2.y;
    }

    normal() {
        return new Vec2(-this.y, this.x);
    }
}
