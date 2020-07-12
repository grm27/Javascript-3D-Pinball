const FRAMERATE = 60;
const SUBSTEPS = 6;

const BUMPER_RADIUS = 0.33;
const BUMPER_SHOCK = -1.4;
const BALL_RADIUS = 0.16;
const PULLER_RUN_MAX = .71;
const PULLER_SPEED_CHARGE = 1.03;
const PULLER_SPEED_DISCHARGE = -4.3;


const PADDLE_SIZE = 0.9;
const PADDLE_SHOCK = -0.4;

let score = 0;
let lives = 3;

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
    edges.push(new Edge(new Vec2(LEFT, 0), new Vec2(LEFT, BOARD_HEIGHT)));
    edges.push(new Edge(new Vec2(LEFT, BOARD_HEIGHT), new Vec2(BOARD_WIDTH, BOARD_HEIGHT)));
    edges.push(new Edge(new Vec2(BOARD_WIDTH, BOARD_HEIGHT), new Vec2(BOARD_WIDTH, 0)));

    const SHELVES_HEIGHT = 1.22
    edges.push(new Edge(new Vec2(1.52, SHELVES_HEIGHT), new Vec2(0, SHELVES_HEIGHT)));
    edges.push(new Edge(new Vec2(1.52, SHELVES_HEIGHT), new Vec2(1.52, 0)));
    edges.push(new Edge(new Vec2(3.5, SHELVES_HEIGHT), new Vec2(BOARD_WIDTH, SHELVES_HEIGHT)));
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
        ball.update(gVector, dt);

        edges.forEach(function (edge) {
            ball.checkCollisionWithBoundaries(edge);
        });

        bumpers.forEach(function (bumper) {
            ball.checkCollisionWithBumper(bumper);
        })

        rightPaddle.update(dt);
        ball.checkCollisionWithPaddle(rightPaddle);

        leftPaddle.update(dt);
        ball.checkCollisionWithPaddle(leftPaddle);
    }

    if (pulling)
        pullerPos = Math.min(PULLER_RUN_MAX, pullerRun + PULLER_SPEED_CHARGE / FRAMERATE);
    else
        pullerPos = Math.max(0, pullerRun + PULLER_SPEED_DISCHARGE / FRAMERATE);

}

