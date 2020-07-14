const FRAMERATE = 60;
const SUBSTEPS = 6;

const LIVES = 1;
const TABLE_WIDTH = 4.95;
const TABLE_HEIGHT = 10.9;

const BUMPER_RADIUS = 0.33;
const BUMPER_SHOCK = -1.4;
const BALL_RADIUS = 0.16;
const PULLER_RUN_MAX = .91;
const PULLER_SPEED_CHARGE = 2.03;
const PULLER_SPEED_DISCHARGE = -4.3;

const GRAVITATIONAL_ACCELERATION = 6;
const PADDLE_ENERGY_TRANSFER_EFFICIENCY = 0.4

const WALL_RESTITUTION = -.5;

const PADDLE_SIZE = 0.9;
const PADDLE_SHOCK = -0.4;

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
    "hard": GRAVITATIONAL_ACCELERATION + 10,
    "incremental": GRAVITATIONAL_ACCELERATION,
}
let difficulty = "easy";

function initCore() {

    const LEFT = -0.15;
    edges.push(new Edge(new Vec2(LEFT, 0), new Vec2(LEFT, TABLE_HEIGHT)));
    edges.push(new Edge(new Vec2(LEFT, TABLE_HEIGHT), new Vec2(TABLE_WIDTH, TABLE_HEIGHT)));
    edges.push(new Edge(new Vec2(TABLE_WIDTH, TABLE_HEIGHT), new Vec2(TABLE_WIDTH, 0)));

    const SHELVES_HEIGHT = 1.22
    edges.push(new Edge(new Vec2(1.52, SHELVES_HEIGHT), new Vec2(0, SHELVES_HEIGHT)));
    edges.push(new Edge(new Vec2(1.52, SHELVES_HEIGHT), new Vec2(1.52, 0)));
    edges.push(new Edge(new Vec2(3.5, SHELVES_HEIGHT), new Vec2(TABLE_HEIGHT, SHELVES_HEIGHT)));
    edges.push(new Edge(new Vec2(3.5, SHELVES_HEIGHT), new Vec2(3.5, 0)));

    ball = new Ball(Ball.START_X, Ball.START_Y, BALL_RADIUS);
    gVector = new Vec2(0, -gravity[difficulty]);
    bumpers.push(new Bumper(new Vec2(1, 6.7), BUMPER_RADIUS, BUMPER_SHOCK));
    bumpers.push(new Bumper(new Vec2(2.3, 6.7), BUMPER_RADIUS, BUMPER_SHOCK));
    bumpers.push(new Bumper(new Vec2(3.7, 6.7), BUMPER_RADIUS, BUMPER_SHOCK));


    leftPaddle = new Paddle(new Vec2(1.52, 1.2), "left", PADDLE_SHOCK, PADDLE_SIZE);
    rightPaddle = new Paddle(new Vec2(3.5, 1.2), "right", PADDLE_SHOCK, PADDLE_SIZE);
}

let dt = 1 / FRAMERATE / SUBSTEPS;

function step() {
    gVector = new Vec2(0, -gravity[difficulty]);
    for (let i = 0; i < SUBSTEPS; i++) {

        ball.step(gVector, dt);

        edges.forEach(function (edge) {
            ball.checkCollisionWithBoundaries(edge);
        });

        bumpers.forEach(function (bumper) {
            ball.checkCollisionWithBumper(bumper);
        })

        rightPaddle.step(dt);
        ball.checkCollisionWithPaddle(rightPaddle);

        leftPaddle.step(dt);
        ball.checkCollisionWithPaddle(leftPaddle);
    }

    if (pulling)
        pullerPos = Math.min(PULLER_RUN_MAX, pullerPos + PULLER_SPEED_CHARGE / FRAMERATE);
    else
        pullerPos = Math.max(0, pullerPos + PULLER_SPEED_DISCHARGE / FRAMERATE);

}
let bestScoreArr = ["0", "0", "0", "0", "0", "0"];
function updateScore() {

    let scoreArr;

    if (!isOver) {
        score = score + 7;
        gravity[difficulty] = difficulty === "incremental" ? gravity[difficulty] + 0.5 : gravity[difficulty];
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
            ball.position = new Vec2(Ball.START_X, Ball.START_Y);
            ball.moving = false;
            lives--;
        } else if (lives === 1) {
            gravity[difficulty] = difficulty === "hard" ? GRAVITATIONAL_ACCELERATION + 14 : GRAVITATIONAL_ACCELERATION;
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
    difficulty  = val;
}

