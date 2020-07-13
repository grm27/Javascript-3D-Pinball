class Ball {

    static START_X = 4.6;
    static START_Y = 2;
    static INIT_VEL = 14;
    static MAX_VEL = 28.8;

    constructor(x, y, radius) {
        this.position = new Vec2(x, y);
        this.vel = new Vec2(0, 0);
        this.moving = false;
        this.radius = radius;
    }

    throw(shock) {
        if (!this.moving) {
            this.moving = true;
            this.vel = new Vec2(0, shock * Ball.INIT_VEL);
        }
    }

    step(gravity, deltaT) {

        this.vel = this.vel.add(gravity.scalarProduct(deltaT));

        this.addFakeGravity(deltaT);

        this.position = this.position.add(this.vel.scalarProduct(deltaT));

        this.checkIfOver();
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

    checkIfOver() {

        if (this.position.y < -2 * this.radius) {
            if (lives > 1) {
                this.position = new Vec2(Ball.START_X, Ball.START_Y);
                this.moving = false;
                lives--;
                //
            } else if (lives === 1)
                score = 0;
                this.vel = new Vec2(0,0);
        }
    }

    checkCollisionWithBoundaries(edge) {
        let startingPoint = this.position.sub(edge.start);
        let edgeX = startingPoint.dotProduct(edge.direction);
        edgeX = Math.max(0, Math.min(edgeX, edge.length)); // clamp edgeAbscissa in [0, length]
        let impactPoint = edge.direction.scalarProduct(edgeX).add(edge.start);

         return this.checkCollision(false, impactPoint, new Vec2(0,0), WALL_RESTITUTION, 0);
    }

    checkCollisionWithBumper(bumper) {

        let bumperCenterToBall = this.position.sub(bumper.pos);
        let bumperCenterToImpactPoint = bumperCenterToBall.getDir().scalarProduct(bumper.radius);
        let impactPoint = bumperCenterToImpactPoint.add(bumper.pos);

        return this.checkCollision(true, impactPoint, new Vec2(0,0), bumper.shock, 0);
        //TODO MODIFY SCORE
    }

    checkCollisionWithPaddle(paddle) {

        let relativeToHinge = this.position.sub(paddle.position);
        let paddleAbscissa = relativeToHinge.dotProduct(paddle.getDir());
        paddleAbscissa = Math.max(0, Math.min(paddleAbscissa, paddle.size)); // clamp paddleAbscissa in [0, length]
        let impactPoint = paddle.getDir().scalarProduct(paddleAbscissa).add(paddle.position);
        let impactPointVelocity = paddle.getDir().normal().scalarProduct(paddleAbscissa * paddle.getPulse()); // apply rivals theorem: new basis rotating with paddle

        return this.checkCollision(false, impactPoint, impactPointVelocity, paddle.shock, PADDLE_ENERGY_TRANSFER_EFFICIENCY);
    }

    checkCollision(isBumper, impactPoint, impactPointVelocity, shock, energyTransferEfficiency) {
        let relativePosition = this.position.sub(impactPoint);
        let distance = relativePosition.getModule();

        if (distance >= this.radius)
            return false;
        if (isBumper)
            updateScore();
        // "bounce" the ball out of the surface along a line connecting the impact point to the center of the ball (i.e. normal to the surface)
        let normal = relativePosition.getDir();
        let penetration = this.radius - distance;
        distance = this.radius + penetration;
        relativePosition = normal.scalarProduct(distance);
        this.position = impactPoint.add(relativePosition);

        // adjust vel ~ shock and energy transfer efficiency only apply to the normal component of the relative vel
        let relativeVelocity = this.vel.sub(impactPointVelocity);
        let tangent = normal.normal(); // sounds dodgy but it's true
        let velTangent = relativeVelocity.dotProduct(tangent);
        let velNormal = relativeVelocity.dotProduct(normal);
        velNormal *= shock;
        velNormal += 2 * impactPointVelocity.getModule() * energyTransferEfficiency;
        relativeVelocity = normal.scalarProduct(velNormal).add(tangent.scalarProduct(velTangent));
        this.vel = impactPointVelocity.add(relativeVelocity);
        return true;
    }

}