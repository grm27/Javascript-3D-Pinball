let score = 0;
let bestScore = 0;
let isOver = false;
let lives = LIVES;
let edges = [];
let bumpers = [];
let leftPaddle;
let rightPaddle;
let ball;
let gVector;
let pullerPos = 0;
let pulling = false;
let gravity = {
    "easy": GRAVITATIONAL_ACCELERATION,
    "hard": GRAVITATIONAL_ACCELERATION - 10,
    "incremental": GRAVITATIONAL_ACCELERATION,
}
let difficulty = "easy";

function initCore() {

    buildBoundaries();
    buildBumpers();
    buildPaddles();

    ball = new Ball(START_X, START_Y, BALL_RADIUS);
}

function buildBoundaries() {

    edges.push(new Edge(new Vec2(-0.15, 0), new Vec2(-0.15, TABLE_HEIGHT)));
    edges.push(new Edge(new Vec2(-0.15, TABLE_HEIGHT), new Vec2(TABLE_WIDTH, TABLE_HEIGHT)));
    edges.push(new Edge(new Vec2(TABLE_WIDTH, TABLE_HEIGHT), new Vec2(TABLE_WIDTH, 0)));

    edges.push(new Edge(new Vec2(1.52, 1.22), new Vec2(0, 1.22)));
    edges.push(new Edge(new Vec2(1.52, 1.22), new Vec2(1.52, 0)));
    edges.push(new Edge(new Vec2(3.5, 1.22), new Vec2(TABLE_HEIGHT, 1.22)));
    edges.push(new Edge(new Vec2(3.5, 1.22), new Vec2(3.5, 0)));
}

function buildBumpers() {

    bumpers.push(new Bumper(new Vec2(1, 6.7), BUMPER_RADIUS, BUMPER_SHOCK));
    bumpers.push(new Bumper(new Vec2(2.3, 6.7), BUMPER_RADIUS, BUMPER_SHOCK));
    bumpers.push(new Bumper(new Vec2(3.7, 6.7), BUMPER_RADIUS, BUMPER_SHOCK));
}

function buildPaddles(){

    leftPaddle = new Paddle(new Vec2(1.52, 1.2), "left", PADDLE_SHOCK, PADDLE_SIZE);
    rightPaddle = new Paddle(new Vec2(3.5, 1.2), "right", PADDLE_SHOCK, PADDLE_SIZE);
}

let dt = 1 / (PRECISION * 4);

function worldStep() {

    gVector = new Vec2(0, gravity[difficulty]);

    for (let i = 0; i < 4; i++) {

        ball.step(gVector, dt);

        edges.forEach(function (edge) {
            checkCollisionWithBoundaries(ball, edge);
        });

        bumpers.forEach(function (bumper) {
            checkCollisionWithBumper(ball, bumper);
        })

        rightPaddle.step(dt);
        checkCollisionWithPaddle(ball, rightPaddle);

        leftPaddle.step(dt);
        checkCollisionWithPaddle(ball, leftPaddle);
    }

    if (pulling)
        pullerPos = Math.min(PULLER_MAX_LENGTH, pullerPos + PULLER_POWER / PRECISION);
    else
        pullerPos = Math.max(0, pullerPos + PULLER_RETRACTION / PRECISION);

}

let bestScoreArr = ["0", "0", "0", "0", "0", "0"];

function updateScore() {

    let scoreArr;

    if (!isOver) {
        score = score + 7;
        gravity[difficulty] = difficulty === "incremental" ? gravity[difficulty] - 0.5 : gravity[difficulty];
        if (score > bestScore)
            bestScore = score;
        scoreArr = Array.from(String(score)).reverse();
        bestScoreArr = Array.from(String(bestScore)).reverse();
    } else {
        score = 0;
        scoreArr = ["0", "0", "0", "0", "0", "0"];
        isOver = false;
    }

    let scoreMeshes = [];
    for (let i = 5; i <= 16; i++)
        scoreMeshes.push(graph[i])

    for (let i = 0; i < scoreArr.length; i++) {
        let digit = scoreArr[i];
        scoreMeshes[i].drawInfo.texCords = UVmap[digit];

    }
    for (let i = 0; i < bestScoreArr.length; i++) {
        let bestDigit = bestScoreArr[i];
        scoreMeshes[i + 6].drawInfo.texCords = UVmap[bestDigit];
    }

    bindModelProperties();
}

function checkIfOver(ball) {

    if (ball.position.y < -2 * ball.radius) {
        if (lives > 1) {
            ball.position = new Vec2(START_X, START_Y);
            ball.moving = false;
            lives--;
        } else if (lives === 1) {
            gravity[difficulty] = difficulty === "hard" ? GRAVITATIONAL_ACCELERATION - 14 : GRAVITATIONAL_ACCELERATION;
            let phrase = score >= bestScore ? ", BEST RECORD!" : "";
            alert("you lose! you got " + score + " points" + phrase);
            isOver = true;
            updateScore();
            lives = LIVES + 1;
            ball.vel = new Vec2(0, 0);
        }
    }
}

function changeDifficulty(val) {
    difficulty = val;
}

