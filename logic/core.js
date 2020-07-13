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

const GRAVITATIONAL_ACCELERATION = 11;
const PADDLE_ENERGY_TRANSFER_EFFICIENCY = 0.4

const WALL_RESTITUTION = -.5;

const PADDLE_SIZE = 0.9;
const PADDLE_SHOCK = -0.4;

let score = 0;
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
    gVector = new Vec2(0, -GRAVITATIONAL_ACCELERATION);
    bumpers.push(new Bumper(new Vec2(1, 6.7), BUMPER_RADIUS, BUMPER_SHOCK));
    bumpers.push(new Bumper(new Vec2(2.3, 6.7), BUMPER_RADIUS, BUMPER_SHOCK));
    bumpers.push(new Bumper(new Vec2(3.7, 6.7), BUMPER_RADIUS, BUMPER_SHOCK));


    leftPaddle = new Paddle(new Vec2(1.52, 1.2), "left", PADDLE_SHOCK, PADDLE_SIZE);
    rightPaddle = new Paddle(new Vec2(3.5, 1.2), "right", PADDLE_SHOCK, PADDLE_SIZE);
}

let dt = 1 / FRAMERATE / SUBSTEPS;

function step() {

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

function updateScore() {
    let scoreArr;
    if (!isOver) {
        score = score + 7;
        scoreArr = Array.from(String(score), Number).reverse();
    } else {
        score = 0;
        scoreArr = [0, 0, 0, 0, 0, 0];
        isOver = false;
    }
    let scoreMeshes = [graph[objectIndex.DR1], graph[objectIndex.DR2], graph[objectIndex.DR3],
        graph[objectIndex.DR4], graph[objectIndex.DR5], graph[objectIndex.DR6], graph[objectIndex.DL1],
        graph[objectIndex.DL2],graph[objectIndex.DL3],graph[objectIndex.DL4],graph[objectIndex.DL5],
        graph[objectIndex.DL6]];
    for (let i = 0; i < scoreArr.length; i++) {
        let digit = scoreArr[i];
        scoreMeshes[i].drawInfo.texCords = numUVs[digit];
        scoreMeshes[i+6].drawInfo.texCords = numUVs[digit];
    }
    bindModelProperties();
}

