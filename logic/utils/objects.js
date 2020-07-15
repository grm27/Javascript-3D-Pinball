class Ball {

    constructor(x, y, radius) {

        this.moving = false;
        this.radius = radius;
        this.position = new Vec2(x, y);
        this.vel = new Vec2(0, 0);
    }

    throw(shock) {
        if (!this.moving) {
            this.moving = true;
            this.vel = new Vec2(0, shock * INIT_VEL);
        }
    }

    step(gravity, deltaT) {

        this.vel = this.vel.add(gravity.scalarProduct(deltaT));
        this.addFakeGravity(deltaT);
        this.position = this.position.add(this.vel.scalarProduct(deltaT));
        checkIfOver(this);
    }

    addFakeGravity(deltaT) {

        let fakeGravity;
        if (this.position.x < 1.50 && this.moving)
            fakeGravity = new Vec2(0.3, 0).scalarProduct(deltaT);
        else if (this.position.x > 3.3 && this.moving)
            fakeGravity = new Vec2(-0.3, 0).scalarProduct(deltaT);
        else return;

        this.vel = this.vel.add(fakeGravity);
    }

}


class Bumper {

    constructor(pos, radius, shock) {

        this.pos = pos;
        this.radius = radius;
        this.shock = shock;
    }
}


class Edge {

    constructor(start, end) {

        let dist = end.sub(start);
        this.length = dist.getModule();
        this.direction = dist.getDir();
        this.start = start;
    }

}


class Paddle {

    constructor(position, side, shock, size) {

        this.position = position;
        this.side = side;
        this.shock = shock;
        this.size = size;
        this.active = false;
        this.isMoving = false;
        this.anglePerc = 0;
    }

    getDir() {
        return Vec2.buildUnit(this.getInclination());
    }

    getInclination() {
        let angle = IDLE_INCLINATION + (MAX_INCLINATION - IDLE_INCLINATION) * this.anglePerc;
        if (this.side === "left")
            return angle;
        else
            return Math.PI - angle;
    }

    getPulse() {

        if (this.isMoving) {
            if (this.side === "left" ^ this.active)
                return -STEP;
            return STEP;
        }

        return 0;
    }

    step(deltaT) {
        let deltaTeta;

        if (this.active) {
            deltaTeta = deltaT / 0.10;
        } else
            deltaTeta = -deltaT / 0.10;

        let anglePer = this.anglePerc + deltaTeta;

        if (anglePer >= 0 && anglePer <= 1) {
            this.anglePerc = anglePer;
            this.isMoving = true;
        } else
            this.isMoving = false;
    }

}

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
