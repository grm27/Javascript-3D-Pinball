let world = Physics();
let ball;

const WORLD_EDGE_X = 1;
const WORLD_EDGE_Y = 2.15;

function initWorld() {
    // bounds of the window
    let viewportBounds = Physics.aabb(0, 0, WORLD_EDGE_X, WORLD_EDGE_Y)
        , edgeBounce
    ;

    // constrain objects to these bounds
    edgeBounce = Physics.behavior('edge-collision-detection', {
        aabb: viewportBounds
        , restitution: 0.99
        , cof: 0.8
    });
    

    ball = Physics.body('circle', {
        x: 0.5, // x-coordinate
        y: 0.3, // y-coordinate
        vx: 0.05, // velocity in x-direction
        vy: 0.01, // velocity in y-direction
        radius: 0.2
    });
    world.add(ball);

    /*// add some fun interaction
    let attractor = Physics.behavior('attractor', {
        order: 0,
        strength: 0.002
    });*/

    world.on({
        'interact:poke': function (pos) {
            world.wakeUpAll();
            attractor.position(pos);
            world.add(attractor);
        }
        , 'interact:move': function (pos) {
            attractor.position(pos);
        }
        , 'interact:release': function () {
            world.wakeUpAll();
            world.remove(attractor);
        }
    });

    // add things to the world
    world.add([
        Physics.behavior('constant-acceleration')
        , Physics.behavior('body-impulse-response')
        , edgeBounce
    ]);
}


function getDeltaS(deltaT, acceleration, velocity) {
    let ds1 = deltaT * velocity;
    let ds2 = 0.5 * acceleration * (deltaT * deltaT);
    return (ds1 + ds2);
}

function getDeltaV(deltaT, acceleration) {
    return (deltaT * acceleration);
}
