function checkCollisionWithBoundaries(ball, edge) {

    let startingPoint = ball.position.sub(edge.start);
    let edgeX = startingPoint.dotProduct(edge.direction);
    let length = Math.max(0, Math.min(edgeX, edge.length));
    let collisionPoint = edge.direction.scalarProduct(length).add(edge.start);

    checkCollision(ball, collisionPoint, 0, -0.4, false);
}

function checkCollisionWithBumper(ball, bumper) {

    let distDir = ball.position.sub(bumper.pos).getDir();
    let collisionPoint = distDir.scalarProduct(bumper.radius).add(bumper.pos);

    checkCollision(ball, collisionPoint, 0, bumper.shock, true);
}

function checkCollisionWithPaddle(ball, paddle) {

    let centersDist = ball.position.sub(paddle.position);
    let paddleX = Math.max(0, Math.min(centersDist.dotProduct(paddle.getDir()), paddle.size));
    let collisionPoint = paddle.getDir().scalarProduct(paddleX).add(paddle.position);
    let collisionPointVel = paddle.getDir().normal().scalarProduct(paddleX * paddle.getPulse());

    checkCollision(ball, collisionPoint, collisionPointVel, paddle.shock, false);
}

function checkCollision(ball, collisionP, collVel, shock, isBumper) {

    let dist = ball.position.sub(collisionP);

    if (dist.getModule() < ball.radius) {

        if (isBumper)
            updateScore();

        let normal = dist.getDir();
        ball.position = adjustPosition(ball, collisionP, dist, normal);

        if (collVel === 0)
            collVel = new Vec2(0, 0);

        ball.vel = adjustVel(collVel, normal, shock);
    }
}

function adjustPosition(ball, collisionP, dist, normal) {

    let adjustFactor = ball.radius - dist.getModule();
    let newDistance = ball.radius + adjustFactor;
    newDistance = normal.scalarProduct(newDistance);
    return collisionP.add(newDistance);
}

function adjustVel(collVel, normal, shock) {

    let tan = normal.normal();
    let relVel = ball.vel.sub(collVel);
    let velTangent = relVel.dotProduct(tan);
    let velNormal = relVel.dotProduct(normal) * shock;
    return collVel.add(normal.scalarProduct(velNormal).add(tan.scalarProduct(velTangent)));
}