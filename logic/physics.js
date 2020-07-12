// let world = Physics();
// let ball;
//
// const WORLD_EDGE_X = 2.185;
// const WORLD_EDGE_Y = 3.995;
//
// function initWorld() {
//     // bounds of the window
//     let viewportBounds = Physics.aabb(-2.6, -7.17499999999994, WORLD_EDGE_X, WORLD_EDGE_Y)
//         , edgeBounce
//     ;
//
//     // constrain objects to these bounds
//     edgeBounce = Physics.behavior('edge-collision-detection', {
//         aabb: viewportBounds
//         , restitution: 0.99
//         , cof: 0.8
//     });
//    
//
//     ball = Physics.body('circle', {
//         x: 0.5, // x-coordinate
//         y: 0.3, // y-coordinate
//         vx: 0.05, // velocity in x-direction
//         vy: 0.0, // velocity in y-direction
//         radius: 0.001
//     });
//     world.add(ball);
//
//     /*// add some fun interaction
//     let attractor = Physics.behavior('attractor', {
//         order: 0,
//         strength: 0.002
//     });*/
//
//     world.on({
//         'interact:poke': function (pos) {
//             world.wakeUpAll();
//             attractor.position(pos);
//             world.add(attractor);
//         }
//         , 'interact:move': function (pos) {
//             attractor.position(pos);
//         }
//         , 'interact:release': function () {
//             world.wakeUpAll();
//             world.remove(attractor);
//         }
//     });
//
//     // add things to the world
//     world.add([
//         Physics.behavior('constant-acceleration')
//         , Physics.behavior('body-impulse-response')
//         , edgeBounce
//     ]);
// }
//
//
// function getDeltaS(deltaT, acceleration, velocity) {
//     let ds1 = deltaT * velocity;
//     let ds2 = 0.5 * acceleration * (deltaT * deltaT);
//     return (ds1 + ds2);
// }
//
// function getDeltaV(deltaT, acceleration) {
//     return (deltaT * acceleration);
// }



const BOARD_WIDTH = 4.95;

const BOARD_HEIGHT = 10.9;

const GRAVITATIONAL_ACCELERATION = 4;

const BALL_RADIUS = 0.16;

const FRICTION = 0.02;

const DRAG = 0.012;

const WALL_RESTITUTION = -0.5;

const BUMPER_RESTITUTION = -1.4;



const PADDLE_IDLE_INCLINATION = -0.5236;

const PADDLE_MAX_INCLINATION = 0.5236;


const PADDLE_SWEEP_TIME = 0.12;


const PADDLE_ENERGY_TRANSFER_EFFICIENCY = .4;





