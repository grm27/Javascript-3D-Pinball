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