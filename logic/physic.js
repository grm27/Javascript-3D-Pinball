const G = 9.8;
const A = 3.0;

function getDeltaS(deltaT, acceleration, velocity) {
    let ds1 = deltaT * velocity;
    let ds2 = 0.5 * acceleration * (deltaT * deltaT);
    return (ds1 + ds2);
}

function getDeltaV(deltaT, acceleration) {
    return (deltaT * acceleration);
}
